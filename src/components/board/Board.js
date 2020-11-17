import React from 'react';

import { checkWinner, tradeCards, selectCard, startNewGame, startNextRound } from 'redux/game/GameActions';

import Bid from 'components/bid/Bid';
import Hand from 'components/hand/Hand';
import logo from './css/logo.svg';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {connect} from 'react-redux'

const Board = ({
  phase,
  aiHand,
  myHand,
  displayWinner,
  winner,
  noOfRounds,
  tradeCards,
  checkWinner,
  startNextRound,
  startNewGame,
  selectCard,
}) => {

  return (
    
    <div className="Board">
      <div className="CardGame">
        
        <div className = "Buttons">
            <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
              <Button 
                onClick={() => tradeCards()}
                disabled = {phase !== 2}>
                Trade Cards
              </Button>
              <Button  
                onClick={() => checkWinner()} 
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
              onClick = {() => {noOfRounds<2 ? startNextRound(): startNewGame()}} 
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
          {myHand && <Hand id="myHand" hand={myHand} visible={true} onClick={(i) => selectCard(i)} />}
        </div>
        <div>
          <Bid/>     
        </div>
                
      </div>
    </div>   
  )

}


const mapStateToProps = state => {
  return {
    phase: state.phase,
    aiHand: state.aiHand,
    myHand: state.myHand,
    displayWinner: state.displayWinner,
    winner: state.winner,
    noOfRounds: state.noOfRounds,
    
  }
}

const mapDispatchToProps = (dispatch) => {
 
  return{
    tradeCards: () => dispatch(tradeCards()),
    checkWinner: () => dispatch(checkWinner()),
    startNextRound: () =>dispatch(startNextRound()),
    startNewGame: () => dispatch(startNewGame()),
    selectCard: (i) => dispatch(selectCard(i)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board) ;