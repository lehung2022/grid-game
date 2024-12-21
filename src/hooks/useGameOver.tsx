import { useEffect, useState } from "react";
import monitorBoard from "../business/monitorBoard";

type BoardElement = { color: string; flag?: string }; // Define the structure of each element in the board
type Board = BoardElement[]; // Assuming `board` is an array of `BoardElement`

type SpecialPowerState = {
  rook: { disabled: boolean };
  bishop: { disabled: boolean };
  knight: { disabled: boolean };
  queen: { disabled: boolean };
};

const useGameOver = (
  board: Board,
  state: SpecialPowerState
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    if (
      !gameOver &&
      board.every(
        (element) => element.color !== "" && element.flag !== "removed"
      ) &&
      state.rook.disabled &&
      state.bishop.disabled &&
      state.knight.disabled &&
      state.queen.disabled &&
      !monitorBoard(board)
    ) {
      setGameOver((gameOver) => !gameOver);
    }
  }, [
    board,
    gameOver,
    state.rook.disabled,
    state.bishop.disabled,
    state.knight.disabled,
    state.queen.disabled,
  ]);

  return [gameOver, setGameOver];
};

export default useGameOver;
