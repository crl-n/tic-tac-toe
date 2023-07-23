import Event from "./event.js";

export default class View {

    constructor() {
        this.playEvent = new Event();
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

        this.message = document.createElement('div');
        this.message.className = 'message';

        game.appendChild(board);
        game.appendChild(this.message);
    }

    updateCell(data) {
        this.cells[data.index].innerText = `${data.player}`;
    }

    victory(winner) {
        this.message.textContent = `${winner} wins!`;
    }

    draw() {
        this.message.textContent = 'The game is a draw!';
    }
}