import {
  handleInterceptedElements,
  handleVerticalElements,
  handleHorizontalElements,
  handleLT2Elements,
  handleLT1Elements,
} from "./special-power/handleAdvancedElements";

import { columns, rows } from "./special-power/matches";

import addScore from "./scoreSystem";

// Define the shape of board elements
interface BoardElement {
  color: string;
  level: string;
  flag: string;
}

type Board = BoardElement[];

// Define the type for intercepted advanced elements (can adjust as needed)
interface InterceptedElement {
  color: string;
  level: string;
  flag: string;
  index: number;
}

const monitorMatches = (
  currentBoard: Board,
  previousBoard: Board
): [Board, number] => {
  let score = 0;
  let interceptedAdvancedElements: InterceptedElement[] = [];

  const board = JSON.parse(JSON.stringify(currentBoard));

  // Handle elements flagged as 'removed'
  board.forEach((element: BoardElement) => {
    if (element.flag === "removed") {
      element.color = "";
      score += addScore(element.level);
    }
  });

  if (score > 0) return [board, score];

  const [col5, col4, col3] = columns(board);
  const [row5, row4, row3] = rows(board);
  const indices = [...col5, ...col4, ...col3, ...row5, ...row4, ...row3];

  const LTShape = col3.filter((element) => row3.includes(element));
  const lv2HorizontalElements = indices.filter(
    (element) => board[element].level === "lv2_h"
  );
  const lv2VerticalElements = indices.filter(
    (element) => board[element].level === "lv2_v"
  );
  const LTShapedElementsLv2 = indices.filter(
    (element) => board[element].level === "LT2"
  );

  const LTShapedElementsLv1 = board.reduce(
    (accumulator: number[], current: BoardElement, index: number) => {
      if (current.level === "LT1") accumulator.push(index);
      return accumulator;
    },
    [] as number[]
  );

  indices.forEach((element: number) => {
    board[element].flag = "removed";
  });

  // Process the LV2 vertical elements
  for (let i = 0; i < lv2VerticalElements.length; i++) {
    score += addScore(board[lv2VerticalElements[i]].level);
    interceptedAdvancedElements = interceptedAdvancedElements.concat(
      handleVerticalElements(
        board,
        lv2VerticalElements[i]
      ) as InterceptedElement[]
    );
  }

  // Process the LV2 horizontal elements
  for (let i = 0; i < lv2HorizontalElements.length; i++) {
    score += addScore(board[lv2HorizontalElements[i]].level);
    interceptedAdvancedElements = interceptedAdvancedElements.concat(
      handleHorizontalElements(
        board,
        lv2HorizontalElements[i]
      ) as InterceptedElement[]
    );
  }

  // Process the LT2 elements
  for (let i = 0; i < LTShapedElementsLv2.length; i++) {
    score += addScore(board[LTShapedElementsLv2[i]].level);
    interceptedAdvancedElements = interceptedAdvancedElements.concat(
      handleLT2Elements(
        board,
        LTShapedElementsLv2[i],
        currentBoard
      ) as InterceptedElement[]
    );
  }

  // Process the LT1 elements
  for (let i = 0; i < LTShapedElementsLv1.length; i++) {
    score += addScore(board[LTShapedElementsLv1[i]].level);
    interceptedAdvancedElements = interceptedAdvancedElements.concat(
      handleLT1Elements(board, LTShapedElementsLv1[i]) as InterceptedElement[]
    );
  }

  // Handle intercepted elements
  handleInterceptedElements(interceptedAdvancedElements, board, currentBoard);

  let row4Counter = -1;

  // Adjust row4 elements based on color changes
  for (let i = 0; i < row4.length; i++) {
    row4Counter++;
    if (currentBoard[row4[i]].color !== previousBoard[row4[i]].color) {
      board[row4[i]].color = currentBoard[row4[i]].color;
      board[row4[i]].level = "lv2_h";
      board[row4[i]].flag = "";
      i = i - row4Counter + 3;
      row4Counter = -1;
      score++;
    }
  }

  // Process the LV2 vertical elements by 4 columns
  for (let i = 0; i < col4.length; i += 4) {
    board[col4[i]].color = currentBoard[col4[i]].color;
    board[col4[i]].level = "lv2_v";
    board[col4[i]].flag = "";
    score++;
  }

  // Process row5 elements
  for (let i = 0; i < row5.length; i += 5) {
    board[row5[i + 2]].color = "white";
    board[row5[i + 2]].level = "lv3";
    board[row5[i + 2]].flag = "";
    score++;
  }

  // Process col5 elements
  for (let i = 0; i < col5.length; i += 5) {
    board[col5[i + 4]].color = "white";
    board[col5[i + 4]].level = "lv3";
    board[col5[i + 4]].flag = "";
    score++;
  }

  // Process LTShape elements
  for (let i = 0; i < LTShape.length; i++) {
    board[LTShape[i]].color = currentBoard[LTShape[i]].color;
    board[LTShape[i]].level = "LT2";
    board[LTShape[i]].flag = "";
    score++;
  }

  // Add score for elements with empty color
  board.forEach((element: BoardElement) => {
    if (element.color === "") score += addScore(element.level);
  });

  return [board, score];
};

export default monitorMatches;
