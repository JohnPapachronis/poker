import { 
  START_NEW_GAME, 
  START_NEXT_ROUND,
} from './GameTypes';

export const startNewGame = () => {
  return {
    type: START_NEW_GAME
  }
}

export const startNextRound = () => {
  return {
    type: START_NEXT_ROUND
  }
}