import React, { useState, forwardRef, useImperativeHandle } from 'react';
import './App.css';

function calculateWinner(squares) {
  // 4x4盤面で4つ揃いを判定
  const size = 4;
  // 横・縦
  for (let i = 0; i < size; i++) {
    // 横
    if (
      squares[i * size] &&
      squares[i * size] === squares[i * size + 1] &&
      squares[i * size] === squares[i * size + 2] &&
      squares[i * size] === squares[i * size + 3]
    ) {
      return squares[i * size];
    }
    // 縦
    if (
      squares[i] &&
      squares[i] === squares[i + size] &&
      squares[i] === squares[i + size * 2] &&
      squares[i] === squares[i + size * 3]
    ) {
      return squares[i];
    }
  }
  // 斜め（左上→右下）
  if (
    squares[0] &&
    squares[0] === squares[5] &&
    squares[0] === squares[10] &&
    squares[0] === squares[15]
  ) {
    return squares[0];
  }
  // 斜め（右上→左下）
  if (
    squares[3] &&
    squares[3] === squares[6] &&
    squares[3] === squares[9] &&
    squares[3] === squares[12]
  ) {
    return squares[3];
  }
  return null;
}

const TicTacToe = forwardRef((props, ref) => {
  const size = 4;
  const [squares, setSquares] = useState(Array(size * size).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setSquares(Array(size * size).fill(null));
      setXIsNext(true);
    }
  }));

  const playClickSound = () => {
    const audio = new window.Audio(process.env.PUBLIC_URL + '/click.mp3');
    audio.currentTime = 0;
    audio.play();
    // 4秒後に停止
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 4000);
  };

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    playClickSound();
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    if (props.onClickSquare) props.onClickSquare();
  };

  const renderSquare = (i) => (
    <button className="square" onClick={() => handleClick(i)} key={i}>
      {squares[i]}
    </button>
  );

  let status;
  if (winner) {
    status = `勝者: ${winner}`;
  } else if (squares.every(Boolean)) {
    status = '引き分けです';
  } else {
    status = `次の手番: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div>
      <div className="status">{status}</div>
      {[...Array(size)].map((_, row) => (
        <div className="board-row" key={row}>
          {[...Array(size)].map((_, col) => renderSquare(row * size + col))}
        </div>
      ))}
    </div>
  );
});

export default TicTacToe; 