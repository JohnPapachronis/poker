import React, { useContext } from 'react';

import {GameContext} from 'GameContext.js';

import Hand from 'components/hand/Hand.js';
import logo from './css/logo.svg';

const Board = ({
  selectCard,
  tradeCards,
  checkWinner,
}) => {
  
  const { myHandValue, aiHandValue} = useContext(GameContext);
  
  return (
    
    <div className="Board">
      
      <div className="CardGame">
        
        <div className = "Buttons">
          <button onClick={() => tradeCards()}> 
            Trade Cards 
          </button>
          <button onClick={() => checkWinner()}>
              Check Winner 
            </button>
        </div>
        <div className = "enemyBoard">
          {aiHandValue[0] && <Hand id="aiHand" hand={aiHandValue[0]} visible={true} onClick={()=>{}} />}
        </div>
        <div className = "ReactLogo">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className = "playerBoard">
          {myHandValue[0] && <Hand id="myHand" hand={myHandValue[0]} visible={true} onClick={(i)=>selectCard(i)} />}
        </div>

      </div>
    </div>
   
  )
}

export default Board;