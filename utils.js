export default getWinner = (gameBoard) => {

    //Check row for winner
    let isWinner = false;
    for (let row = 0; row < 3; row++) {
        const sum = gameBoard[row][0] + gameBoard[row][1] + gameBoard[row][2];
        if(alertWinner(sum)) return true;
    }
    //Check column for winner
    for (let col = 0; col < 3; col++) {
        const sum = gameBoard[0][col] + gameBoard[1][col] + gameBoard[2][col];
        if(alertWinner(sum)) return true;
    }
    //Check diagonal for winner;
    const diagonal1 = gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2];
    if(alertWinner(diagonal1)) return true;
    const diagonal2 = gameBoard[0][2] + gameBoard[1][1] + gameBoard[2][0];
    if(alertWinner(diagonal2)) return true;

    return false;
}

alertWinner = (sum) => {
    if (sum === 3){
        alert('Player 1 is the winner!');
        return true;
    } 
    else if (sum === -3){
        alert('Player 2 is the winner!');
        return true;
    } 
    return false;
}