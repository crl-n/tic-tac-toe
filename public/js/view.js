import Event from "./event.js";

export default class View {

    constructor() {
        this.playEvent = new Event();
        this.resetEvent = new Event();
    }

    render() {
        const self = this;

        const game = document.getElementById('game-container');
        const board = document.createElement('div');
        board.className = 'board';

        this.cells = Array(9).fill().map(function (_, i) {
            const cell = document.createElement('div');
            cell.className = 'cell';

            cell.addEventListener('click', function () {
                self.playEvent.trigger(i);
            });

            board.appendChild(cell);

            return cell;
        });

        this.resetButton = document.createElement('div');
        this.resetButton.className = 'reset';
        this.resetButton.addEventListener('click', function () {
            self.resetEvent.trigger();
        });
        this.resetButton.innerText = 'Reset';

        this.message = document.createElement('div');
        this.message.className = 'message';

        game.appendChild(board);
        game.appendChild(this.resetButton);
        game.appendChild(this.message);
    }

    updateCell(data) {
        this.cells[data.index].innerText = `${data.player}`;
    }

    reset() {
        for (const cell of this.cells) {
            cell.innerText = '';
        }
        this.message.innerText = '';
    }

    victory(winner) {
        this.message.textContent = `${winner} wins!`;
    }

    draw() {
        this.message.textContent = 'The game is a draw!';
    }
}