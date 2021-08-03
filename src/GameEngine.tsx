import { useState, useEffect } from "react";

const isPromise = (obj: any): boolean =>
  !!(
    obj &&
    obj.then &&
    obj.then.constructor &&
    obj.then.call &&
    obj.then.apply
  );

type Entity = any;
type Entities = Promise<Entity[]> | Entity[];

export interface GameEngineProps {
  entities: Entities;
  running?: boolean;
}

const GameEngine = (
  props: GameEngineProps = { entities: [], running: true }
) => {
  const [entities, setEntities] = useState([]);
  const [running, setRunning] = useState(props.running);

  useEffect(() => {
    async () => {
      if (isPromise(props.entities)){
        await (props.entities as Promise<Entity[]>).then((entities) => console.log(entities));
        //await Promise.then<Entity[]>(props.entities);
      /*
        await (props.entities as Promise<Entity>).then((entities) =>
          setEntities(entities)
        );
         */

      }
    if (running) start();
  });

  const clear = () => {};
  const start = () => {
    clear();
  };
  const stop = () => {};

  const swap = async (newEntities: Entities) => {
    if (isPromise(newEntities))
      await (newEntities as Promise<Entity[]>).then((entities) =>
        setEntities(entities as Entity[])
      );
  };
};

export default GameEngine;
