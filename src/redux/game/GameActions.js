import * as actions from './GameTypes';

export const startNewGame = () => {
  return {
    type: actions.START_NEW_GAME,
  }
}

export const startNextRound = () => {
  return {
    type: actions.START_NEXT_ROUND,
  }
}


export const selectCard = i => {
  return {
    type: actions.CARD_SELECTED,
    payload: i,
  }
}


export const tradeCards = () => {
  console.log("AAACTION");
  return {
    type: actions.CARDS_TRADED,
  }
}

export const checkWinner = () => {
  return{
    type: actions.WINNER_CHECKED,
  }
}

export const bidChange = (amount) => {
  return{
    type: actions.BID_CHANGED,
    payload: amount,
  }
} 