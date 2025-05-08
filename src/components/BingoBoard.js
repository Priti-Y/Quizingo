// BingoBoard.js
import React from 'react';
import BingoCell from './BingoCell';
import './BingoCell.css';  // Optional, for custom styling

function BingoBoard({ board, onCellPress }) {
    return (
      <div className="bingo-board">
        {board.flat().map((cell, index) => (
          <BingoCell
            key={index}
            value={cell.value}
            claimed={cell.claimed}
            onPress={() => {
              const rowIndex = Math.floor(index / 5);
              const colIndex = index % 5;
              onCellPress(rowIndex, colIndex);
            }}
          />
        ))}
      </div>
      
    );
  }
  
  export default BingoBoard;


