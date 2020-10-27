import React, { useState, useEffect } from 'react';
import logo from './css/logo.svg';
import Hand from '../hand/Hand.js';
import { getDeck, suffle, dealCards, countSelected } from '../../lib/cards/CardFunctions.js';

const Board = () => {

  const [deck, setDeck] = useState(suffle(getDeck()));
  const [myHand, setMyHand] = useState(null);
  const [aiHand, setAiHand] = useState(null);
  
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

  const checkWinner = (myHand,aiHand) => {
    //getElementById("aiHand").visible = true;
  }

  return (
    <div className="Board">
      {aiHand && <Hand id="aiHand" hand={aiHand} visible={false} onClick={()=>{}} />}
      <img src={logo} className="App-logo" alt="logo" />
      {myHand && <Hand id="myHand" hand={myHand} visible={true} onClick={(i)=>selectCard(i,myHand,3)} />}
      <button onClick={() => tradeCards(deck, myHand)}> Trade Cards </button>
      <button onClick={() => checkWinner(myHand,aiHand)}> Check Winner </button>
    </div>
  )
}

export default Board;