import './App.css';
import TicTacToe from './TicTacToe';
import React, { useRef, useState } from 'react';

function App() {
  const tttRef = useRef();
  const [started, setStarted] = useState(false);

  const handleReset = () => {
    if (tttRef.current) {
      tttRef.current.reset();
    }
  };

  return (
    <div className="App">
      {!started ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <h1>夜つ並べ（4x4）</h1>
          <div style={{ marginBottom: '16px', fontSize: '1rem', color: '#333', maxWidth: 400 }}>
            交互に「X」と「O」を置き、縦・横・斜めのいずれか一列に自分のマークを4つ並べた方が勝ちです。
          </div>
          <button className="reset-btn" style={{ fontSize: '1.2rem', padding: '12px 32px' }} onClick={() => setStarted(true)}>
            スタート
          </button>
        </div>
      ) : (
        <>
          <div className="title-row">
            <h1>夜つ並べ（4x4）</h1>
            <button className="reset-btn" onClick={handleReset}>リセット</button>
          </div>
          <div style={{ marginBottom: '16px', fontSize: '1rem', color: '#333', maxWidth: 400 }}>
            交互に「X」と「O」を置き、縦・横・斜めのいずれか一列に自分のマークを4つ並べた方が勝ちです。
          </div>
          <div className="tictactoe-board">
            <TicTacToe ref={tttRef} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
