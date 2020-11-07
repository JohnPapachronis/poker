import React,{useState, createContext} from 'react';

import { getDeck } from 'lib/cards/CardFunctions';
import { dealCards, countSelected } from 'lib/cards/CardFunctions';
import { PokerHand, pokerRateCards } from 'lib/poker/PokerFunctions';

import {aiBehavior} from 'lib/aiBehavior/AiBehavior'
export const GameContext = createContext(); 

export const GameProvider = props => {
  
  const [deck, setDeck] = useState(getDeck());
  const [myHand, setMyHand] = useState(null);
  const [aiHand, setAiHand] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [walletAmount, setWalletAmount] = useState(10000);
  const [displayWinner, setDisplayWinner] = useState(false);
  const [displayReactIcon, setReactIcon] = useState(true);


  const changeMyHand = ([cards,newDeck]) => {
    setMyHand(cards);
    setDeck(newDeck);
  }
  
  const changeAiHand = ([cards,newDeck]) => {
    setAiHand(cards);
    setDeck(newDeck);
  }

  const changeVisibilityOfWinner = () => {
    setDisplayWinner(!displayWinner);
    setReactIcon(!displayReactIcon);
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
    console.log(aiHand);
    const aiSelectedHand = aiBehavior(aiHand);
    console.log(aiSelectedHand);
    const [newAICards,finalDeck] = dealCards(newDeck, countSelected(aiSelectedHand));
    const newAiHand =  aiSelectedHand.filter((card) => !(card.isSelected)).concat(newAICards); 

    setDeck(finalDeck);
    setMyHand(newHand);
    setAiHand(newAiHand);
  }
  
  const handleBid = (input) => {
    console.log(input);
  }

  const reset = () => {
    changeVisibilityOfWinner();
    console.log(deck);
    const [cards, newDeck] = dealCards(deck, 5);
    changeMyHand( [cards, newDeck] );
    changeAiHand( dealCards(newDeck, 5) );
  }

  const checkWinner = () => {
    
    const final = walletAmount + 2*bidAmount;
    if (PokerHand(myHand) > PokerHand(aiHand)) setWalletAmount(final);
    setBidAmount(0);
    return ( PokerHand(myHand) > PokerHand(aiHand) ? 'You win!' : 'AI wins!');

  } 
  

  return(
    <GameContext.Provider value = 
      {{
        deckValue: [deck,setDeck], 
        myHandValue: [myHand, setMyHand],
        aiHandValue: [aiHand, setAiHand],
        bidAmountValue: [bidAmount, setBidAmount],
        walletAmountValue: [walletAmount, setWalletAmount],
        displayWinners : [displayWinner, setDisplayWinner],
        reactIcon : [displayReactIcon, setReactIcon],
        changeMyHand,
        changeAiHand,
        selectCard,
        tradeCards,
        checkWinner,
        changeVisibilityOfWinner,
        handleBid,
        reset,
      }}>
      {props.children}
    </GameContext.Provider>
  );

}