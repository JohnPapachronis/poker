function suffle(deck){
  return deck.sort(() => 50-Math.random()*100);
}

const Suits = ["spades", "diams", "clubs", "hearts"];
const Ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];


function getDeck(){
  const Deck = Suits.map(suit => Ranks.map(rank => ({
    rank, 
    suit, 
    isSelected: false,
  }))).flat();

	return suffle(Deck);
}

function dealCards(deck, numOfCards){
  const cards = [...Array(numOfCards).keys()].map( (index) => deck[index]);
  const newDeck = [...deck].splice(numOfCards, deck.length);
  return [cards, newDeck];
}

function countSelected(cards){
  return cards
    .reduce( (total, card) => 
      (card.isSelected? total+1 : total)
    , 0);
}

function normalizeCard(card){
 
  switch(card.rank){
    case 'A':
      card.weight = 14;
      card.value = 'N';
      break;
    case 'K':
      card.weight = 13;
      card.value = 'M';
      break;
    case 'Q':
      card.weight = 12;
      card.value = 'L';
      break;
    case 'J':
      card.weight = 11;
      card.value = 'K';
      break;
    default:
      card.weight = parseInt(card.rank);
      card.value = (card.weight + 9).toString(36).toUpperCase();
  }
  return card;

}

const reduce = (list, reducer, initValue) => {
  let result = initValue;
  if (!(list instanceof Array)) {
      list = Object.values(list);
  }
  for (let elem of list){
    result = reducer(result, elem);
  }

  return result;
}


const groupBy = (list, criteria) => reduce(
  list,
  (obj, elem) => {
    if (!(list instanceof Array)) {
      list = Object.values(list);
    }
    const group = 
      (typeof criteria === 'string')
      ? elem[criteria]
      : criteria(elem);
    
    if (!obj.hasOwnProperty(group)){
      obj[group]=[];
    }
    obj[group].push(elem);
    return obj;
  },
  {}
);

class RateableCards {

  constructor(hand) {
    this.hand = hand.map(card => normalizeCard(card));
    const byValueUnordered = groupBy( this.hand, 'value' );
    const byValueOrdered = {};
    Object.keys(byValueUnordered).sort().forEach(function(key) {
      byValueOrdered[key] = byValueUnordered[key];
    });
    this.byValue = {...byValueOrdered};
    this.byLengthValue = groupBy( Object.values(this.byValue), 'length' );
    this.bySuit = groupBy(this.hand, 'suit');
    this.byLengthSuit = groupBy( Object.values(this.bySuit), 'length' );
  }

  handValue(){
    return Object
      .entries( this.byLengthValue )
        .reduce((accumulator, currentValue) => {
          currentValue[1].forEach(element =>
            accumulator = currentValue[0] + element[0].value + accumulator
            );
          return accumulator;
        },'');  
  }

  hasAce() {
    return ( this.hand.some( elem => elem.rank==='A' ) );
  }

  hasSameRank(num) {
    return this.byLengthValue.hasOwnProperty( `${num}` );
  }

  isSameSuit() {
    return Object.keys(this.bySuit).length===1;
  }
  
  hasNoPairsOf(num, pairs) {
    return ( this.byLengthValue.hasOwnProperty( `${pairs}` ) )
          ? this.byLengthValue[`${pairs}`].length === num 
          : false;  
  }

  isStraight(num){
    const sorted = [...new Set( 
      this.hand
        .map(elem => elem.weight)
          .sort( (a, b) => a - b ) 
      )];
    
    let flag = false;
    for (let i=0; i<=sorted.length-num; i++){
      if (sorted[num-1+i]-sorted[i] === num-1) flag = true;
    }                           
    return flag;
  }

  straightList(num){
    const sorted = [...new Set( 
      this.hand
        .map(elem => elem.weight)
          .sort( (a, b) => a - b ) 
      )];
    
    for (let i=0; i<=sorted.length-num; i++){
      if (sorted[num-1+i]-sorted[i] === num-1){
        const subList = sorted.slice(i, num+i);
        return subList
          .map(weightOfCard => this.hand
            .find(card => card.weight === weightOfCard));
      }
    }
    return [];
  }

  nHighCard(n){
    return this.hand.sort( (a, b) => b.weight - a.weight )[n-1];
  }

}


export { getDeck, suffle, dealCards, countSelected, normalizeCard, RateableCards,groupBy };