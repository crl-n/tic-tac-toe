export default class Event {

    constructor() {
        this.listeners = [];
        this.trigger = this.trigger.bind(this);
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    trigger(params) {
        for (const listener of this.listeners) {
            listener(params);
        }
    }
}
