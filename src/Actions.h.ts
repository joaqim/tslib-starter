/**
 * Globally available Actions
 */
export const ACTION_UPDATE = "ACTION_UPDATE";

/**
 * Create an action with a payload
 */
export interface ActionsWithPayload<TypeAction, TypePayload> {
  type: TypeAction;
  payload: TypePayload;
}

/**
 * Create an action that does not have a payload
 */
export interface ActionsWithoutPayload<TypeAction> {
  type: TypeAction;
}

/**
 * A very general type that means to be "an object with a many field created with createActionPayload and createAction
 */
interface ActionCreatorsMapObject {
  [key: string]: (
    ...args: any[]
  ) => ActionsWithPayload<any, any> | ActionsWithoutPayload<any>;
}

/**
 * Use this Type to merge several action object that has field created with createActionPayload or createAction
 * E.g. type ReducerWithActionFromTwoObjects = ActionsUnion<typeof ActionsObject1 &amp; typeof ActionsObject2>;
 */
export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<
  A[keyof A]
>;
