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
        if (this.board[move]) {
            return ;
        }

        this.board[move] = this.currentPlayer;
        this.updateCellEvent.trigger({ index: move, player: this.currentPlayer });
        this.switchPlayer();
    }

    switchPlayer() {
        if (this.currentPlayer === 'X') {
            return this.currentPlayer = 'O';
        }
        this.currentPlayer = 'X';
    }

    victory() {

    }
}