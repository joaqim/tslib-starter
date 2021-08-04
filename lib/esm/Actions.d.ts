import { ActionsWithoutPayload, ActionsWithPayload } from "./Actions.h";
export declare function createActionPayload<TypeAction, TypePayload>(actionType: TypeAction): (payload: TypePayload) => ActionsWithPayload<TypeAction, TypePayload>;
export declare function createAction<TypeAction>(actionType: TypeAction): () => ActionsWithoutPayload<TypeAction>;
