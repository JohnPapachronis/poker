import React, { useEffect, useContext } from 'react';
import { GameContext } from 'GameContext';

import { useSelector, useDispatch } from 'react-redux';

import Board from 'components/board/Board';
import { dealCards } from 'lib/cards/CardFunctions';
import store from 'redux/store';

const Game = () => {
  
  const {deckValue,changeMyHand,changeAiHand} = useContext(GameContext);
  const [deck] = deckValue;
  const dispatch = useDispatch();
  //dispatch({type: 'START_NEW_GAME'});
  
  useEffect(() => {
    dispatch({type: 'START_NEW_GAME'});
    
    const [cards, newDeck] = dealCards(deck, 5);
    changeMyHand( [cards, newDeck] );
    changeAiHand( dealCards(newDeck, 5) );
  },[]);

  return (  
    <Board/>
  )
}

export default Game;