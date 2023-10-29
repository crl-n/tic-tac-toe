function getValidMoves(board) {
    const validMoves = board.reduce((acc, val, i) => {
        if (val === undefined) {
            acc.push(i);
        }
        return acc;
    }, []);
    
    return validMoves;
};

export function randomMove(board) {
    const moves = getValidMoves(board);
    let move = moves[Math.floor(Math.random() * moves.length)];

    return move;
}

// X = Maximizing player
// O = Minimizing player
export function minMax(board, player) {
    const isMaximizingPlayer = player === 'X';
    const opponent = isMaximizingPlayer ? 'O' : 'X';

    let bestUtility = isMaximizingPlayer ? -Infinity : Infinity;
    let bestMove = null;

    const boardCopy = [...board];

    const validMoves = getValidMoves(board);

    for (const move of validMoves) {
        boardCopy[move] = player;

        const utility = terminalUtility(boardCopy);


        if (!isMaximizingPlayer && utility === -1) {
            return [utility, move];
        } else if (isMaximizingPlayer && utility === 1) {
            return [utility, move];
        }
        
        if(utility == null) {
            let [opponentBestUtility, opponentBestMove] = minMax(boardCopy, opponent);

            if (isMaximizingPlayer && opponentBestUtility > bestUtility) {
                bestUtility = opponentBestUtility;
                bestMove = move;
            } else if (!isMaximizingPlayer && opponentBestUtility < bestUtility) {
                bestUtility = opponentBestUtility;
                bestMove = move;
            }
        } else {
            if (isMaximizingPlayer && utility > bestUtility) {
                bestUtility = utility;
                bestMove = move;
            } else if (!isMaximizingPlayer && utility < bestUtility) {
                bestUtility = utility;
                bestMove = move;
            }
        }

        boardCopy[move] = undefined;
    };

    return [bestUtility, bestMove];
}

function playerHasWon(player, board) {
    const masks = [
        [0, 1, 2], // Rows
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // Columns
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // Diagonal
        [2, 4, 6]  // Counterdiagonal
    ];

    for (const mask of masks) {
        const line = mask.map(i => board[i]);
        
        if (line.every(cell => cell === player)) {
            return true;
        }
    };
    
    return false;
}

// Check if a terminal state has been reached. If so, return a utility value,
// otherwise return null.
function terminalUtility(board) {
    const xHasWon = playerHasWon('X', board);
    const oHasWon = playerHasWon('O', board);
    const draw = !board.some(value => !value);
    
    //console.log('xHasWon', xHasWon);
    //console.log('oHasWon', oHasWon);
    //console.log('draw', draw);

    if (xHasWon) {
        return 1;
    }

    if (oHasWon) {
        return -1;
    }

    if (draw) {
        return 0;
    }

    return null;
}

