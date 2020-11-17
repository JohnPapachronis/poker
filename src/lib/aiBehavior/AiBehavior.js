import { RateableCards} from 'lib/cards/CardFunctions'
import { pokerRateCards } from 'lib/poker/PokerFunctions';

const aiBehavior = ( aiHand ) => {
  
  switch ( pokerRateCards(aiHand) ){
    case 'FourOfAKind':
      return nOfaKindSolution(aiHand, 4)
    case 'ThreeΟfaKind':
      return nOfaKindSolution(aiHand, 3);
    case 'TwoPair':
      return twoPairSolution(aiHand);
    case 'OnePair':
      return nOfaKindSolution(aiHand, 2);
    case 'HighCard':
      return highCard(aiHand);
    default:  
      return aiHand;
  }
}
const nOfaKindSolution = (hand, n) => {
    const rateCards = new RateableCards(hand);
    console.log((rateCards.byLengthValue)[n][0][0].rank);
    const pairRank= (rateCards.byLengthValue)[n][0][0].rank ;
    return hand
      .map(card => card.rank !== pairRank && card.weight<13 
        ? {...card, isSelected : true} 
        : {...card});
}

const twoPairSolution = hand => {
  const rateCards = new RateableCards(hand);
  const firstPairRank= (rateCards.byLengthValue)['2'][0][0].rank ;
  const secondPairRank= (rateCards.byLengthValue)['2'][1][0].rank ;
  console.log(firstPairRank,secondPairRank)
  return hand
    .map(card => !(card.rank === firstPairRank || card.rank === secondPairRank) && card.weight<13
      ? {...card, isSelected : true} 
      : {...card});
}

const highCard = hand => {

  const rateCards = new RateableCards(hand);
  if (rateCards.isStraight(4)) {
    const list = rateCards.straightList(4);
    console.log(hand);
    console.log(list);
    const newHand = [...hand];
    newHand
      .find(uselessCard => !list
        .some(card => uselessCard.rank===card.rank && uselessCard.suit===card.suit))
          .isSelected = true;
    return newHand;
  }

  const sortedHand = [...hand].sort( (a,b) => a.weight - b.weight );
  const newHand = sortedHand.map( card => card.weight<11 ? {...card, isSelected: true} : {...card} );
  if (!rateCards.hasAce()){
    newHand[3].isSelected = false;
    newHand[4].isSelected = false;
  }
  return newHand;

}

export {aiBehavior};