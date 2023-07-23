import TicTacToe from "./model.js";
import View from "./view.js";

export default class Controller {

    constructor() {
        this.model = new TicTacToe();
        this.view = new View();

        this.view.playEvent.addListener(function (move) {
            this.model.play(move);
        });

        this.model.updateCellEvent.addListener(function (data) {
            this.view.updateCell(data);
        });
        this.model.victoryEvent.addListener(function (winner) {
            this.view.victory(winner);
        });
        this.model.drawEvent.addListener(function () {
            this.view.draw();
        });
    }

    run() {
        this.view.render();
    }
}