import { verticalRanges } from "./special-power/ranges";

// Define the types to avoid the implicit 'any' errors
const invalidIndices: number[] = [
  6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
];

// Define the type for the board elements
interface BoardElement {
  level: string;
  color: string;
  flag?: string;
}

const isValidMove = (
  firstElement: number,
  secondElement: number,
  initialBoard: BoardElement[]
): boolean => {
  const board = [...initialBoard]; // This creates a shallow copy of the initial board

  let atVerticalRange = -1;

  // Find the vertical range for the first element
  for (let i = 0; i < verticalRanges.length; i++) {
    if (verticalRanges[i].includes(firstElement)) {
      atVerticalRange = i;
      break;
    }
  }

  const rightElement = atVerticalRange + 1 < 8 ? firstElement + 1 : -1;
  const leftElement = atVerticalRange - 1 >= 0 ? firstElement - 1 : -1;

  const validMoves = [
    rightElement,
    leftElement,
    firstElement + 8,
    firstElement - 8,
  ].filter((value) => value >= 0 && value < 64);

  // Check if the second element is a valid move
  if (!validMoves.includes(secondElement)) return false;

  // If either of the levels is "lv3", the move is valid
  if (
    board[firstElement].level === "lv3" ||
    board[secondElement].level === "lv3"
  )
    return true;

  // Swap the elements on the board
  board[firstElement] = initialBoard[secondElement];
  board[secondElement] = initialBoard[firstElement];

  // Check for matching colors in rows
  for (let i = 0; i < 48; i++) {
    if (
      board[i].color === board[i + 8].color &&
      board[i].color === board[i + 8 * 2].color
    ) {
      return true;
    }
  }

  // Check for matching colors in columns
  for (let i = 0; i < 64; i++) {
    if (invalidIndices.includes(i)) continue;
    if (
      board[i].color === board[i + 1].color &&
      board[i].color === board[i + 2].color
    ) {
      return true;
    }
  }
  return false;
};

export default isValidMove;
