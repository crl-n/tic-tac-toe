
import Event from "./event.js";
export default class TicTacToe {

    constructor() {
        this.board = Array(9).fill();
        this.currentPlayer = 'X';
        this.finished = false;

        this.updateCellEvent = new Event();
        this.switchPlayerEvent = new Event();
        this.victoryEvent = new Event();
        this.drawEvent = new Event();
    }

    reset() {
        this.board.fill();
        this.currentPlayer = 'X';
        this.finished = false;
    }

    play(move) {
        if (this.finished || this.board[move]) {
            return ;
        }

        this.board[move] = this.currentPlayer;
        this.updateCellEvent.trigger({ index: move, player: this.currentPlayer });

        this.checkIfFinished(move);

        if (!this.finished) {
            this.switchPlayer();
            this.switchPlayerEvent.trigger(this.currentPlayer);
        }
    }

    checkIfFinished(move) {
        const axes = {
            horizontal: [0, 1, 2].map(i => i + Math.floor(move / 3) * 3),
            vertical: [0, 3, 6].map(i => i + move % 3),
            diagonal: [0, 4, 8],
            counterDiagonal: [2, 4, 6]
        };

        const allCurrentPlayer = (mask) => {
            return this.board.filter((value, i) => mask.includes(i))
                .every((value, i, array) => value === this.currentPlayer);
        }

        for (const axis of Object.values(axes)) {
            if (allCurrentPlayer(axis)) {
                this.victoryEvent.trigger(this.currentPlayer);
                this.finished = true;
                return ;
            }
        }

        if (!this.board.some((value, i, array) => !value)) {
            this.drawEvent.trigger();
            this.finished = true;
        }
    }

    switchPlayer() {
        if (this.currentPlayer === 'X') {
            return this.currentPlayer = 'O';
        }
        this.currentPlayer = 'X';
    }
}
