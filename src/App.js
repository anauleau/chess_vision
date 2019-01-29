import React, { Component } from 'react';
import './App.css';
import {Game, Board, Square} from './game'
const game = new Game()
const board = new Board()
board.init()
const squaresToRender = board.squares.map(square => {
  return <div id={square.file + square.rank} className={'square ' + square.type}></div>
})
class App extends Component {
  render() {
    return (
      <div className="gameContainer">
        <h1>Chess Vision</h1>
        <div className="controls">
          <button onClick={game.start(board)}>New Game</button>
          <ul>
            <li>Score: {game.score}</li>
            <li>Time: {game.time}</li>
          </ul>
          <h3>{game.testSquare.file + game.testSquare.rank}</h3>
        </div>
        <div className="board">
          {squaresToRender}
        </div>
      </div>
    )
  }
}

export default App;
