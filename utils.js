export default getWinner = (gameBoard) => {

    //Check row and column for winner
    for (let i = 0; i < 3; i++) {
        const sumRow = gameBoard[i][0] + gameBoard[i][1] + gameBoard[i][2];
        if (alertWinner(sumRow)) return true;
        const sumCol = gameBoard[0][i] + gameBoard[1][i] + gameBoard[2][i];
        if (alertWinner(sumCol)) return true;
    }

    //Check diagonals for winner;
    const diagonal1 = gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2];
    if (alertWinner(diagonal1)) return true;
    const diagonal2 = gameBoard[0][2] + gameBoard[1][1] + gameBoard[2][0];
    if (alertWinner(diagonal2)) return true;

    return false;
}

alertWinner = (sum) => {

    switch (sum) {
        case 3: alert('Player 1 is the winner!');
            return true;
        case -3: alert('Player 2 is the winner!');
            return true;
        default:
            return false;
    }
}