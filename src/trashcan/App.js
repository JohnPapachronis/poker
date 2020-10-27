// import React, { useState } from 'react';
// import './App.css';
// import './cards.css';
// import Board from './components/board/Board.js';


// class App extends React.Component {
  
//   render(){
//     return (
//       <div className="App">
//         <header className="App-header">
//           <Board />
//         </header>
//       </div>
//     );
//   } 
// }

// export default App;


// class Card extends React.Component {
  
//   render() {
//     return this.props.visible
//     ? (
//       <div className="playingCards">
//             <a 
//               className={"card rank-"+this.props.rank.toLowerCase()+" "+this.props.suit} 
//               onClick={() => this.props.onClick()}
//               href='#'
//             >
//               <span className="rank">{this.props.rank}</span>
//               <span className="suit">&spades;</span> 
//             </a>
//       </div>
//     ) : (
//       <div className="playingCards"> 
//         <div className="card back" >*</div>
//       </div>
//     )
//   }
// }
// const Card = ({
//   rank,
//   suit,
//   visible,
//   selected,
//   onClick,
// }) => ( 
//   ( visible )
//   ? (
//       <div className="playingCards">
//             <a 
//               className={"card rank-"+rank.toLowerCase()+" "+suit} 
//               onClick={() => onClick()}
//               href='#'
//             >
//               <span className="rank">{rank}</span>
//               <span className="suit">&spades;</span> 
//             </a>
//       </div>
//   ) 
//   : (
//       <div className="playingCards"> 
//         <div className="card back" >*</div>
//       </div>
//   )
// )

// const Hand = ({
//   deck,
//   visible,
// }) => {
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     cards: [],
//   //     deck: this.props.deck,
//   //     visible: this.props.visible
//   //   };
//   // }

//   const [cards, setCards] = useState([]);
//   const [decki, setDeck] = useState(deck);
//   console.log(decki.length);

//   const swapCard = (i) => {
    
//     const tempDeck = decki;
//     const tempCards = cards;
//     const index = Math.floor(Math.random()*tempDeck.length); 
//     const temp = tempDeck[index];
    
//     tempDeck[index] = tempCards[i];
//     tempCards[i] = temp;
//     console.log (tempDeck[index]);
//     console.log(temp);
    
//     // this.setState({
//     //   deck: deck,
//     //   cards: cards,
//     // });

//     setCards(cards);
//     setDeck(tempDeck);
    
//   }

//   const renderCard = (i) => {
//     const cardPicked = (cards[i] === undefined )
//       ? decki[Math.floor(Math.random()*decki.length)]
//       : cards[i] ;
//     //console.log(cardPicked);
//     cards[i]=cardPicked;
//     deck = decki.filter(card => card !== cardPicked );
//     return (
//       <Card rank={cardPicked.rank} 
//             suit={cardPicked.suit} 
//             visible={visible} 
//             selected={false} 
//             onClick={() => swapCard(i)}
//       />
//     );
//   }

  
//   return (
//     <div className="playingCards">
//       <ul className="table">
//         <li>{renderCard(0)}</li>
//         <li>{renderCard(1)}</li>
//         <li>{renderCard(2)}</li>
//         <li>{renderCard(3)}</li>
//         <li>{renderCard(4)}</li>
//       </ul>
//     </div>
//   );
  

// }