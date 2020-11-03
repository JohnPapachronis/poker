import React,{useState, createContext} from 'react';

import { getDeck } from 'lib/cards/CardFunctions';
import { dealCards, countSelected } from 'lib/cards/CardFunctions.js';
import { PokerHand } from 'lib/poker/PokerFunctions.js';



export const GameContext = createContext(); 

export const GameProvider = props => {
  
  const [deck, setDeck] = useState(getDeck());
  const [myHand, setMyHand] = useState(null);
  const [aiHand, setAiHand] = useState(null);

  const changeMyHand = (args) => {
    setMyHand(args[0]);
    setDeck(args[1]);
  }
  
  const changeAiHand = (args) => {
    setAiHand(args[0]);
    setDeck(args[1]);
  }
  
  const selectCard = (i,hand,limit) => {
    const card = {...hand[i]};
    hand.some(card => card.rank === "A") && limit++ ;
    if (countSelected(hand) < limit || card.isSelected == true) card.isSelected = card.isSelected ? false : true ;
    setMyHand([...hand.slice(0,i), card, ...hand.slice(i+1)]);
  }
  
  const tradeCards = (deck, hand) => {
    const [newCards,newDeck] = dealCards(deck, countSelected(hand));
    const newArray = hand.filter((card) => !(card.isSelected)).concat(newCards); 
    console.log(newDeck);
    setMyHand(newArray);
    setDeck(newDeck);
  }
  
  const checkWinner = () => {
    console.log('');
    alert( PokerHand(myHand) > PokerHand(aiHand) ? 'You win!' : 'AI wins!');
  }

  return(
    <GameContext.Provider value = 
      {{
        deckValue: [deck,setDeck], 
        myHandValue: [myHand, setMyHand],
        aiHandValue: [aiHand, setAiHand],
        changeMyHand,
        changeAiHand,
        selectCard,
        tradeCards,
        checkWinner
      }}>
      {props.children}
    </GameContext.Provider>
  );

}