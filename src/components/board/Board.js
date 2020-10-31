import React, { useState, useEffect, useContext } from 'react';
import {GameContext} from 'GameContext.js';

import Hand from 'components/hand/Hand.js';
import logo from './css/logo.svg';

const Board = ({
  selectCard,
  tradeCards,
  checkWinner,
}) => {
  
  const {deckValue, myHandValue, aiHandValue} = useContext(GameContext);
  
  return (
    
    <div className="Board">
      {aiHandValue[0] && <Hand id="aiHand" hand={aiHandValue[0]} visible={true} onClick={()=>{}} />}
      <img src={logo} className="App-logo" alt="logo" />
      {myHandValue[0] && <Hand id="myHand" hand={myHandValue[0]} visible={true} onClick={(i)=>selectCard(i)} />}
      <button onClick={() => tradeCards()}> Trade Cards </button>
      <button onClick={() => checkWinner()}> Check Winner </button>
    </div>
    
   
  )
}

export default Board;