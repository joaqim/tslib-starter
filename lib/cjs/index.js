"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SayHello = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var SayHello = function (props) { return (react_1.default.createElement("div", null,
    "Hey ",
    props.name,
    ", say hello to TypeScript.")); };
exports.SayHello = SayHello;
