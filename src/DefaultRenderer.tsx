interface IEntity {
  renderer: any;
}

interface IEntities {
  [key: string]: IEntity;
}
interface IWindow {}

export default (entities: IEntities, window: IWindow) => {
  if (!entities || !window) return null;
  return Object.keys(entities)
    .filter((key) => entities[key].renderer)
    .map((key) => {
      const entity = entities[key];
      if (typeof entity.renderer === "object")
        return <entity.renderer.type key={key} window={window} {...entity} />;
      // if (typeof entity.renderer === "function")
      return <entity.renderer key={key} window={window} {...entity} />;
    });
};
