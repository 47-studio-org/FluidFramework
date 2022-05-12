/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import * as path from "path";
import { existsSync, mkdirSync } from "fs";
import { strict as assert } from "assert";
import {
    AcceptanceCondition,
    BaseFuzzTestState,
    createWeightedGenerator,
    Generator,
    interleave,
    makeRandom,
    performFuzzActions,
    Reducer,
    SaveInfo,
    take,
} from "@fluid-internal/stochastic-test-utils";
import {
    MockFluidDataStoreRuntime,
    MockContainerRuntimeFactory,
    MockStorage,
} from "@fluidframework/test-runtime-utils";
import { IChannelServices } from "@fluidframework/datastore-definitions";
import { SharedString } from "../sharedString";
import { IntervalCollection, IntervalType, SequenceInterval } from "../intervalCollection";
import { SharedStringFactory } from "../sequenceFactory";

interface FuzzTestState extends BaseFuzzTestState {
    containerRuntimeFactory: MockContainerRuntimeFactory;
    sharedStrings: SharedString[];
}

interface ClientSpec {
    stringId: string;
}

interface RangeSpec {
    start: number;
    end: number;
}

interface IntervalCollectionSpec {
    collectionName: string;
}

interface AddText extends ClientSpec {
    type: "addText";
    index: number;
    content: string;
}

interface RemoveRange extends ClientSpec, RangeSpec {
    type: "removeRange";
}

// For non-interval collection fuzzing, annotating text would also be useful.

interface AddInterval extends ClientSpec, IntervalCollectionSpec, RangeSpec {
    type: "addInterval";
}

interface ChangeInterval extends ClientSpec, IntervalCollectionSpec, RangeSpec {
    type: "changeInterval";
    id: string;
}

interface DeleteInterval extends ClientSpec, IntervalCollectionSpec {
    type: "deleteInterval";
    id: string;
}

interface Synchronize {
    type: "synchronize";
}

type IntervalOperation = AddInterval | ChangeInterval | DeleteInterval;

type TextOperation = AddText | RemoveRange;

type ClientOperation = IntervalOperation | TextOperation;

type Operation = ClientOperation | Synchronize;

// Note: none of these options are currently exercised, since the fuzz test fails with pretty much
// any configuration due to known bugs. Once shared interval collections are in a better state these
// should be revisited.
interface OperationGenerationConfig {
    /**
     * Maximum length of the SharedString (locally) before no further AddText operations are generated.
     * Note due to concurency, during test execution the actual length of the string may exceed this.
     */
    maxStringLength?: number;
    /**
     * Maximum number of intervals (locally) before no further AddInterval operations are generated.
     * Note due to concurency, during test execution the actual number of intervals may exceed this.
     */
    maxIntervals?: number;
    maxInsertLength?: number;
    intervalCollectionNamePool?: string[];
    validateInterval?: number;
}

const defaultOptions: Required<OperationGenerationConfig> = {
    maxStringLength: 1000,
    maxIntervals: 100,
    maxInsertLength: 10,
    intervalCollectionNamePool: ["comments"],
    validateInterval: 100,
};

// A few places in the fuzz testing code need to inspect existing collections on a SharedString
// to determine where to insert/modify/delete an interval from. There's some logic to scope all
// provided labels with "intervalCollections/", which is what the iterator returns. This works
// around that.
function* getUnscopedLabels(string: SharedString): Iterable<string> {
    const prefix = "intervalCollections/";
    for (const label of string.getIntervalCollectionLabels()) {
        assert(label.startsWith(prefix));
        yield label.substring(prefix.length);
    }
}

