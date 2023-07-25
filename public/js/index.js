import Controller from "./controller.js";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/js/serviceWorker.js');
    });
}

const app = new Controller();

app.run();