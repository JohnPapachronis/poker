import { RateableCards, groupBy, normalizeCard} from 'lib/cards/CardFunctions.js'
import { pokerRateCards } from 'lib/poker/PokerFunctions.js';

const aiBehavior = ( aiHand ) => {
  
  switch (pokerRateCards( aiHand )){
    case 'ThreeΟfaKind':
      return threeOfAKindSolution(aiHand);
    case 'TwoPair':
      return twoPairSolution(aiHand);
    case 'OnePair':
      return onePairSolution(aiHand);
    case 'HighCard':
      console.log("H")
      return highCard(aiHand);
    default:  
      return aiHand;
  }

}

const onePairSolution = (aiHand) => {
    const rateCards = new RateableCards(aiHand);
    const pairRank= (rateCards.byLengthValue)['2'][0][0].rank ;
    return hand
      .map(elem => elem.rank !== pairRank 
        ? {...elem, isSelected : true} 
        : {...elem});
    
}

const twoPairSolution =  ( aiHand ) => {
  const rateCards = new RateableCards(aiHand);
  const firstPairRank= (rateCards.byLengthValue)['2'][0][0].rank ;
  const secondPairRank= (rateCards.byLengthValue)['2'][1][0].rank ;
  console.log(firstPairRank,secondPairRank)
  return hand
    .map(elem => !(elem.rank === firstPairRank || elem.rank === secondPairRank) 
      ? {...elem, isSelected : true} 
      : {...elem});
}

const threeOfAKindSolution = ( aiHand ) => {

  const rateCards = new RateableCards(aiHand);
  console.log((rateCards.byLengthValue)['3'][0][0].rank);
  const pairRank = (rateCards.byLengthValue)['3'][0][0].rank ;
  return hand
    .map(elem => elem.rank !== pairRank 
      ? {...elem, isSelected : true} 
      : {...elem});

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
  sortedHand.forEach(card => (card.weight<10)? card.isSelected=true : card );
  if (!rateCards.hasAce){
    sortedHand[3].isSelected=false;
    sortedHand[4].isSelected=false;
  }
  return sortedHand;

}

export {aiBehavior};