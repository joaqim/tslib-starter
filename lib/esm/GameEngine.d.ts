import { ActionsUnion } from "./Actions.h";
import { ITimer } from "./Timer.h";
export interface GameEngineProps {
    systems: any[];
    entities?: any;
    renderer?: any;
    running?: boolean;
    timer?: ITimer;
    onEvent?: (e: Event) => void;
}
interface GameReducerState {
    entities: any;
    systems: any[];
    timer?: ITimer;
}
export declare const GameActions: {
    update: (payload: any) => import("./Actions.h").ActionsWithPayload<"ACTION_UPDATE", any>;
    initialize: (payload: {
        type: string;
        payload: any;
    }) => import("./Actions.h").ActionsWithPayload<"GAME_INITIALIZE", {
        type: string;
        payload: any;
    }>;
    start: () => import("./Actions.h").ActionsWithoutPayload<"GAME_STARTED">;
    stop: () => import("./Actions.h").ActionsWithoutPayload<"GAME_STOPPED">;
    swap: (payload: {
        type: string;
        payload: any;
    }) => import("./Actions.h").ActionsWithPayload<"GAME_SWAPPED", {
        type: string;
        payload: any;
    }>;
};
export declare type AcceptedActions = ActionsUnion<typeof GameActions>;
export declare const gameStateReducer: (state: GameReducerState, action: AcceptedActions) => GameReducerState;
declare const GameEngine: React.FC<GameEngineProps>;
export default GameEngine;
