"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAction = exports.createActionPayload = void 0;
function createActionPayload(actionType) {
    return (p) => {
        return {
            payload: p,
            type: actionType,
        };
    };
}
exports.createActionPayload = createActionPayload;
function createAction(actionType) {
    return () => {
        return {
            type: actionType,
        };
    };
}
exports.createAction = createAction;
