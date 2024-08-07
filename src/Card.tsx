import React from 'react';
import './App.css';

interface CardProps {
  textValue: string; 
  cardFlipped: boolean; 
  isMatchingPair: () => void;
}
  
 export function Card({ textValue, cardFlipped, isMatchingPair }: CardProps) {
  const changeSide = () => {
    if (!cardFlipped) {
      isMatchingPair();
    }
  };
  
  return (
    <div
      id={`${cardFlipped ? 'backSide' : 'frontSide'}`}
      className="gridItem"
      onClick={changeSide}
    >
      <div id="text">{textValue}</div>
    </div>
  );
}