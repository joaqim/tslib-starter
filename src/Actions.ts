import { ActionsWithoutPayload, ActionsWithPayload } from "./Actions.h";

/**
 * Create an action that has a strongly typed string literal name with a strongly typed payload
 */
export function createActionPayload<TypeAction, TypePayload>(
  actionType: TypeAction
): (payload: TypePayload) => ActionsWithPayload<TypeAction, TypePayload> {
  return (p: TypePayload): ActionsWithPayload<TypeAction, TypePayload> => {
    return {
      payload: p,
      type: actionType,
    };
  };
}

/**
 * Create an action with no payload
 */
export function createAction<TypeAction>(
  actionType: TypeAction
): () => ActionsWithoutPayload<TypeAction> {
  return (): ActionsWithoutPayload<TypeAction> => {
    return {
      type: actionType,
    };
  };
}
