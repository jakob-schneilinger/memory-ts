import React, { useState } from 'react';
import './App.css';

export const Card: any = (textValue:any, cardFlipped:any, isMatchingPair:any) => {
  return (
    <>
      <p>{textValue}</p>
      <p>{cardFlipped}</p>
      <p>{isMatchingPair}</p>
    </>
  );
}