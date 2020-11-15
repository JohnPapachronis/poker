import { 
  START_NEW_GAME, 
  START_NEXT_ROUND,
} from './GameTypes';
const { getDeck, dealCards } = require("lib/cards/CardFunctions")


const initialState = {
  deck: [],
  myHand: [],
  aiHand: [],
  pot: 0,
  phase: 0,
  noOfRounds: 0,
}





const gameReducer = ( state = initialState, action ) => {
  
  switch (action.type){

    case START_NEW_GAME: {
      const resetDeck = getDeck();
      const [myCards, newDeck] = dealCards(resetDeck, 5);
      const [aiCards, finalDeck] = dealCards(newDeck, 5);
     
      return {
        ...state,
        deck: finalDeck,
        myHand: myCards,
        aiHand: aiCards,
        pot: 0,
        phase: 1,
        noOfRounds: 0,
      }
    }

    case START_NEXT_ROUND: {
      const [myCards, newDeck] = dealCards(state.deck, 5);
      const [aiCards, finalDeck] = dealCards(newDeck, 5);

      return {
        ...state,
        deck: finalDeck,
        myHand: myCards,
        aiHand: aiCards,
        pot: 0,
        phase: 1,
        noOfRounds: state.noOfRounds + 1,
      }

    }

  }
}

export default gameReducer;