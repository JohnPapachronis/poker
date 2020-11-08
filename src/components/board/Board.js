import React, { useContext, useEffect } from 'react';

import {GameContext} from 'GameContext';

import Bid from 'components/bid/Bid';
import Hand from 'components/hand/Hand';
import logo from './css/logo.svg';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Input from '@material-ui/core/Input';

const Board = () => {
  
  const { deckValue,myHandValue, winnerValue, displayWinners, phaseValue, reactIcon, aiHandValue, selectCard, tradeCards, checkWinner, reset} = useContext(GameContext);

  const [deck] = deckValue;
  const [myHand] = myHandValue;
  const [aiHand] = aiHandValue;
  const [displayWinner] = displayWinners;
  const [displayReactIcon] = reactIcon;
  const [phase] = phaseValue;
  const [winner] = winnerValue;

  return (
    
    <div className="Board">
      <div className="CardGame">
        
        <div className = "Buttons">
            <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
              <Button onClick={() => tradeCards(deck, myHand, aiHand)} disabled = {phase!==2}>Trade Cards</Button>
              <Button  onClick={() => checkWinner() } disabled = {phase!==3}>Check Winner</Button>
            </ButtonGroup>
        </div>
        <div className = "enemyBoard">
          {aiHand && <Hand id="aiHand" hand={aiHand} visible={true} onClick = {()=>{}} /> }
        </div>
        {displayWinner && (
          <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
            <Button  onClick = {() => {reset()}} type="submit" disabled = {phase!==4}> {winner}  </Button> 
          </ButtonGroup> 
        )}
        <div className = "ReactLogo">
          {displayReactIcon && <img src={logo} className="App-logo" alt="logo" />}
        </div>
        <div className = "playerBoard">
          {myHand && <Hand id="myHand" hand={myHand} visible={true} onClick={(i)=>selectCard(i,myHand,3)} />}
        </div>
        <div>
          <Bid/>     
        </div>
                
      </div>
    </div>   
  )
}

export default Board;