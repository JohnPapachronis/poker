import * as actions from './GameTypes';
import { getDeck, dealCards, countSelected } from 'lib/cards/CardFunctions';
import { aiBehavior } from 'lib/aiBehavior/AiBehavior';
import { PokerHand } from 'lib/poker/PokerFunctions';

const initialState = {
  deck: [],
  myHand: [],
  aiHand: [],
  pot: 0,
  bidAmount: 0,
  walletAmount: 10000,
  phase: 0,
  noOfRounds: 0,
  winner:"None",
  displayWinner: false,
}

const gameReducer = ( state = initialState, action ) => {
  
  switch (action.type){

    case actions.START_NEW_GAME: {
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

    case actions.START_NEXT_ROUND: {
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
 
    case actions.CARD_SELECTED: {
      
      const i = action.payload;
      const hand = state.myHand;
      const card = {...hand[i]};
      const limit = hand.some(card => card.rank === "A") ? 4 : 3 ;
      if (countSelected(hand) < limit || card.isSelected == true) {
        card.isSelected = card.isSelected ? false : true ;
      }

      return {
        ...state,
        myHand: [...hand.slice(0,i), card, ...hand.slice(i+1)],
      }
    }

    case actions.CARDS_TRADED: {

      const [newCards,newDeck] = dealCards(state.deck, countSelected(state.myHand));
      const newHand = state.myHand.filter((card) => !(card.isSelected)).concat(newCards); 
      console.log('eep', newHand);
      console.log('before aiBehavior ', state.aiHand);
      const aiSelectedHand = aiBehavior(state.aiHand);
      console.log('after aiBehaviour ', aiSelectedHand);
      const [newAICards, finalDeck] = dealCards(newDeck, countSelected(aiSelectedHand));
      const newAiHand =  aiSelectedHand.filter((card) => !(card.isSelected)).concat(newAICards); 

      return {
        ...state,
        deck: finalDeck,
        myHand: newHand,
        aiHand: newAiHand,
        phase: 3,
      }

    }

    case actions.WINNER_CHECKED: {
      const final = state.walletAmount + 2*state.bidAmount;

      return {
        ...state,
        walletAmount: (PokerHand(state.myHand) > PokerHand(state.aiHand) ? final : state.walletAmount),
        bidAmount: 0,
        winner: PokerHand(state.myHand) > PokerHand(state.aiHand) ? 'You win!' : 'AI wins!',
        phase: 4,
        displayWinner: true,
      }

    }

    case actions.BID_CHANGED: {
      if (action.payload > state.walletAmount || action.payload < 10) return {...state};
      return {
        ...state,
        bidAmount: state.bidAmount + action.payload,
        walletAmount: state.walletAmount - action.payload, 
        phase: state.phase === 1 ? 2 : state.phase,
      }
    }

    default: 
      return { ...state }
  
  }
}


export default gameReducer;