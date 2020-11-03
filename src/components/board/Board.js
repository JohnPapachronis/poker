import React, { useContext } from 'react';

import {GameContext} from 'GameContext.js';

import Hand from 'components/hand/Hand.js';
import logo from './css/logo.svg';

const Board = () => {
  
  const { deckValue,myHandValue, aiHandValue,selectCard,
    tradeCards,
    checkWinner} = useContext(GameContext);
    const [deck, setDeck] = deckValue;
    const [myHand, setMyHand] = myHandValue;
    const [aiHand, setAiHand] = aiHandValue;
  return (
    
    <div className="Board">
      
      <div className="CardGame">
        
        <div className = "Buttons">
          <button onClick={() => tradeCards(deck, myHand)}> 
            Trade Cards 
          </button>
          <button onClick={() => checkWinner()}>
              Check Winner 
            </button>
        </div>
        <div className = "enemyBoard">
          {aiHand && <Hand id="aiHand" hand={aiHand} visible={true} />}
        </div>
        <div className = "ReactLogo">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className = "playerBoard">
          {myHand && <Hand id="myHand" hand={myHand} visible={true} onClick={(i)=>selectCard(i,myHand,3)} />}
        </div>

      </div>
    </div>
   
  )
}

export default Board;