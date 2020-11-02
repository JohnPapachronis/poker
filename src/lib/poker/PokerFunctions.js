import { RateableCards, normalizeCard } from '../cards/CardFunctions.js'

const pokerRatings = {
  RoyalStraightFlush: hand => hand.isStraight(5) && hand.isSameSuit() && hand.hasAce(),
  StraightFlush: hand => hand.isStraight(5) && hand.isSameSuit(),
  FourOfAKind: hand => hand.hasSameRank(4),
  FullHouse: hand => hand.hasSameRank(3) && hand.hasSameRank(2),
  Flush: hand => hand.isSameSuit(),
  Straight: hand => hand.isStraight(5),
  ThreeΟfaKind: hand => hand.hasSameRank(3),
  TwoPair:  hand => hand.hasNoPairsOf(2, 2),
  OnePair:  hand => hand.hasSameRank(2),
  HighCard: hand => true,
};
  

const pokerRateCards = cards => {
  const rateableCards = new RateableCards(cards);
  const [result] = Object.entries( pokerRatings )
    .find(([, is]) => is(rateableCards));
    
  return result;
}

const handValue = cards => {
  const rateableCards = new RateableCards(cards);
  return rateableCards.handValue();
}

const comboValue = combination => {
  return Math.abs( Object.keys(pokerRatings)
                        .findIndex(element => element === combination) 
                  - 9 );
}

const PokerHand = hand => {

  const normHand = hand.map(card=> normalizeCard(card)); 
  const combination = pokerRateCards(normHand);
  const stringValue = comboValue(combination) + handValue(normHand);
  console.log(normHand);
  console.log('COMBINATION: ----------- ' + combination); 
  console.log( comboValue(combination)+' + ' + handValue(normHand) + ' = ' + stringValue);
  console.log('');
  return stringValue;

}

export { PokerHand };