
import './App.css';
import { useState } from 'react';
import { Board } from './component/Board';
import { Scoreboard } from './component/Scoreboard';
import { Reset } from './component/Reset';
const App = () => {
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

  ];
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlayer, setXplayer] = useState(true);
  const [score, setScore] = useState({ xScore: 0, oScore: 0 });
  const [gameOver ,setGameOver] =useState(false);
  const [checkHit ,setHit] = useState(0);
  const [noWin ,setNoWin] =useState('');

  const handleBoxClick = (boxIdx) => {
    setHit(checkHit + 1 );
    const updatedBoard = board.map((value, index) => {
     
      if (index === boxIdx) {
        return xPlayer === true ? 'X' : 'O';
      }
      else {
        return value;
      }
    });
    const winner = checkWinner(updatedBoard);
    if (winner) {
      if (winner === 'X') {console.log('x--');
        let { xScore } = score;
        xScore += 1;
       setScore ({...score, xScore});
       setNoWin('X Player Win');
      }
      else if(winner === 'O'){console.log('o--');
        let { oScore } = score;
        oScore += 1;
        setScore({...score,oScore});
        setNoWin('O Player Win');
      }
     
    }
    else
    {
      console.log(checkHit);
      if(checkHit === 8 )
      {        
        setNoWin('No Player Win... Restart Again');
        
      }
    }
    setBoard(updatedBoard);
    setXplayer(!xPlayer);
  }

  const checkWinner = (board) => {
    
   
    for (let i = 0; i < winCondition.length; i++) {
      const [x, y, z] = winCondition[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
      
    }
  }

  const resetBoard = () =>{
    setGameOver(false);
    setHit(0);
    setBoard(Array(9).fill(null));
    setNoWin('');
  }
  return (
    <>
    <p className='heading'>TIC TAC TOE</p>
    <div className='main'>
    <Scoreboard score={score} xPlayer={xPlayer} />
    <div className={` ${noWin != ''  ? 'nowin':''} `  } >{noWin}</div>
    <Board board={board} onClick={gameOver ? resetBoard: handleBoxClick} />
    <Reset resetBoard={resetBoard}/>
    </div>
    </>
  );
}

export default App;