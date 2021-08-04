import { createAction, createActionPayload } from "./Actions";
import { ActionsUnion, ACTION_UPDATE } from "./Actions.h";
import DefaultRenderer from "./DefaultRenderer";
import DefaultTimer from "./DefaultTimer";
import { useState, useEffect, useReducer, useRef } from "react";
import { ITimer } from "./Timer.h";

const isPromise = (obj: any): boolean =>
  !!(
    obj &&
    obj.then &&
    obj.then.constructor &&
    obj.then.call &&
    obj.then.apply
  );

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

const EVENTS = `onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onWheel onTouchCancel onTouchEnd onTouchMove onTouchStart onKeyDown onKeyPress onKeyUp`;

const GAME_INITIALIZE = "GAME_INITIALIZE";
const GAME_STARTED = "GAME_STARTED";
const GAME_STOPPED = "GAME_STOPPED";
const GAME_SWAPPED = "GAME_SWAPPED";

export const GameActions = {
  update: createActionPayload<typeof ACTION_UPDATE, any>(ACTION_UPDATE),

  initialize: createActionPayload<
    typeof GAME_INITIALIZE,
    { type: string; payload: any }
  >(GAME_INITIALIZE),
  start: createAction<typeof GAME_STARTED>(GAME_STARTED),
  stop: createAction<typeof GAME_STOPPED>(GAME_STOPPED),
  swap: createActionPayload<
    typeof GAME_SWAPPED,
    { type: string; payload: any }
  >(GAME_SWAPPED),
};

export type AcceptedActions = ActionsUnion<typeof GameActions>;

export const gameStateReducer = (
  state: GameReducerState,
  action: AcceptedActions
): GameReducerState => {
  console.log({ action });
  switch (action.type) {
    case ACTION_UPDATE:
      return {
        ...state,
        entities: state.systems.reduce(
          (state: any, sys: any) => sys(state, action),
          state.entities
        ),
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

const GameEngine: React.FC<GameEngineProps> = (props) => {
  const [state, dispatch] = useReducer(gameStateReducer, {
    entities: {},
    systems: props.systems,
  });

  const [input, setInput] = useState<any[]>([]);

  const containerRef = useRef(null);

  const [previousTime, setPreviousTime] = useState<number | null>(null);
  const [previousDelta, setPreviousDelta] = useState<number | null>(null);
  const [timer] = useState(props.timer || new DefaultTimer());

  const clear = () => {
    setPreviousTime(null);
    setPreviousDelta(null);
  };
  const start = () => {
    timer.start();
    dispatch(GameActions.start());
  };

  const stop = () => {
    timer.stop();
    dispatch(GameActions.stop());
  };

  const swap = async (newEntities: any) => {
    if (isPromise(newEntities)) newEntities = await newEntities;
    dispatch(GameActions.swap(newEntities || {}));
    clear();
  };

  useEffect(() => {
    timer.subscribe(updateHandler);

    async () => {
      dispatch(
        GameActions.initialize(
          isPromise(props.entities)
            ? await props.entities
            : props.entities || {}
        )
      );
    };
    if (props.running) start();

    return () => {
      stop();
      timer.unsubscribe(updateHandler);
    };
  });

  const inputHandlers = EVENTS.split(" ")
    .map((name) => ({
      name,
      handler: (payload: any) => {
        payload.persist();
        input.push({ name, payload });
      },
    }))
    .reduce(
      (prev: { [name: string]: any }, val: { name: string; handler: any }) => {
        prev[val.name] = val.handler;
        return prev;
      },
      {}
    );

  const updateHandler = (currentTime: number) => {
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

    dispatch(GameActions.update(args));
  };

  return (
    <div ref={containerRef} {...inputHandlers}>
      GameEngine
      {props.renderer(state.entities, window)}
    </div>
  );
};

GameEngine.defaultProps = {
  systems: [],
  entities: {},
  running: true,
  renderer: DefaultRenderer,
};

/*

   const GameEngine = (props: GameEngineProps) => {
   const [running, setRunning] = useState(props.running);
   const [input, setInput] = useState<IAction[]>([]);
   const [events, setEvents] = useState<Event[]>([]);
   const [previousTime, setPreviousTime] = useState<number | null>(null);
   const [previousDelta, setPreviousDelta] = useState<number | null>(null);
   const timer: ITimer = props.timer || new DefaultTimer();

   const dispatch = (e: Event) =>
   setTimeout(() => {
   setEvents([...events, e]);
   if (props.onEvent) props.onEvent(e);
   });
   const defer = (e: Event) => dispatch(e);

   const entitiesReducer = async (
entities: Entities,
action: { type: string; args?: any }
) => {
if (action.type === "initialize") {
return isPromise(props.entities)
  ? await props.entities
  : props.entities || {};
  }
  };

  const [entities, entitiesDispatch] = useReducer(
  entitiesReducer,
  props.entities
  );
  const systemsReducer = (
systems: any[],
action: { type: string; args: any }
) => {
if (action.type === "update") {
return systems.map((system) => {
system.update(action.args);
});
}
};
const [systems, systemsDispatch] = useReducer(systemsReducer, props.systems);

const updateHandler = (currentTime: number) => {
let args = {
input,
window,
events,
dispatch,
defer,
entities,
time: {
current: currentTime,
previous: previousTime,
delta: currentTime - (previousTime || currentTime),
previousDelta,
},
};

systemsDispatch({ type: "update", args });

setInput([]);
setEvents([]);
setPreviousTime(currentTime);
setPreviousDelta(args.time.delta);
};

const clear = () => {};
const start = () => {
clear();
setRunning(true);
};
const stop = () => {
  clear();
};

useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    async () => {
    //setEntities( isPromise(props.entities) ? await props.entities : props.entities || {});
    entitiesDispatch({ type: "initialize" });

    if (props.running) start();
    };

    return () => {
    stop();
    timer.unsubscribe(updateHandler);
    };
    }, []);

const inputHandlers = () =>
EVENTS.split(" ")
.map((name) => ({
      name,
      handler: (payload: any) => {
      payload.persist();
      setInput([...input, { name, payload }]);
      },
      }))
.reduce(
    (
     prev: { [name: string]: any },
     val: { name: string; handler: any }
    ) => {
    prev[val.name] = val.handler;
    return prev;
    },
    {}
    );

return (
    <>
    <h1>Running: {running}</h1>
    <div {...inputHandlers}></div>
    </>
    );
};

*/

export default GameEngine;
