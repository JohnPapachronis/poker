import React, { useContext, useEffect } from 'react';

import {GameContext} from 'GameContext.js';

import Hand from 'components/hand/Hand.js';
import logo from './css/logo.svg';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Input from '@material-ui/core/Input';

const Board = () => {
  
  const { deckValue,myHandValue, displayWinners, reactIcon, aiHandValue, selectCard, handleBid, tradeCards, checkWinner,changeVisibilityOfWinner } = useContext(GameContext);

  const [deck, setDeck] = deckValue;
  const [myHand, setMyHand] = myHandValue;
  const [aiHand, setAiHand] = aiHandValue;
  const [displayWinner, setDisplayWinner] = displayWinners;
  const [displayReactIcon, setReactIcon] = reactIcon;

  

  return (
    
    <div className="Board">
      <div className="CardGame">
        
        <div className = "Buttons">
            <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
              <Button onClick={() => tradeCards(deck, myHand, aiHand)}>Trade Cards</Button>
              <Button  onClick={() => changeVisibilityOfWinner()}>Check Winner</Button>
            </ButtonGroup>
        
        </div>
        <div className = "enemyBoard">
          {aiHand && <Hand id="aiHand" hand={aiHand} visible={true} onClick = {()=>{}} /> }
        </div>
        {displayWinner && checkWinner() }
        <div className = "ReactLogo">
          {displayReactIcon && <img src={logo} className="App-logo" alt="logo" />}
        </div>
        <div className = "playerBoard">
          {myHand && <Hand id="myHand" hand={myHand} visible={true} onClick={(i)=>selectCard(i,myHand,3)} />}
        </div>
        
        <form className= 'Bids' noValidate autoComplete="off" onSubmit>
        
        </form>

      </div>
      
    </div>
   
  )
}

export default Board;