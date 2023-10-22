import TicTacToe from "./model.js";
import View from "./view.js";
import PlayerType from "./playerType.js";
import { randomMove } from "./ai.js";

export default class Controller {

    constructor() {
        const self = this;

        const players = {
            x: PlayerType.USER,
            o: PlayerType.AI
        };

        this.model = new TicTacToe();
        this.view = new View();

        this.view.playEvent.addListener(function (move) {
            if (self.model.currentPlayer === 'X') {
                self.model.play(move);
            }
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

            if (activePlayer === 'O') {
                let move = randomMove(self.model.board);

                setTimeout(() => self.model.play(move), 1000);
            }
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
