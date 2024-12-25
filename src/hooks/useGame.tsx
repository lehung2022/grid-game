import { useEffect, useState, useRef } from "react";
import generateBoard from "../business/boardGenerator";
import monitorMatches from "../business/monitorMatches";
import refillBoard from "../business/refillBoard";

type Board = any[]; // Keeping your structure as it is
type Score = number;

const useGame = (): [
  Board,
  React.Dispatch<React.SetStateAction<Board>>,
  Score,
  React.Dispatch<React.SetStateAction<Score>>
] => {
  const [board, setBoard] = useState<Board>(() => {
    const savedBoard = localStorage.getItem("board");
    return savedBoard ? JSON.parse(savedBoard) : generateBoard();
  });

  const [score, setScore] = useState<Score>(() => {
    const savedScore = localStorage.getItem("score");
    return savedScore ? JSON.parse(savedScore) : 0;
  });

  const previousBoard = useRef<Board>(board);

  useEffect(() => {
    const timer = setInterval(() => {
      // Save state to localStorage
      localStorage.setItem("board", JSON.stringify(board));
      localStorage.setItem("score", JSON.stringify(score));

      // Avoid processing if the board is empty or invalid
      if (!board.length || board.some((row) => row.color === undefined)) return;

      // Check for matches
      const [currentBoard, scoreAccumulator] = monitorMatches(
        board,
        previousBoard.current
      );

      // Update the board and score only if there are changes
      if (currentBoard !== board) {
        setBoard(currentBoard);
        setScore((previousScore) => previousScore + scoreAccumulator);
      }

      // Refill the board
      const newBoard = refillBoard(currentBoard);
      if (newBoard !== board) {
        setBoard(newBoard);
      }

      // Update the previousBoard ref
      previousBoard.current = newBoard;
    }, 100);

    return () => clearInterval(timer);
  }, [board, score]);

  return [board, setBoard, score, setScore];
};

export default useGame;
