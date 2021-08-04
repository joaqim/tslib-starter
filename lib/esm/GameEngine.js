"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameStateReducer = exports.GameActions = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const Actions_1 = require("./Actions");
const Actions_h_1 = require("./Actions.h");
const DefaultRenderer_1 = tslib_1.__importDefault(require("./DefaultRenderer"));
const DefaultTimer_1 = tslib_1.__importDefault(require("./DefaultTimer"));
const react_1 = require("react");
const isPromise = (obj) => !!(obj &&
    obj.then &&
    obj.then.constructor &&
    obj.then.call &&
    obj.then.apply);
const EVENTS = `onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onWheel onTouchCancel onTouchEnd onTouchMove onTouchStart onKeyDown onKeyPress onKeyUp`;
const GAME_INITIALIZE = "GAME_INITIALIZE";
const GAME_STARTED = "GAME_STARTED";
const GAME_STOPPED = "GAME_STOPPED";
const GAME_SWAPPED = "GAME_SWAPPED";
exports.GameActions = {
    update: Actions_1.createActionPayload(Actions_h_1.ACTION_UPDATE),
    initialize: Actions_1.createActionPayload(GAME_INITIALIZE),
    start: Actions_1.createAction(GAME_STARTED),
    stop: Actions_1.createAction(GAME_STOPPED),
    swap: Actions_1.createActionPayload(GAME_SWAPPED),
};
const gameStateReducer = (state, action) => {
    console.log({ action });
    switch (action.type) {
        case Actions_h_1.ACTION_UPDATE:
            return {
                ...state,
                entities: state.systems.reduce((state, sys) => sys(state, action), state.entities),
            };
        case GAME_INITIALIZE:
            return { ...state, entities: action.payload };
        case GAME_STARTED:
            return state;
        case GAME_STOPPED:
            return state;
        case GAME_SWAPPED:
            return { ...state, entities: action.payload };
    }
};
exports.gameStateReducer = gameStateReducer;
const GameEngine = (props) => {
    const [state, dispatch] = react_1.useReducer(exports.gameStateReducer, {
        entities: {},
        systems: props.systems,
    });
    const [input, setInput] = react_1.useState([]);
    const containerRef = react_1.useRef(null);
    const [previousTime, setPreviousTime] = react_1.useState(null);
    const [previousDelta, setPreviousDelta] = react_1.useState(null);
    const [timer] = react_1.useState(props.timer || new DefaultTimer_1.default());
    const clear = () => {
        setPreviousTime(null);
        setPreviousDelta(null);
    };
    const start = () => {
        timer.start();
        dispatch(exports.GameActions.start());
    };
    const stop = () => {
        timer.stop();
        dispatch(exports.GameActions.stop());
    };
    const swap = async (newEntities) => {
        if (isPromise(newEntities))
            newEntities = await newEntities;
        dispatch(exports.GameActions.swap(newEntities || {}));
        clear();
    };
    react_1.useEffect(() => {
        timer.subscribe(updateHandler);
        async () => {
            dispatch(exports.GameActions.initialize(isPromise(props.entities)
                ? await props.entities
                : props.entities || {}));
        };
        if (props.running)
            start();
        return () => {
            stop();
            timer.unsubscribe(updateHandler);
        };
    });
    const inputHandlers = EVENTS.split(" ")
        .map((name) => ({
        name,
        handler: (payload) => {
            payload.persist();
            input.push({ name, payload });
        },
    }))
        .reduce((prev, val) => {
        prev[val.name] = val.handler;
        return prev;
    }, {});
    const updateHandler = (currentTime) => {
        let args = {
            input,
            window,
            dispatch,
            time: {
                current: currentTime,
                previous: previousTime,
                delta: currentTime - (previousTime || currentTime),
                previousDelta,
            },
        };
        dispatch(exports.GameActions.update(args));
    };
    return (jsx_runtime_1.jsxs("div", Object.assign({ ref: containerRef }, inputHandlers, { children: ["GameEngine", props.renderer(state.entities, window)] }), void 0));
};
GameEngine.defaultProps = {
    systems: [],
    entities: {},
    running: true,
    renderer: DefaultRenderer_1.default,
};
exports.default = GameEngine;
