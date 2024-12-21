import { verticalRanges } from "./ranges";
import { handleInterceptedElements } from "./handleAdvancedElements";

interface BoardElement {
  color: string;
  level: string;
  flag: string;
}

export const utilizeKnight = (
  selectedItem: number,
  currentBoard: BoardElement[]
): BoardElement[] => {
  const board = JSON.parse(JSON.stringify(currentBoard)) as BoardElement[];

  let interceptedAdvancedElements: { index: number; level: string }[] = [];

  let atVerticalRange = -1;

  let matches: number[] = [selectedItem];

  for (let i = 0; i < verticalRanges.length; i++) {
    if (verticalRanges[i].includes(selectedItem)) atVerticalRange = i;
  }

  if (verticalRanges[atVerticalRange + 1] !== undefined)
    matches.push(selectedItem - 15, selectedItem + 17);
  if (verticalRanges[atVerticalRange + 2] !== undefined)
    matches.push(selectedItem - 6, selectedItem + 10);
  if (verticalRanges[atVerticalRange - 1] !== undefined)
    matches.push(selectedItem + 15, selectedItem - 17);
  if (verticalRanges[atVerticalRange - 2] !== undefined)
    matches.push(selectedItem + 6, selectedItem - 10);

  matches = matches.filter((value) => value >= 0 && value < 64);

  matches.forEach((element) => {
    board[element].flag = "removed";
    if (board[element].level !== "lv1" && board[element].level !== "") {
      interceptedAdvancedElements.push({
        index: element,
        level: board[element].level,
      });
    }
  });

  handleInterceptedElements(interceptedAdvancedElements, board, currentBoard);

  return board;
};
