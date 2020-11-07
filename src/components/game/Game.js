import React, { useEffect, useContext } from 'react';

import {GameContext} from 'GameContext';

import Board from 'components/board/Board';
import { dealCards } from 'lib/cards/CardFunctions';

const Game = () => {
  
  const {deckValue,changeMyHand,changeAiHand} = useContext(GameContext);
  const [deck, setDeck] = deckValue;
  
  useEffect(() => {
    const [cards, newDeck] = dealCards(deck, 5);
    changeMyHand( [cards, newDeck] );
    changeAiHand( dealCards(newDeck, 5) );
    console.log();
  },[]);

  return (  
    <Board/>
  )
}

export default Game;