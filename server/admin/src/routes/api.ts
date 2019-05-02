import * as core from "@prague/services-core";
import { Response, Router } from "express";
import { Provider } from "nconf";
import { IKeyValue, ITenantInput } from "../definitions";
import { KeyValueManager } from "../keyValueManager";
import { TenantManager } from "../tenantManager";

export function create(
    config: Provider,
    mongoManager: core.MongoManager,
    ensureLoggedIn: any,
    tenantManager: TenantManager,
    keyValueManager: KeyValueManager,
): Router {
    const router: Router = Router();

    function returnResponse<T>(resultP: Promise<T>, response: Response) {
        resultP.then(
            (result) => response.status(200).json(result),
            (error) => response.status(400).end(error.toString()));
    }

    /**
     * Creates a new tenant
     */
    router.post("/tenants", ensureLoggedIn(), (request, response) => {
        const tenantInput = request.body as ITenantInput;
        const tenantP = tenantManager.addTenant(request.user.oid, tenantInput);
        returnResponse(tenantP, response);
    });

    /**
     * Deletes an existing tenant
     */
    router.delete("/tenants/:id", ensureLoggedIn(), (request, response) => {
        const tenantP = tenantManager.deleteTenant(request.params.id);
        returnResponse(tenantP, response);
    });

    /**
     * Creates a new Key-Value
     */
    router.post("/keyValues", ensureLoggedIn(), (request, response) => {
        const keyValueInput = request.body as IKeyValue;
        const newKeyValue = keyValueManager.addKeyValue(keyValueInput);
        response.status(200).json(newKeyValue);
    });

    /**
     * Deletes an existing Key-Value
     */
    router.delete("/keyValues/*", ensureLoggedIn(), (request, response) => {
        const key = request.params[0] as string;
        const keyValueId = keyValueManager.removeKeyValue(key);
        response.status(200).json(keyValueId);
    });

    return router;
}
