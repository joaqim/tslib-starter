import { ITimer } from "./Timer.h";
declare type UpdateFn = (time?: number) => void;
declare class DefaultTimer implements ITimer {
    subscribers: any[];
    loopId: number | null;
    constructor();
    loop: (time?: number | undefined) => void;
    start(): void;
    stop(): void;
    subscribe(callback: UpdateFn): void;
    unsubscribe(callback: UpdateFn): void;
}
export default DefaultTimer;
