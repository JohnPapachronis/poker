import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { checkWinner, tradeCards, selectCard, startNewGame, startNextRound } from 'redux/game/GameActions';

import Bid from 'components/bid/Bid';
import Hand from 'components/hand/Hand';
import logo from './css/logo.svg';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const Board = () => {
  
  const dispatch = useDispatch();
  const phase = useSelector(state => state.phase);
  const aiHand = useSelector(state => state.aiHand);
  const myHand = useSelector(state => state.myHand);
  const displayWinner = useSelector(state => state.displayWinner);
  const winner = useSelector(state => state.winner);
  const noOfRounds = useSelector(state => state.noOfRounds);


  return (
    
    <div className="Board">
      <div className="CardGame">
        
        <div className = "Buttons">
            <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
              <Button 
                onClick={() => dispatch(tradeCards())}
                disabled = {phase !== 2}>
                Trade Cards
              </Button>
              <Button  
                onClick={() => dispatch(checkWinner())} 
                disabled = {phase !== 3}> 
                Check Winner
              </Button>
            </ButtonGroup>
        </div>
        <div className = "enemyBoard">
          {aiHand && <Hand id="aiHand" hand={aiHand} visible={phase === 4} onClick = {()=>{}} /> }
        </div>
        {displayWinner && (
          <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
            <Button  
              onClick = {() => {noOfRounds<2 ? dispatch(startNextRound) : dispatch(startNewGame)}} 
              type="submit" 
              disabled = {phase!==4}> 
              {winner}  
            </Button> 
          </ButtonGroup> 
        )}
        <div className = "ReactLogo">
          {!displayWinner && <img src={logo} className="App-logo" alt="logo" />}
        </div>
        <div className = "playerBoard">
          {myHand && <Hand id="myHand" hand={myHand} visible={true} onClick={(i) => dispatch(selectCard(i))} />}
        </div>
        <div>
          <Bid/>     
        </div>
                
      </div>
    </div>   
  )
}

export default Board;