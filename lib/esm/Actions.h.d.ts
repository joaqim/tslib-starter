export declare const ACTION_UPDATE = "ACTION_UPDATE";
export interface ActionsWithPayload<TypeAction, TypePayload> {
    type: TypeAction;
    payload: TypePayload;
}
export interface ActionsWithoutPayload<TypeAction> {
    type: TypeAction;
}
interface ActionCreatorsMapObject {
    [key: string]: (...args: any[]) => ActionsWithPayload<any, any> | ActionsWithoutPayload<any>;
}
export declare type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;
export {};
