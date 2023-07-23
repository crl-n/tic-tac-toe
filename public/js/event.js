export default class Event {

    constructor() {
        this.listeners = [];
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
