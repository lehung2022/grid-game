import { verticalRanges, horizontalRanges } from "./ranges";

// Define types for board elements
interface BoardElement {
  level: string;
  flag: string;
  color?: string; // Optional property, used for "LT2" elements
}

// Define types for intercepted elements
interface InterceptedElement {
  index: number;
  level: string;
}

type Board = BoardElement[]; // Board is an array of BoardElement

export const handleVerticalElements = (
  board: Board,
  index: number
): InterceptedElement[] => {
  let intercepted: InterceptedElement[] = [];

  for (let j = 0; j < verticalRanges.length; j++) {
    if (verticalRanges[j].includes(index)) {
      verticalRanges[j].forEach((element) => {
        if (
          board[element].level !== "lv1" &&
          board[element].level !== "" &&
          board[element].level !== "LT1"
        ) {
          intercepted.push({ index: element, level: board[element].level });
        }
        board[element].level = "";
        board[element].flag = "removed";
      });
    }
  }
  return intercepted;
};

export const handleHorizontalElements = (
  board: Board,
  index: number
): InterceptedElement[] => {
  let intercepted: InterceptedElement[] = [];

  for (let j = 0; j < horizontalRanges.length; j++) {
    if (horizontalRanges[j].includes(index)) {
      horizontalRanges[j].forEach((element) => {
        if (
          board[element].level !== "lv1" &&
          board[element].level !== "" &&
          board[element].level !== "LT1"
        ) {
          intercepted.push({ index: element, level: board[element].level });
        }
        board[element].level = "";
        board[element].flag = "removed";
      });
    }
  }
  return intercepted;
};

export const handleLT2Elements = (
  board: Board,
  index: number,
  currentBoard: Board
): InterceptedElement[] => {
  let intercepted: InterceptedElement[] = [];
  let atVerticalRange = 0;

  for (let j = 0; j < verticalRanges.length; j++) {
    if (verticalRanges[j].includes(index)) atVerticalRange = j;
  }

  let affectedArea: number[] = [index - 8, index + 8];

  if (atVerticalRange - 1 >= 0) {
    affectedArea.push(index - 1, index + 8 - 1, index - 8 - 1);
  }

  if (atVerticalRange + 1 < 8) {
    affectedArea.push(index + 1, index + 8 + 1, index - 8 + 1);
  }

  affectedArea = affectedArea.filter((value) => value >= 0 && value < 64);

  board[index].color = currentBoard[index].color;
  board[index].level = "LT1";
  board[index].flag = "";

  affectedArea.forEach((element) => {
    if (board[element].level === "LT2") board[element].level = "LT1";
    else if (board[element].level !== "LT1") board[element].flag = "removed";

    if (
      board[element].level !== "lv1" &&
      board[element].level !== "" &&
      board[element].level !== "LT1"
    ) {
      intercepted.push({ index: element, level: board[element].level });
    }
  });
  return intercepted;
};

export const handleLT1Elements = (
  board: Board,
  index: number
): InterceptedElement[] => {
  let intercepted: InterceptedElement[] = [];
  let atVerticalRange = 0;

  for (let j = 0; j < verticalRanges.length; j++) {
    if (verticalRanges[j].includes(index)) atVerticalRange = j;
  }

  let affectedArea: number[] = [index, index - 8, index + 8];

  if (atVerticalRange - 1 >= 0) {
    affectedArea.push(index - 1, index + 8 - 1, index - 8 - 1);
  }

  if (atVerticalRange + 1 < 8) {
    affectedArea.push(index + 1, index + 8 + 1, index - 8 + 1);
  }

  affectedArea = affectedArea.filter((value) => value >= 0 && value < 64);

  affectedArea.forEach((element) => {
    if (board[element].level !== "lv1" && board[element].level !== "") {
      intercepted.push({ index: element, level: board[element].level });
    }

    board[element].flag = "removed";
    board[element].level = "";
  });
  return intercepted;
};

export const handleInterceptedElements = (
  interceptedElements: InterceptedElement[],
  board: Board,
  currentBoard: Board
): void => {
  while (interceptedElements.length > 0) {
    let length = interceptedElements.length;
    let intercepted: InterceptedElement[] = [];

    for (let i = 0; i < length; i++) {
      switch (interceptedElements[i].level) {
        case "lv2_v":
          intercepted = intercepted.concat(
            handleVerticalElements(board, interceptedElements[i].index)
          );
          break;

        case "lv2_h":
          intercepted = intercepted.concat(
            handleHorizontalElements(board, interceptedElements[i].index)
          );
          break;

        case "LT2":
          intercepted = intercepted.concat(
            handleLT2Elements(board, interceptedElements[i].index, currentBoard)
          );
          break;

        case "LT1":
          intercepted = intercepted.concat(
            handleLT1Elements(board, interceptedElements[i].index)
          );
          break;

        default:
          continue;
      }
    }
    interceptedElements.splice(0, length);
    interceptedElements = interceptedElements.concat(intercepted);
  }
};
