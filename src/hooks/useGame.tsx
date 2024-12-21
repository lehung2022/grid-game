import { useEffect, useState, useRef } from "react";
import generateBoard from "../business/boardGenerator";
import monitorMatches from "../business/monitorMatches";
import refillBoard from "../business/refillBoard";

type Board = any[]; // Define the board structure properly if possible
type Score = number;

const useGame = (): [
  Board,
  React.Dispatch<React.SetStateAction<Board>>,
  Score,
  React.Dispatch<React.SetStateAction<Score>>
] => {
  const [board, setBoard] = useState<Board>(() => {
    return JSON.parse(localStorage.getItem("board") || "[]") || generateBoard();
  });

  const [score, setScore] = useState<Score>(() => {
    return JSON.parse(localStorage.getItem("score") || "0") || 0;
  });

  const previousBoard = useRef<Board>(board);

  useEffect(() => {
    const timer = setInterval(() => {
      localStorage.setItem("board", JSON.stringify(board));
      localStorage.setItem("score", JSON.stringify(score));

      if (board.every((element) => element.color !== "")) {
        const [currentBoard, scoreAccumulator] = monitorMatches(
          board,
          previousBoard.current
        );
        setBoard(currentBoard);
        setScore((previousScore) => previousScore + scoreAccumulator);
      }

      setBoard((prev) => refillBoard(prev));
    }, 100);

    return () => clearInterval(timer);
  }, [board, score]);

  return [board, setBoard, score, setScore];
};

export default useGame;