function makeOperationGenerator(optionsParam?: OperationGenerationConfig): Generator<Operation, FuzzTestState> {
    const options = { ...defaultOptions, ...(optionsParam ?? {}) };
    type ClientOpState = FuzzTestState & { sharedString: SharedString; };

    function isNonEmpty(collection: IntervalCollection<SequenceInterval>): boolean {
        for (const _ of collection) {
            return true;
        }

        return false;
    }

    // All subsequent helper functions are generators; note that they don't actually apply any operations.
    function position({ random, sharedString }: ClientOpState): number {
        return random.integer(0, sharedString.getLength() - 1);
    }

    function exclusiveRange(state: ClientOpState): RangeSpec {
        const start = position(state);
        const end = state.random.integer(start + 1, state.sharedString.getLength());
        return { start, end };
    }

    function inclusiveRange(state: ClientOpState): RangeSpec {
        const start = position(state);
        const end = state.random.integer(start, state.sharedString.getLength() - 1);
        return { start, end };
    }

    function nonEmptyIntervalCollection({ sharedString, random }: ClientOpState): string {
        const nonEmptyLabels = Array.from(getUnscopedLabels(sharedString)).filter((label) => {
            const collection = sharedString.getIntervalCollection(label);
            return isNonEmpty(collection);
        });
        return random.pick(nonEmptyLabels);
    }

    function interval(state: ClientOpState): { collectionName: string; id: string; } {
        const collectionName = nonEmptyIntervalCollection(state);
        const intervals = Array.from(state.sharedString.getIntervalCollection(collectionName));
        return {
            collectionName,
            id: state.random.pick(intervals).getIntervalId(),
        };
    }

    function addText(state: ClientOpState): AddText {
        const { random, sharedString } = state;
        return {
            type: "addText",
            index: position(state),
            content: random.string(random.integer(0, options.maxInsertLength)),
            stringId: sharedString.id,
        };
    }

    function removeRange(state: ClientOpState): RemoveRange {
        return { type: "removeRange", ...exclusiveRange(state), stringId: state.sharedString.id };
    }

    function addInterval(state: ClientOpState): AddInterval {
        return {
            type: "addInterval",
            ...inclusiveRange(state),
            collectionName: state.random.pick(options.intervalCollectionNamePool),
            stringId: state.sharedString.id,
        };
    }

    function deleteInterval(state: ClientOpState): DeleteInterval {
        return {
            type: "deleteInterval",
            ...interval(state),
            stringId: state.sharedString.id,
        };
    }

    function changeInterval(state: ClientOpState): ChangeInterval {
        return {
            type: "changeInterval",
            ...interval(state),
            ...inclusiveRange(state),
            stringId: state.sharedString.id,
        };
    }

    const hasAnInterval = ({ sharedString }: ClientOpState): boolean =>
        Array.from(getUnscopedLabels(sharedString)).some((label) => {
            const collection = sharedString.getIntervalCollection(label);
            return isNonEmpty(collection);
        });

    const lengthSatisfies = (criteria: (length: number) => boolean): AcceptanceCondition<ClientOpState> =>
        ({ sharedString }) => criteria(sharedString.getLength());
    const hasNonzeroLength = lengthSatisfies((length) => length > 0);
    const isShorterThanMaxLength = lengthSatisfies((length) => length < options.maxStringLength);

    const hasNotTooManyIntervals: AcceptanceCondition<ClientOpState> = ({ sharedString }) => {
        let intervalCount = 0;
        for (const label of getUnscopedLabels(sharedString)) {
            for (const _ of sharedString.getIntervalCollection(label)) {
                intervalCount++;
                if (intervalCount >= options.maxIntervals) {
                    return false;
                }
            }
        }
        return true;
    };

    const clientBaseOperationGenerator = createWeightedGenerator<Operation, ClientOpState>([
        [addText, 2, isShorterThanMaxLength],
        [removeRange, 1, hasNonzeroLength],
        [addInterval, 2, hasNotTooManyIntervals],
        [deleteInterval, 2, hasAnInterval],
        [changeInterval, 2, hasAnInterval],
    ]);

    const clientOperationGenerator = (state: FuzzTestState) =>
        clientBaseOperationGenerator({ ...state, sharedString: state.random.pick(state.sharedStrings) });

    return interleave(
        clientOperationGenerator,
        () => ({ type: "synchronize" }),
        options.validateInterval,
    );
}

