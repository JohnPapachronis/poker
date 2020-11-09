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
  const [winner, setWinner] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [walletAmount, setWalletAmount] = useState(10000);
  const [displayWinner, setDisplayWinner] = useState(false);
  const [displayReactIcon, setReactIcon] = useState(true);
  const [phase, setPhase] = useState(1);
  const [numberOfRounds, setNumberOfRounds] = useState(1);

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

  const changePhase = () => {
    setPhase(( phase === 4 ) ? 1 : phase + 1);
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
    setPhase(3);
  }

  const reset = () => {
    changeVisibilityOfWinner();
    const resetDeck = numberOfRounds >= 3 ? getDeck() : deck;
    console.log(resetDeck);
    const [cards, newDeck] = dealCards(resetDeck, 5);
    changeMyHand( [cards, newDeck] );
    changeAiHand( dealCards(newDeck, 5) );
    setPhase(1);
    setNumberOfRounds(numberOfRounds < 3 ? numberOfRounds +1 : 1);
  }

  const checkWinner = () => {
    
    const final = walletAmount + 2*bidAmount;
    setWalletAmount(PokerHand(myHand) > PokerHand(aiHand) ? final : walletAmount);
    setBidAmount(0);
    setWinner(PokerHand(myHand) > PokerHand(aiHand) ? 'You win!' : 'AI wins!');
    setPhase(4);
    changeVisibilityOfWinner();
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
        winnerValue: [winner, setWinner],
        phaseValue : [phase, setPhase] ,
        changeMyHand,
        changeAiHand,
        selectCard,
        tradeCards,
        checkWinner,
        changeVisibilityOfWinner,
        reset,
        changePhase
      }}>
      {props.children}
    </GameContext.Provider>
  );

}