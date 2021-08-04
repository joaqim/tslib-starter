"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultTimer {
    subscribers;
    loopId;
    constructor() {
        this.subscribers = [];
        this.loopId = null;
    }
    loop = (time) => {
        if (this.loopId) {
            this.subscribers.forEach((callback) => {
                callback(time);
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
    subscribe(callback) {
        if (this.subscribers.indexOf(callback) === -1)
            this.subscribers.push(callback);
    }
    unsubscribe(callback) {
        this.subscribers = this.subscribers.filter((s) => s !== callback);
    }
}
exports.default = DefaultTimer;
