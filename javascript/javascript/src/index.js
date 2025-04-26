////////////////////////////////////////
// Welcome to AIエディタCursor完全ガイド //
////////////////////////////////////////

/*
ステップ1：⌘+K または Ctrl+K を新しい行で押すと遊べる三目並べの React コンポーネントを生成してみてください。
  - そして、それを以下のコードに統合して、npm start で実行してみてください。

  ステップ2：マウスを使ってすべてのコードをハイライトし、⌘+K または Ctrl+K を押してください。
  - ゲームを何らかの方法で変更するよう指示してください（例えば、インラインスタイルを追加する、スタート画面を追加する、3x3の代わりに4x4にするなど）。

ステップ3: ⌘+L または Ctrl+L を押して、チャットにコードの機能を尋ねてください。

ステップ4: 自分のプロジェクトで Cursor を試してみたい場合は、左上のファイルメニューからフォルダを開いてください。
*/


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const playClickSound = () => {
  const audio = new window.Audio(process.env.PUBLIC_URL + '/click.mp3');
  audio.currentTime = 0;
  audio.play();
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 4000); // 4秒後に停止
};
