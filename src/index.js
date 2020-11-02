import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/game/Game.js';
import {GameProvider} from 'GameContext.js'


ReactDOM.render(
  <React.StrictMode>
    <div className="App">
        <header className="App-header">
          <GameProvider>
            <Game />
          </GameProvider>
        </header>
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);

