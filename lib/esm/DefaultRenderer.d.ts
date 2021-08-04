interface IEntity {
    renderer: any;
}
interface IEntities {
    [key: string]: IEntity;
}
interface IWindow {
}
declare const _default: (entities: IEntities, window: IWindow) => JSX.Element[] | null;
export default _default;
