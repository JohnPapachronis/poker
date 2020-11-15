import React, { useEffect, useContext } from 'react';

import {GameContext} from 'GameContext';

import Board from 'components/board/Board';
import { dealCards } from 'lib/cards/CardFunctions';

const Game = () => {
  
  const {deckValue,changeMyHand,changeAiHand} = useContext(GameContext);
  const [deck] = deckValue;
  
  useEffect(() => {
    const [cards, newDeck] = dealCards(deck, 5);
    changeMyHand( [cards, newDeck] );
    changeAiHand( dealCards(newDeck, 5) );
  },[]);

  return (  
    <Board/>
  )
}

export default Game;