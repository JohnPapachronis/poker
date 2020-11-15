import { createStore } from 'redux';
import gameReducer from './game/GameReducer';

const store = createStore(gameReducer);

export default store;