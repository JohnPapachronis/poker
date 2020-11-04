import { RateableCards} from 'lib/cards/CardFunctions.js'
import { pokerRateCards } from 'lib/poker/PokerFunctions.js';

const aiBehavior = ( aiHand ) => {
  
  switch (pokerRateCards( aiHand )){
    case 'ThreeΟfaKind':
      threeOfAKindSolution(aiHand);
    break;
    case 'TwoPair':
      twoPairSolution(aiHand);
      break;
    case 'OnePair':
      onePairSolution( aiHand );
      break;
    case 'HighCard':
      console.log("H")
      break;
    default: console.log('all')

  }
}
const onePairSolution = (hand) => {
    const rateCards = new RateableCards(hand);
    console.log((rateCards.byLengthValue)['2'][0][0].rank);
    const pairRank= (rateCards.byLengthValue)['2'][0][0].rank ;
    hand.map(elem => elem.rank !== pairRank ? elem.isSelected = true : elem) 
    
    
}

const twoPairSolution =  ( hand ) => {
  const rateCards = new RateableCards(hand);
  const firstPairRank= (rateCards.byLengthValue)['2'][0][0].rank ;
  const secondPairRank= (rateCards.byLengthValue)['2'][1][0].rank ;
  console.log(firstPairRank,secondPairRank)
  hand.map(elem => elem.rank === firstPairRank || elem.rank === secondPairRank ? elem : elem.isSelected = true) 
  
}

const threeOfAKindSolution = ( hand ) => {

  const rateCards = new RateableCards(hand);
  console.log((rateCards.byLengthValue)['3'][0][0].rank);
  const pairRank= (rateCards.byLengthValue)['3'][0][0].rank ;
  hand.map(elem => elem.rank !== pairRank ? elem.isSelected = true : elem) 

}


  export {aiBehavior};