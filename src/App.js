import React, { Component } from 'react';
import './App.css';
import {Game, Board} from './game'
import History from './History'
import { Squares } from './Squares'
const board = new Board()
board.init()

class App extends Component {
  constructor (props) {
    super(props)
    this.game = new Game()
    this.board = board
    this.state = {
      time: this.game.time,
      score: this.game.score,
      testSquare: this.game.testSquare,
      highScore: this.game.highScore
    }
  }
  start(board, game) {
    if (this.gameInProgress) return
    game.history = []
    game.gameInProgress = true
    let { interval, time } = game
    game.testSquare = this.getSquare(board)
    this.setState({testSquare: game.testSquare})
    interval = setInterval(() => {
        time -= 1
        if (time === 0) {
            clearInterval(interval)
            game.gameInProgress = false
            if (this.state.score > this.state.highScore) {
              this.setState({highScore: this.state.score})      
            }
        }
        this.setState({time})
    }, 1000)
  }
  addPoint(game) {
    this.setState({score: this.state.score + 1})
  }
  recordGuess(guess, game) {
    const correct = this.state.testSquare.rank === guess.rank && this.state.testSquare.file === guess.file
    if (correct) {
      this.addPoint(game)
    }
    game.history.push({guess, testSquare: game.testSquare, correct})
    this.setState({testSquare: this.getSquare(this.board)})
  }
  handleSquareClick(e) {
    const { id } = e.target
    if (this.game.gameInProgress) {
      this.guess(id[1], id[0], this.game)
    }
  }
  guess(rank, file, game) {
      const guess = {rank, file}
      this.recordGuess(guess, game)
  }
  getSquare(board) {
      return board.chooseNewSquare()
  }
  render() {
    return (
      <div className="gameContainer">
        <h1>Chess Vision</h1>
        <div className="controls">
          <button onClick={()=>{this.start(this.board, this.game)}}>New Game</button>
          <ul>
            <li>Score: {this.state.score} points</li>
            <li>Time: {this.state.time} seconds</li>
            <li>High Score: {this.state.highScore} points</li>
          </ul>
          <h3>{`${this.state.testSquare.file || ''}${this.state.testSquare.rank || ''}`}</h3>
        </div>
        <div className="board">
          <Squares squares={board.squares} handleClick={this.handleSquareClick.bind(this)} />
        </div>
        <div>
          <History history={this.game.history}/>
        </div>
      </div>
    )
  }
}

export default App;
