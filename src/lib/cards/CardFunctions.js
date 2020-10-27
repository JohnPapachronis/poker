function suffle(deck){
  return deck.sort(() => 50-Math.random()*100);
}

function getDeck(){
  const suits = ["spades", "diams", "clubs", "hearts"];
  const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
	const deck = [];

	for(var i = 0; i < suits.length; i++)
	{
		for(var j = 0; j < ranks.length; j++)
		{
			var card = {rank: ranks[j], suit: suits[i], isSelected:false};
			deck.push(card);
		}
	}
	return deck;
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
    this.hand = hand;
    this.byRank = groupBy( this.hand,'rank' );
    this.byLengthRank = groupBy( Object.values(this.byRank), 'length' );
    this.bySuit = groupBy(this.hand,'suit');
  }

  handValue(){
    return Object
      .entries( this.byLengthRank )
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
    return this.byLengthRank.hasOwnProperty( `${num}` );
  }

  isSameSuit() {
    return Object.keys(this.bySuit).length===1;
  }
  
  hasNoPairsOf(num, pairs) {
    return ( this.byLengthRank.hasOwnProperty( `${pairs}` ) )
          ? this.byLengthRank[`${pairs}`].length === num 
          : false;  
  }

  isStraight(num){
    const sorted = [...new Set (this.hand
                                .map(elem => elem.weight)
                                .sort( (a, b) => a - b ) 
                                )];
    return sorted[num-1]-sorted[0] == num-1;
  }

  nHighCard(n){
    return this.hand.sort( (a, b) => b.weight - a.weight )[n-1];
  }

}


export { getDeck, suffle, dealCards, countSelected, normalizeCard, RateableCards };