import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Board from 'components/board/Board';

const Game = () => {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({type: 'START_NEW_GAME'});
  },[]);

  return (  
    <Board/>
  )
}

export default Game;