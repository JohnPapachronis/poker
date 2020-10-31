import React, {useState, useContext} from 'react';
import Card from '../card/Card.js'; 
import {GameContext} from 'GameContext.js';


const Hand = ({
  hand,
  visible,
  onClick,
}) => {
  const value = useContext(GameContext);
  
  return(
    <div className="playingCards">
      <ul className="table">
        {hand.map(({rank, suit, isSelected}, i) => 
          <li key={"card_"+i}>
            <Card 
              rank={rank} 
              suit={suit} 
              visible={visible} 
              selected={isSelected} 
              onClick={() => onClick(i)}
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Hand;
