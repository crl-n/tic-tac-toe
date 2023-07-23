import Event from "./event.js";

export default class TicTacToe {

    constructor() {
        this.board = Array(9).fill();
        this.currentPlayer = 'X';
        this.finished = false;

        this.updateCellEvent = new Event();
        this.victoryEvent = new Event();
        this.drawEvent = new Event();
    }

    play(move) {

    }

    victory() {

    }
}