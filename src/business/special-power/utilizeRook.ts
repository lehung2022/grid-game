import { verticalRanges, horizontalRanges } from "./ranges";
import { handleInterceptedElements } from "./handleAdvancedElements";

interface BoardElement {
  color: string;
  level: string;
  flag: string;
}

export const utilizeRook = (
  selectedItem: number,
  currentBoard: BoardElement[]
): BoardElement[] => {
  const board = JSON.parse(JSON.stringify(currentBoard)) as BoardElement[];

  let interceptedAdvancedElements: { index: number; level: string }[] = [];

  // Handle horizontal range
  for (let i = 0; i < horizontalRanges.length; i++) {
    if (horizontalRanges[i].includes(selectedItem)) {
      horizontalRanges[i].forEach((element) => {
        board[element].flag = "removed";
        if (board[element].level !== "lv1" && board[element].level !== "") {
          interceptedAdvancedElements.push({
            index: element,
            level: board[element].level,
          });
        }
      });
      break;
    }
  }

  // Handle vertical range
  for (let i = 0; i < verticalRanges.length; i++) {
    if (verticalRanges[i].includes(selectedItem)) {
      verticalRanges[i].forEach((element) => {
        board[element].flag = "removed";
        if (board[element].level !== "lv1" && board[element].level !== "") {
          interceptedAdvancedElements.push({
            index: element,
            level: board[element].level,
          });
        }
      });
      break;
    }
  }

  handleInterceptedElements(interceptedAdvancedElements, board, currentBoard);

  return board;
};
