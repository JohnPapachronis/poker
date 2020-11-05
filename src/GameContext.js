import React,{useState, createContext} from 'react';

import { getDeck } from 'lib/cards/CardFunctions';
import { dealCards, countSelected } from 'lib/cards/CardFunctions.js';
import { PokerHand, pokerRateCards } from 'lib/poker/PokerFunctions.js';

import {aiBehavior} from 'lib/aiBehavior/AiBehavior.js'
export const GameContext = createContext(); 

export const GameProvider = props => {
  
  const [deck, setDeck] = useState(getDeck());
  const [myHand, setMyHand] = useState(null);
  const [aiHand, setAiHand] = useState(null);

  const changeMyHand = ([cards,newDeck]) => {
    setMyHand(cards);
    setDeck(newDeck);
  }
  
  const changeAiHand = ([cards,newDeck]) => {
    setAiHand(cards);
    setDeck(newDeck);
  }


  const selectCard = (i,hand,limit) => {
   
    const card = {...hand[i]};
    hand.some(card => card.rank === "A") && limit++ ;
    if (countSelected(hand) < limit || card.isSelected == true) card.isSelected = card.isSelected ? false : true ;
    setMyHand([...hand.slice(0,i), card, ...hand.slice(i+1)]);
  }
  

  const tradeCards = (deck, hand, aiHand) => {
    const [newCards,newDeck] = dealCards(deck, countSelected(hand));
    
    const newHand = hand.filter((card) => !(card.isSelected)).concat(newCards); 
    aiBehavior([...aiHand]);
    const [newAICards,finalDeck] = dealCards(newDeck, countSelected(aiHand));
    const newAiHand =  aiHand.filter((card) => !(card.isSelected)).concat(newAICards); 
    
    
    setDeck(finalDeck);
    setMyHand(newHand);
    setAiHand(newAiHand);
    
  }
  

  const checkWinner = () => {
    
    console.log(deck);
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