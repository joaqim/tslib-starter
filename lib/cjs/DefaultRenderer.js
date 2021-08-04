"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
exports.default = (entities, window) => {
    if (!entities || !window)
        return null;
    return Object.keys(entities)
        .filter((key) => entities[key].renderer)
        .map((key) => {
        const entity = entities[key];
        if (typeof entity.renderer === "object")
            return jsx_runtime_1.jsx(entity.renderer.type, Object.assign({ window: window }, entity), key);
        return jsx_runtime_1.jsx(entity.renderer, Object.assign({ window: window }, entity), key);
    });
};
