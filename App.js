//With comments
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import getWinner from './utils';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gameBoard: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], // this is being used in 3 places. Make a one time variable and re-instantiate it.
      currentPlayer: 1, //The Game will always start with player 1 (X)
      player1Score: 0,
      player2Score: 0,
      enabled: false
    }
  }

  restartRound = () => {
    this.setState({
      gameBoard: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      enabled: false
    })
  }

  newGame = () => {
    this.setState({
      gameBoard: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1,
      player1Score: 0,
      player2Score: 0,
      enabled: false
    });
  }

  playerMove = (row, col) => {

    const { gameBoard, currentPlayer } = this.state
    const newBoard = { ...gameBoard };

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

  determineWinner = (newBoard, currentPlayer) => {

    const { player1Score, player2Score } = this.state;
    if (getWinner(newBoard)) {
      currentPlayer === 1 ? this.setState({ player1Score: player1Score + 1 }) : this.setState({ player2Score: player2Score + 1 });
      this.setState({ enabled: true })
    }

  }

  renderIcon = (row, col) => {
    const playerMove = this.state.gameBoard[row][col];  // dont use switch case if there are only 2 conditions
    switch (playerMove) {
      case 1: return <Text style={styles.x}>X</Text>;
      case -1: return <Text style={styles.o}>O</Text>;
      default:
        return <View />;
    }
  }

  render() {
    // This board can be generated 3x with some map code.
    // there are some styles are are written inline like borderLeftWidth, should these be put in the styles const?
    return (
      <View style={styles.container} >
        <View>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.square, { borderLeftWidth: 0, borderTopWidth: 0 }]} onPress={() => this.playerMove(0, 0)} disabled={this.state.enabled}>
              {this.renderIcon(0, 0)}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.square, { borderTopWidth: 0 }]} onPress={() => this.playerMove(0, 1)} disabled={this.state.enabled}>
              {this.renderIcon(0, 1)}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.square, { borderRightWidth: 0, borderTopWidth: 0 }]} onPress={() => this.playerMove(0, 2)} disabled={this.state.enabled}>
              {this.renderIcon(0, 2)}
            </TouchableOpacity>
          </View>
          
          <View style={styles.row}>
            <TouchableOpacity style={[styles.square, { borderLeftWidth: 0 }]} onPress={() => this.playerMove(1, 0)} disabled={this.state.enabled}>
              {this.renderIcon(1, 0)}
            </TouchableOpacity>
            <TouchableOpacity style={styles.square} onPress={() => this.playerMove(1, 1)} disabled={this.state.enabled}>
              {this.renderIcon(1, 1)}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.square, { borderRightWidth: 0 }]} onPress={() => this.playerMove(1, 2)} disabled={this.state.enabled}>
              {this.renderIcon(1, 2)}
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.square, { borderLeftWidth: 0, borderBottomWidth: 0 }]} onPress={() => this.playerMove(2, 0)} disabled={this.state.enabled}>
              {this.renderIcon(2, 0)}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.square, { borderBottomWidth: 0 }]} onPress={() => this.playerMove(2, 1)} disabled={this.state.enabled}>
              {this.renderIcon(2, 1)}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.square, { borderRightWidth: 0, borderBottomWidth: 0 }]} onPress={() => this.playerMove(2, 2)} disabled={this.state.enabled}>
              {this.renderIcon(2, 2)}
            </TouchableOpacity>
          </View>
        </View>

        <View tyle={{ alignItems: 'center' }}>
          <View style={styles.row}>
            <Text style={this.state.currentPlayer === 1 ? styles.xL : styles.x}>X=</Text>
            <Text style={styles.score}>{this.state.player1Score}</Text>
            <Text style={[this.state.currentPlayer === -1 ? styles.oL : styles.o, {marginLeft: 20}]}>O=</Text>
            <Text style={styles.score}>{this.state.player2Score}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => this.restartRound()}>
          <Text style={{ fontSize: 20 }}>Restart Round</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.newGame()}>
          <Text style={{ fontSize: 20 }}>New Game</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'forestgreen',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  square: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    width: 100,
    height: 100,
  },
  row: {
    flexDirection: 'row'
  },
  x: {
    fontSize: 80, // font size is being used many times. make a variable for it.
    color: 'red'
  },
  xL: {
    fontSize: 80,
    fontWeight: 'bold',
    color: 'red'
  },
  o: {
    fontSize: 80,
    color: 'blue'
  },
  oL: {
    fontSize: 80,
    fontWeight: 'bold',
    color: 'blue'
  },
  score: {
    fontSize: 80,
  }
});
//end of comments