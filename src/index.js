import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/game/Game.js';
import {GameProvider} from 'GameContext.js';

import {createStore } from 'redux';
import GameReducer from './redux/game/GameReducer'
import {Provider} from 'react-redux';

const store = createStore(
  GameReducer,
  window.__REDUX_DEVTOOLS_EXTENSTION__ && window.__REDUX_DEV
);

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
        <header className="App-header">
          <Provider store={store}>    
            <GameProvider>
              <Game />
            </GameProvider>
          </Provider>
        </header>
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);

