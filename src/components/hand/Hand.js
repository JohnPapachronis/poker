import React from 'react';
import Card from '../card/Card.js';

const Hand = ({
  hand,
  visible,
  onClick,
}) => (
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

export default Hand;
