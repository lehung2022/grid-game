import colorGenerator from "./colorGenerator";

interface BoardElement {
  color: string;
  level: string;
  flag?: string;
}

const refillBoard = (arr: BoardElement[]): BoardElement[] => {
  let board = JSON.parse(JSON.stringify(arr));

  for (let i = 0; i < 56; i++) {
    if (board[i].color === "" && i < 8) board[i] = colorGenerator();

    if (board[i].color !== "" && board[i + 8].color === "") {
      board[i + 8].color = board[i].color;
      board[i + 8].level = board[i].level;
      board[i + 8].flag = board[i].flag;
      board[i] = { color: "", level: "", flag: "" };
    }
  }

  return board;
};

export default refillBoard;
