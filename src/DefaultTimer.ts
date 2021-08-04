/*
With thanks, https://github.com/FormidableLabs/react-game-kit/blob/master/src/native/utils/game-loop.js

The MIT License (MIT)
Copyright (c) 2013
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import { ITimer } from "./Timer.h";

type UpdateFn = (time?: number) => void;

class DefaultTimer implements ITimer {
  subscribers: any[];

  loopId: number | null;

  constructor() {
    this.subscribers = [];
    this.loopId = null;
  }

  loop = (time?: number) => {
    if (this.loopId) {
      this.subscribers.forEach((callback) => {
        callback(time!);
      });
    }

    this.loopId = requestAnimationFrame(this.loop);
  };

  start() {
    if (!this.loopId) {
      this.loop();
    }
  }

  stop() {
    if (this.loopId) {
      cancelAnimationFrame(this.loopId);
      this.loopId = null;
    }
  }

  subscribe(callback: UpdateFn) {
    if (this.subscribers.indexOf(callback) === -1)
      this.subscribers.push(callback);
  }

  unsubscribe(callback: UpdateFn) {
    this.subscribers = this.subscribers.filter((s) => s !== callback);
  }
}

/*
const DefaultTimer: ITimer = () => {
  const [subscribers, setSubscribers] = useState<UpdateFn[]>([]);
  const [loopId, setLoopId] = useState<number | null>(null);

  const loop = (time?: number): void => {
    if (loopId) {
      subscribers.forEach((callback) => callback(time!));
    }
    setLoopId(requestAnimationFrame(loop));
  };

  const start = () => {
    if (!loopId) loop();
  };

  const stop = () => {
    if (loopId) {
      cancelAnimationFrame(loopId);
      setLoopId(null);
    }
  };

  const subscribe = (callback: UpdateFn) => {
    if (subscribers.indexOf(callback) === -1)
      setSubscribers([...subscribers, callback]);
  };

  const unsubscribe = (callback: UpdateFn) => {
    setSubscribers(subscribers.filter((s) => s !== callback));
  };
};
*/
export default DefaultTimer;
