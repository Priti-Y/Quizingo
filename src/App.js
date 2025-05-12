
import './App.css';
import React, { useEffect, useState } from 'react';
import BingoBoard from './components/BingoBoard';
import fetchQuestions  from './components/QuestionModal';


function App() {
  // Define the Bingo board (5x5 grid)
  const initialBoard = [
    [{ value: '1', claimed: false }, { value: '2', claimed: false }, { value: '3', claimed: false }, { value: '4', claimed: false }, { value: '5', claimed: false }],
    [{ value: '6', claimed: false }, { value: '7', claimed: false }, { value: '8', claimed: false }, { value: '9', claimed: false }, { value: '10', claimed: false }],
    [{ value: '11', claimed: false }, { value: '12', claimed: false }, { value: '13', claimed: false }, { value: '14', claimed: false }, { value: '15', claimed: false }],
    [{ value: '16', claimed: false }, { value: '17', claimed: false }, { value: '18', claimed: false }, { value: '19', claimed: false }, { value: '20', claimed: false }],
    [{ value: '21', claimed: false }, { value: '22', claimed: false }, { value: '23', claimed: false }, { value: '24', claimed: false }, { value: '25', claimed: false }],
  ];

  const [board, setBoard] = useState(initialBoard);
  console.log(board);

  
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions(25)
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Failed to load questions", err));
  }, []);


  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [activeCell, setActiveCell] = useState(null); // Track which cell was clicked

  const checkBingo = (board) => {
    // Check rows
    for (let row = 0; row < 5; row++) {
      if (board[row].every(cell => cell.claimed)) return true;
    }
  
    // Check columns
    for (let col = 0; col < 5; col++) {
      let columnClaimed = true;
      for (let row = 0; row < 5; row++) {
        if (!board[row][col].claimed) {
          columnClaimed = false;
          break;
        }
      }
      if (columnClaimed) return true;
    }
  
    // Check diagonal top-left to bottom-right
    let diagonal1 = true;
    for (let i = 0; i < 5; i++) {
      if (!board[i][i].claimed) {
        diagonal1 = false;
        break;
      }
    }
    if (diagonal1) return true;
  
    // Check diagonal top-right to bottom-left
    let diagonal2 = true;
    for (let i = 0; i < 5; i++) {
      if (!board[i][4 - i].claimed) {
        diagonal2 = false;
        break;
      }
    }
    if (diagonal2) return true;
  
    return false;
  };
  
  const checkAnswer = () => {
    if (!activeCell || !currentQuestion) return;
  
    const isCorrect =
      userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();
  
    if (isCorrect) {
      const newBoard = [...board];
      newBoard[activeCell.row][activeCell.col].claimed = true;
      setBoard(newBoard);
    
      if (checkBingo(newBoard)) {
        alert("🎉 Bingo! You won!");
      }
    }
    else {
      alert("❌ Incorrect. Try again.");
    }
    setCurrentQuestion(null);
    setUserAnswer('');
    setActiveCell(null);
  };
  // Function to handle cell click (marking cells as claimed)
  const handleCellPress = (row, col) => {
    const index = row * 5 + col; // Flattened index to match question
    const question = questions[index];
  
    if (!board[row][col].claimed) {
      setCurrentQuestion(question);
      setActiveCell({ row, col });
      setUserAnswer('');
    }
  };
  return (
    <div className="App">
      <h1>Quizingo Game</h1>
      <p> 🎯 Click on a cell to mark it claimed. Get 5 in a row(horizontal/vertical) or diagonal to win!</p>
      <BingoBoard board={board} onCellPress={handleCellPress} />
      <div style={{ textAlign: 'center', marginTop: '40px' }}>

      {currentQuestion && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Question:</strong> {currentQuestion.question}</p>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer"
          />
          <button onClick={checkAnswer} style={{ marginLeft: '10px' }}>Submit</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;

