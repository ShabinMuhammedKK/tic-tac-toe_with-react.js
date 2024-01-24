import { useState } from "react";
import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function App({ xisNext, value, onPlay }) {
  function handleClicked(i) {
    if (value[i] || Calculatewinner(value)) {
      return;
    }
    const nextSquares = value.slice();
    if (xisNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }
  const winner = Calculatewinner(value);
  let status;
  if (winner) {
    status = "Winner : " + winner;
  } else {
    status = "Nest player : " + (xisNext ? "X" : "O");
  }

  return (
    <div className="app">
      <div className="status">{status}</div>
      <div className="row">
        <Square value={value[0]} onSquareClick={() => handleClicked(0)} />
        <Square value={value[1]} onSquareClick={() => handleClicked(1)} />
        <Square value={value[2]} onSquareClick={() => handleClicked(2)} />
      </div>
      <div className="row">
        <Square value={value[3]} onSquareClick={() => handleClicked(3)} />
        <Square value={value[4]} onSquareClick={() => handleClicked(4)} />
        <Square value={value[5]} onSquareClick={() => handleClicked(5)} />
      </div>
      <div className="row">
        <Square value={value[6]} onSquareClick={() => handleClicked(6)} />
        <Square value={value[7]} onSquareClick={() => handleClicked(7)} />
        <Square value={value[8]} onSquareClick={() => handleClicked(8)} />
      </div>
    </div>
  );
}
function Calculatewinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
export default function Game() {
  const [xisNext, setxisNext] = useState(true);
  const [history, sethistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handleplay(nextSquares) {
    const nexthistory = [...history.slice(0, currentMove + 1), nextSquares];
    sethistory(nexthistory);
    setCurrentMove(nexthistory.length - 1);
    setxisNext(!xisNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setxisNext(nextMove % 2 === 0);
  }

  const move = history.map((value, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="app">
        <App xisNext={xisNext} value={currentSquares} onPlay={handleplay} />
      </div>
      <div className="game-info">
        <ol>{move}</ol>
      </div>
    </div>
  );
}
