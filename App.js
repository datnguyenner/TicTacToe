import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { getWinner, getNewGameBoard } from './utils';
import { styles, cellBorders } from './styles';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = getNewGameBoard();
  }

  restartRound() {
    this.setState({
      gameBoard: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      enabled: false
    })
  }

  newGame() {
    this.setState(getNewGameBoard());
  }

  playerMove(row, col) {
    const { gameBoard, currentPlayer } = this.state
    const newBoard = [...gameBoard];

    if (newBoard[row][col] === 0) {
      newBoard[row][col] = currentPlayer;
      const nextPlayer = currentPlayer === 1 ? -1 : 1;
      this.setState({
        gameBoard: newBoard,
        currentPlayer: nextPlayer
      })
      this.determineWinner(newBoard, currentPlayer);
    }

  }

  determineWinner(newBoard, currentPlayer) {

    const { player1Score, player2Score } = this.state;
    if (getWinner(newBoard)) {
      currentPlayer === 1 ? this.setState({ player1Score: player1Score + 1 }) : this.setState({ player2Score: player2Score + 1 });
      this.setState({ enabled: true })
    }

  }

  renderIcon(row, col) {

    const playerMove = this.state.gameBoard[row][col];
    if (playerMove === 1) return <Text style={styles.x}>X</Text>;
    if (playerMove === -1) return <Text style={styles.o}>O</Text>;

    return <View />;
  }

  renderBoard() {

    const rows = this.state.gameBoard.map((row, rowIndex) => {
      return (
        <View key={rowIndex} style={styles.row}>
          {this.renderColumns(row, rowIndex)}
        </View>)
    });

    return rows;
  }

  renderColumns(row, rowIndex) {

    const columns = row.map((col, colIndex) => {
      return (
        <TouchableOpacity key={colIndex} style={[styles.square, cellBorders[rowIndex][colIndex]]} onPress={this.playerMove.bind(this, rowIndex, colIndex)} disabled={this.state.enabled}>
          {this.renderIcon(rowIndex, colIndex)}
        </TouchableOpacity>
      );
    })

    return columns;
  }


  render() {

    return (
      <View style={styles.container} >
        <View>
          {this.renderBoard()}
        </View>

        <View style={styles.scores}>
          <View style={styles.row}>
            <Text style={this.state.currentPlayer === 1 ? styles.xL : styles.x}>X=</Text>
            <Text style={styles.score}>{this.state.player1Score}</Text>
            <Text style={[this.state.currentPlayer === -1 ? styles.oL : styles.o, styles.scoreMargin]}>O=</Text>
            <Text style={styles.score}>{this.state.player2Score}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={this.restartRound.bind(this)}>
          <Text style={styles.endGameText}>Restart Round</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.newGame.bind(this)}>
          <Text style={styles.endGameText}>New Game</Text>
        </TouchableOpacity>

      </View>
    );
  }
}
