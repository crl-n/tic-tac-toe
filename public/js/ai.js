export function randomMove(board) {
    let validMoves = board.reduce((acc, val, i) => {
        if (val === undefined) {
            acc.push(i);
        }
        return acc;
    }, []);

    let move = validMoves[Math.floor(Math.random() * validMoves.length)];

    return move;
}

