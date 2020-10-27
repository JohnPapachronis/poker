import { pokerRateCards, handValue, comboValue } from './PokerFunctions.js'
import { normalizeCard } from '../cards/CardFunctions.js'

class PokerHand{

  constructor(hand) {
    this.hand = hand.map(card=> normalizeCard(card));
    this.combination = pokerRateCards(this.hand);
    this.stringValue = comboValue(this.combination) + handValue(this.hand);
    console.log(this.hand);
    console.log('COMBINATION: ----------- '+this.combination); 
    console.log( comboValue(this.combination)+' + ' + handValue(this.hand)+' = ' + this.stringValue);
    console.log('');

  }

}

export default PokerHand;