import { utilizeRook } from "./utilizeRook";
import { utilizeBishop } from "./utilizeBishop";

interface BoardElement {
  color: string;
  level: string;
  flag: string;
}

export const utilizeQueen = (selectedItem: number, currentBoard: BoardElement[]): BoardElement[] => {
  let board = JSON.parse(JSON.stringify(currentBoard)) as BoardElement[];

  board = utilizeRook(selectedItem, board);
  board = utilizeBishop(selectedItem, board);

  return board;
};
