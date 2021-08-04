type UpdateFn = (time?: number) => void;

export interface ITimer {
  subscribers: any[];
  loopId: number | null;

  loop: (time?: number) => void;
  start: () => void;
  stop: () => void;
  subscribe: (callback: UpdateFn) => void;
  unsubscribe: (callback: UpdateFn) => void;
}
