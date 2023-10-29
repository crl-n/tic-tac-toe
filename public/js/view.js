import Event from "./event.js";

export default class View {

    constructor() {
        this.playEvent = new Event();
        this.resetEvent = new Event();
        this.activeColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary');
    }

    render() {
        const self = this;

        const game = document.getElementById('game-container');
        const board = document.createElement('div');
        board.className = 'board';

        const turnIndicatorContainer = document.createElement('div');
        turnIndicatorContainer.className = 'indicator-container';

        const xIndicator = document.createElement('div');
        xIndicator.className = 'indicator';
        xIndicator.id = 'x-turn-indicator';
        xIndicator.innerText = 'Player X';
        xIndicator.style.backgroundColor = this.activeColor;
        turnIndicatorContainer.appendChild(xIndicator);

        const oIndicator = document.createElement('div');
        oIndicator.className = 'indicator';
        oIndicator.id = 'o-turn-indicator';
        oIndicator.innerText = 'Player O';
        turnIndicatorContainer.appendChild(oIndicator);

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

        game.appendChild(turnIndicatorContainer);
        game.appendChild(board);
        game.appendChild(this.resetButton);
        game.appendChild(this.message);
    }

    updateCell(data) {
        this.cells[data.index].innerText = `${data.player}`;
    }

    updateTurnIndicators(activePlayer) {
        const xIndicator = document.getElementById('x-turn-indicator');
        const oIndicator = document.getElementById('o-turn-indicator');
        const activeIndicator = activePlayer === 'X' ? xIndicator : oIndicator;
        const inactiveIndicator = activePlayer === 'X' ? oIndicator : xIndicator;

        activeIndicator.style.backgroundColor = this.activeColor;
        inactiveIndicator.style.backgroundColor = '';
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
