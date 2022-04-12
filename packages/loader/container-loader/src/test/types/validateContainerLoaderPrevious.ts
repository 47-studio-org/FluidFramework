/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by fluid-type-validator in @fluidframework/build-tools.
 */
/* eslint-disable max-lines */
import * as old from "@fluidframework/container-loader-previous";
import * as current from "../../index";

type TypeOnly<T> = {
    [P in keyof T]: TypeOnly<T[P]>;
};

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "EnumDeclaration_ConnectionState": {"forwardCompat": false}
*/
declare function get_old_EnumDeclaration_ConnectionState():
    TypeOnly<old.ConnectionState>;
declare function use_current_EnumDeclaration_ConnectionState(
    use: TypeOnly<current.ConnectionState>);
use_current_EnumDeclaration_ConnectionState(
    get_old_EnumDeclaration_ConnectionState());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "EnumDeclaration_ConnectionState": {"backCompat": false}
*/
declare function get_current_EnumDeclaration_ConnectionState():
    TypeOnly<current.ConnectionState>;
declare function use_old_EnumDeclaration_ConnectionState(
    use: TypeOnly<old.ConnectionState>);
use_old_EnumDeclaration_ConnectionState(
    get_current_EnumDeclaration_ConnectionState());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "ClassDeclaration_Container": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_Container():
    TypeOnly<old.Container>;
declare function use_current_ClassDeclaration_Container(
    use: TypeOnly<current.Container>);
use_current_ClassDeclaration_Container(
    // @ts-expect-error compatibility expected to be broken
    get_old_ClassDeclaration_Container());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "ClassDeclaration_Container": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_Container():
    TypeOnly<current.Container>;
declare function use_old_ClassDeclaration_Container(
    use: TypeOnly<old.Container>);
use_old_ClassDeclaration_Container(
    // @ts-expect-error compatibility expected to be broken
    get_current_ClassDeclaration_Container());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "InterfaceDeclaration_ICodeDetailsLoader": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_ICodeDetailsLoader():
    TypeOnly<old.ICodeDetailsLoader>;
declare function use_current_InterfaceDeclaration_ICodeDetailsLoader(
    use: TypeOnly<current.ICodeDetailsLoader>);
use_current_InterfaceDeclaration_ICodeDetailsLoader(
    get_old_InterfaceDeclaration_ICodeDetailsLoader());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "InterfaceDeclaration_ICodeDetailsLoader": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_ICodeDetailsLoader():
    TypeOnly<current.ICodeDetailsLoader>;
declare function use_old_InterfaceDeclaration_ICodeDetailsLoader(
    use: TypeOnly<old.ICodeDetailsLoader>);
use_old_InterfaceDeclaration_ICodeDetailsLoader(
    get_current_InterfaceDeclaration_ICodeDetailsLoader());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "InterfaceDeclaration_IContainerConfig": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IContainerConfig():
    TypeOnly<old.IContainerConfig>;
declare function use_current_InterfaceDeclaration_IContainerConfig(
    use: TypeOnly<current.IContainerConfig>);
use_current_InterfaceDeclaration_IContainerConfig(
    get_old_InterfaceDeclaration_IContainerConfig());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "InterfaceDeclaration_IContainerConfig": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IContainerConfig():
    TypeOnly<current.IContainerConfig>;
declare function use_old_InterfaceDeclaration_IContainerConfig(
    use: TypeOnly<old.IContainerConfig>);
use_old_InterfaceDeclaration_IContainerConfig(
    get_current_InterfaceDeclaration_IContainerConfig());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "InterfaceDeclaration_IContainerLoadOptions": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IContainerLoadOptions():
    TypeOnly<old.IContainerLoadOptions>;
declare function use_current_InterfaceDeclaration_IContainerLoadOptions(
    use: TypeOnly<current.IContainerLoadOptions>);
use_current_InterfaceDeclaration_IContainerLoadOptions(
    get_old_InterfaceDeclaration_IContainerLoadOptions());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "InterfaceDeclaration_IContainerLoadOptions": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IContainerLoadOptions():
    TypeOnly<current.IContainerLoadOptions>;
declare function use_old_InterfaceDeclaration_IContainerLoadOptions(
    use: TypeOnly<old.IContainerLoadOptions>);
use_old_InterfaceDeclaration_IContainerLoadOptions(
    get_current_InterfaceDeclaration_IContainerLoadOptions());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "TypeAliasDeclaration_IDetachedBlobStorage": {"forwardCompat": false}
*/
declare function get_old_TypeAliasDeclaration_IDetachedBlobStorage():
    TypeOnly<old.IDetachedBlobStorage>;
declare function use_current_TypeAliasDeclaration_IDetachedBlobStorage(
    use: TypeOnly<current.IDetachedBlobStorage>);
use_current_TypeAliasDeclaration_IDetachedBlobStorage(
    get_old_TypeAliasDeclaration_IDetachedBlobStorage());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "TypeAliasDeclaration_IDetachedBlobStorage": {"backCompat": false}
*/
declare function get_current_TypeAliasDeclaration_IDetachedBlobStorage():
    TypeOnly<current.IDetachedBlobStorage>;
declare function use_old_TypeAliasDeclaration_IDetachedBlobStorage(
    use: TypeOnly<old.IDetachedBlobStorage>);
