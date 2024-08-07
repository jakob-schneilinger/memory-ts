import React, { useState } from 'react';
import './App.css';
import {Card} from './Card';

function App() {
  return (
    <Grid />
  );
}

const numberOfCards = 20;
// list of unicodes for animal-emojies
const emojis = [
  '\u{1F436}', // dog 
  '\u{1F63A}', // cat
  '\u{1F42E}', // cow
  '\u{1F40D}', // snake
  '\u{1F435}', // monkey
  '\u{1F98A}', // fox
  '\u{1F99D}', // racoon
  '\u{1F984}', // unicorn
  '\u{1F42D}', // mouse
  '\u{1F427}', // penguin
];
emojis.sort(() => Math.random() - 0.5); // shuffel emojies

const currentEmojies = [
    ...emojis.slice(0,numberOfCards/2), 
    ...emojis.slice(0,numberOfCards/2),
]
currentEmojies.sort(() => Math.random() - 0.5); // shuffel emojies

let prevCard = [null, null];
const Grid: React.FC = () => {
  const [cardStates, setCardStates] = useState(new Array(numberOfCards).fill(false));
  const [inTimeout, setInTimeout] = useState(false);
  
  // checks for matching pair
  const isMatchingPair = (cardIndex:any, cardValue:any) => {
    if (!inTimeout) {
      setCardStates(cardStates.map((cardState, i) => {
        return (i === cardIndex)? true : cardState;
      }));

      if (prevCard[0] === null) {
        prevCard = [cardIndex, cardValue];
        return;
      }
      if (prevCard[1] !== cardValue) {
        const prevCardIndex = prevCard[0];
        setInTimeout(true); // locks function so that every call is ignored
        // 1 sec timeout before cards get covered again
        setTimeout(() => {
          setCardStates(cardStates.map((cardState, i) => {
            return (i === cardIndex || i === prevCardIndex)? false : cardState;
          }));
          setInTimeout(false);
        }, 1000);
      }
      prevCard = [null, null];
    }
  }

  let cards = [];
  for (let i = 0; i < numberOfCards; i++) {
    cards.push(
      <Card
          key = {i}
          textValue = {currentEmojies[i]}
          cardFlipped = {cardStates[i]}
          isMatchingPair = {() => isMatchingPair(i, currentEmojies[i])}
      />
    );
  }

  return (
    <div className = {'widthGrid gridContainer'}>
      {cards}
    </div>
  );
}

export default App;
