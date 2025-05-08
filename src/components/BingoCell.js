// BingoCell.js
import React from 'react';
import './BingoCell.css';  // Optional, for custom styling

function BingoCell({ value, claimed, onPress }) {
    return (
      <div className={`bingo-cell ${claimed ? 'claimed' : ''}`} onClick={onPress}>
        {value}
      </div>
    );
  }
  export default BingoCell;


