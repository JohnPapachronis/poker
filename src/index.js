import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/board/Board.js';

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
        <header className="App-header">
          <Board />
        </header>
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);