function runIntervalCollectionFuzz(
    generator: Generator<Operation, FuzzTestState>,
    initialState: FuzzTestState,
    saveInfo?: SaveInfo,
): void {
    // Validates that all shared strings in the provided array are consistent in the underlying text
    // and location of all intervals in any interval collections they have.
    function assertConsistent(sharedStrings: SharedString[]): void {
        const first = sharedStrings[0];
        for (const other of sharedStrings.slice(1)) {
            assert.equal(first.getLength(), other.getLength());
            assert.equal(
                first.getText(),
                other.getText(),
                `Non-equal text between strings ${first.id} and ${other.id}.`,
            );
            const firstLabels = Array.from(getUnscopedLabels(first)).sort();
            const otherLabels = Array.from(getUnscopedLabels(other)).sort();
            assert.deepEqual(
                firstLabels,
                otherLabels,
                `Different interval collections found between ${first.id} and ${other.id}.`,
            );
            for (let i = 0; i < firstLabels.length; i++) {
                const collection1 = first.getIntervalCollection(firstLabels[i]);
                const collection2 = other.getIntervalCollection(otherLabels[i]);
                const intervals1 = Array.from(collection1);
                const intervals2 = Array.from(collection2);
                assert.equal(
                    intervals1.length,
                    intervals2.length,
                    `Different number of intervals found in ${first.id} and ${other.id}` +
                    ` at collection ${firstLabels[i]}`,
                );
                for (const interval of intervals1) {
                    const otherInterval = collection2.getIntervalById(interval.getIntervalId());
                    assert.equal(interval.start, otherInterval.start);
                    assert.equal(interval.end, otherInterval.end);
                    assert.equal(interval.intervalType, otherInterval.intervalType);
                    assert.equal(interval.properties, otherInterval.properties);
                }
            }
        }
    }

    // Small wrapper to avoid having to return the same state repeatedly; all operations in this suite mutate.
    const statefully =
        <T>(statefulReducer: (state: FuzzTestState, operation: T) => void): Reducer<T, FuzzTestState> =>
            (state, operation) => {
                statefulReducer(state, operation);
                return state;
            };

    performFuzzActions(
        generator,
        {
            addText: statefully(({ sharedStrings }, { stringId, index, content }) => {
                const sharedString = sharedStrings.find((s) => s.id === stringId);
                sharedString.insertText(index, content);
            }),
            removeRange: statefully(({ sharedStrings }, { stringId, start, end }) => {
                const sharedString = sharedStrings.find((s) => s.id === stringId);
                sharedString.removeRange(start, end);
            }),
            addInterval: statefully(({ sharedStrings }, { stringId, start, end, collectionName }) => {
                const sharedString = sharedStrings.find((s) => s.id === stringId);
                const collection = sharedString.getIntervalCollection(collectionName);
                collection.add(start, end, IntervalType.SlideOnRemove);
            }),
            deleteInterval: statefully(({ sharedStrings }, { stringId, id, collectionName }) => {
                const sharedString = sharedStrings.find((s) => s.id === stringId);
                const collection = sharedString.getIntervalCollection(collectionName);
                collection.removeIntervalById(id);
            }),
            changeInterval: statefully(({ sharedStrings }, { stringId, id, start, end, collectionName }) => {
                const sharedString = sharedStrings.find((s) => s.id === stringId);
                const collection = sharedString.getIntervalCollection(collectionName);
                collection.change(id, start, end);
            }),
            synchronize: statefully(({ containerRuntimeFactory, sharedStrings }) => {
                containerRuntimeFactory.processAllMessages();
                assertConsistent(sharedStrings);
            }),
        },
        initialState,
        saveInfo,
    );
}

const directory = path.join(__dirname, "../../src/test/results");

// Once known issues with SharedInterval are fixed, a small set of fuzz tests with reasonably-tuned parameters
// should be enabled.
describe.skip("IntervalCollection fuzz testing", () => {
    before(() => {
        if (!existsSync(directory)) {
            mkdirSync(directory);
        }
    });

    it("with default config", async () => {
        const numClients = 3;

        const containerRuntimeFactory = new MockContainerRuntimeFactory();
        const sharedStrings = Array.from({ length: numClients }, (_, index) => {
            const dataStoreRuntime = new MockFluidDataStoreRuntime();
            const sharedString = new SharedString(
                dataStoreRuntime,
                String.fromCharCode(index + 65),
                SharedStringFactory.Attributes,
            );
            const containerRuntime = containerRuntimeFactory.createContainerRuntime(dataStoreRuntime);
            const services: IChannelServices = {
                deltaConnection: containerRuntime.createDeltaConnection(),
                objectStorage: new MockStorage(),
            };

            sharedString.initializeLocal();
            sharedString.connect(services);
            return sharedString;
        });

        const generator = take(300, makeOperationGenerator());

        const initialState: FuzzTestState = {
            sharedStrings,
            containerRuntimeFactory,
            random: makeRandom(0),
        };

        runIntervalCollectionFuzz(
            generator,
            initialState,
            { saveOnFailure: true, filepath: path.join(directory, "0.json") },
        );
    });
});
