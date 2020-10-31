import React, { useState, useEffect, useContext } from 'react';
import { getDeck, dealCards, countSelected } from 'lib/cards/CardFunctions.js';
import pokerHand from 'lib/poker/PokerHand.js';
import Board from 'components/board/Board.js';
import {GameContext} from 'GameContext.js';


const Game = () => {
  
  const {deckValue, myHandValue, aiHandValue} = useContext(GameContext);
  const [deck, setDeck] = deckValue;
  const [myHand, setMyHand] = myHandValue;
  const [aiHand, setAiHand] = aiHandValue;
  
  
  useEffect(() => {
    changeMyHand( dealCards(deck,5) );
    changeAiHand( dealCards([...deck].splice(5, deck.length), 5) );
  },[]);

  
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
    const myPokerHand = new pokerHand(myHand);
    const aiPokerHand = new pokerHand(aiHand);
    console.log('');
    console.log( myPokerHand.stringValue > aiPokerHand.stringValue
    // console.log(true
            ? 'You win!'
            : 'AI wins!');
  }

  return (  
    <Board  
      selectCard = {(i) => selectCard(i,myHand,3)} 
      tradeCards = {() => tradeCards(deck, myHand)}
      checkWinner = {() => checkWinner()}
    />
  )
}

export default Game;