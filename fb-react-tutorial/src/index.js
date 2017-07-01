import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square(props) { 
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

function calculateWinner(squares) {
  const lines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

  for(let i=0; i < lines.length; i++) { 
    const [a, b, c] = lines[i]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a]
  }

  return null
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square 
      key={i}
      value={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}
    />
  }

  render() {
    let rows = Array.apply(null, Array(3)).map((row, idx) => {
      let cols = []
      for(let i = 0; i < 3; i++) {
          cols.push(this.renderSquare(idx * 3 + i))
      }

      return <div key={idx} className="board-row">{cols}</div>
    })

    return <div>{rows}</div>
  }
}

class Game extends React.Component {
  constructor() {
    super()
    this.state = { 
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true, 
    }
  }

  _handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    
    if(squares[i] || calculateWinner(squares))
      return 

    squares[i] = this.state.xIsNext ? 'X' : 'O'
      
    this.setState({
      history: history.concat([{squares: squares}]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)
    const moves = history.map((step, move) => {
      const desc = move ? ('Move #' + move) : 'Game Start'
      return ( 
        <li key={move}><a href='#' onClick={() => this.jumpTo(move)}>{desc}</a></li>
      )
    })

    let status = winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares} 
            onClick={(i) => this._handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
