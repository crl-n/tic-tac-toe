import TicTacToe from "./model.js";
import View from "./view.js";

export default class Controller {

    constructor() {
        const self = this;

        this.model = new TicTacToe();
        this.view = new View();

        this.view.playEvent.addListener(function (move) {
            self.model.play(move);
        });
        this.view.resetEvent.addListener(function () {
            self.model.reset();
        })
        this.view.resetEvent.addListener(function () {
            self.view.reset();
        })

        this.model.updateCellEvent.addListener(function (data) {
            self.view.updateCell(data);
        });
        this.model.switchPlayerEvent.addListener(function (activePlayer) {
            self.view.updateTurnIndicators(activePlayer);
        });
        this.model.victoryEvent.addListener(function (winner) {
            self.view.victory(winner);
        });
        this.model.drawEvent.addListener(function () {
            self.view.draw();
        });
    }

    run() {
        this.view.render();
    }
}