use_old_TypeAliasDeclaration_IDetachedBlobStorage(
    get_current_TypeAliasDeclaration_IDetachedBlobStorage());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "InterfaceDeclaration_IFluidModuleWithDetails": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IFluidModuleWithDetails():
    TypeOnly<old.IFluidModuleWithDetails>;
declare function use_current_InterfaceDeclaration_IFluidModuleWithDetails(
    use: TypeOnly<current.IFluidModuleWithDetails>);
use_current_InterfaceDeclaration_IFluidModuleWithDetails(
    get_old_InterfaceDeclaration_IFluidModuleWithDetails());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "InterfaceDeclaration_IFluidModuleWithDetails": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IFluidModuleWithDetails():
    TypeOnly<current.IFluidModuleWithDetails>;
declare function use_old_InterfaceDeclaration_IFluidModuleWithDetails(
    use: TypeOnly<old.IFluidModuleWithDetails>);
use_old_InterfaceDeclaration_IFluidModuleWithDetails(
    get_current_InterfaceDeclaration_IFluidModuleWithDetails());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "InterfaceDeclaration_ILoaderOptions": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_ILoaderOptions():
    TypeOnly<old.ILoaderOptions>;
declare function use_current_InterfaceDeclaration_ILoaderOptions(
    use: TypeOnly<current.ILoaderOptions>);
use_current_InterfaceDeclaration_ILoaderOptions(
    get_old_InterfaceDeclaration_ILoaderOptions());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "InterfaceDeclaration_ILoaderOptions": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_ILoaderOptions():
    TypeOnly<current.ILoaderOptions>;
declare function use_old_InterfaceDeclaration_ILoaderOptions(
    use: TypeOnly<old.ILoaderOptions>);
use_old_InterfaceDeclaration_ILoaderOptions(
    get_current_InterfaceDeclaration_ILoaderOptions());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "InterfaceDeclaration_ILoaderProps": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_ILoaderProps():
    TypeOnly<old.ILoaderProps>;
declare function use_current_InterfaceDeclaration_ILoaderProps(
    use: TypeOnly<current.ILoaderProps>);
use_current_InterfaceDeclaration_ILoaderProps(
    get_old_InterfaceDeclaration_ILoaderProps());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "InterfaceDeclaration_ILoaderProps": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_ILoaderProps():
    TypeOnly<current.ILoaderProps>;
declare function use_old_InterfaceDeclaration_ILoaderProps(
    use: TypeOnly<old.ILoaderProps>);
use_old_InterfaceDeclaration_ILoaderProps(
    get_current_InterfaceDeclaration_ILoaderProps());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "InterfaceDeclaration_ILoaderServices": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_ILoaderServices():
    TypeOnly<old.ILoaderServices>;
declare function use_current_InterfaceDeclaration_ILoaderServices(
    use: TypeOnly<current.ILoaderServices>);
use_current_InterfaceDeclaration_ILoaderServices(
    get_old_InterfaceDeclaration_ILoaderServices());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "InterfaceDeclaration_ILoaderServices": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_ILoaderServices():
    TypeOnly<current.ILoaderServices>;
declare function use_old_InterfaceDeclaration_ILoaderServices(
    use: TypeOnly<old.ILoaderServices>);
use_old_InterfaceDeclaration_ILoaderServices(
    get_current_InterfaceDeclaration_ILoaderServices());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "ClassDeclaration_Loader": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_Loader():
    TypeOnly<old.Loader>;
declare function use_current_ClassDeclaration_Loader(
    use: TypeOnly<current.Loader>);
use_current_ClassDeclaration_Loader(
    get_old_ClassDeclaration_Loader());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "ClassDeclaration_Loader": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_Loader():
    TypeOnly<current.Loader>;
declare function use_old_ClassDeclaration_Loader(
    use: TypeOnly<old.Loader>);
use_old_ClassDeclaration_Loader(
    get_current_ClassDeclaration_Loader());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "ClassDeclaration_RelativeLoader": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_RelativeLoader():
    TypeOnly<old.RelativeLoader>;
declare function use_current_ClassDeclaration_RelativeLoader(
    use: TypeOnly<current.RelativeLoader>);
use_current_ClassDeclaration_RelativeLoader(
    get_old_ClassDeclaration_RelativeLoader());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "ClassDeclaration_RelativeLoader": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_RelativeLoader():
    TypeOnly<current.RelativeLoader>;
declare function use_old_ClassDeclaration_RelativeLoader(
    use: TypeOnly<old.RelativeLoader>);
use_old_ClassDeclaration_RelativeLoader(
    get_current_ClassDeclaration_RelativeLoader());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "FunctionDeclaration_waitContainerToCatchUp": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_waitContainerToCatchUp():
    TypeOnly<typeof old.waitContainerToCatchUp>;
declare function use_current_FunctionDeclaration_waitContainerToCatchUp(
    use: TypeOnly<typeof current.waitContainerToCatchUp>);
use_current_FunctionDeclaration_waitContainerToCatchUp(
    get_old_FunctionDeclaration_waitContainerToCatchUp());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken.0.58.2002:
* "FunctionDeclaration_waitContainerToCatchUp": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_waitContainerToCatchUp():
    TypeOnly<typeof current.waitContainerToCatchUp>;
declare function use_old_FunctionDeclaration_waitContainerToCatchUp(
    use: TypeOnly<typeof old.waitContainerToCatchUp>);
use_old_FunctionDeclaration_waitContainerToCatchUp(
    get_current_FunctionDeclaration_waitContainerToCatchUp());
