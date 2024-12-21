// STYLES
import BoardStyles from "./css_modules/BoardStyles.module.css";

// import Action from jokerState.ts
import {Action} from "../business/special-power/jokerState"

// COMPONENTS
import Element from "./Element";

// CUSTOM HOOKS
import useElement from "../hooks/useElement";

// JOKER FUNCTIONS
import { utilizeRook } from "../business/special-power/utilizeRook";
import { utilizeBishop } from "../business/special-power/utilizeBishop";
import { utilizeKnight } from "../business/special-power/utilizeKnight";
import { utilizeQueen } from "../business/special-power/utilizeQueen";

// FUNCTIONS
import isValidMove from "../business/isValidMove";
import { handleInterceptedElements } from "../business/special-power/handleAdvancedElements";

interface ElementType {
  color: string;
  level: string;
  flag: string;
}

interface Joker {
  status: string;
}

interface BoardProps {
  board: ElementType[];
  setBoard: React.Dispatch<React.SetStateAction<ElementType[]>>;
  jokers: {
    rook: Joker;
    bishop: Joker;
    knight: Joker;
    queen: Joker;
  };
  dispatchJokerAction: React.Dispatch<Action>;  // <-- This change
  gameOver: boolean;
}

const Board: React.FC<BoardProps> = ({
  board,
  setBoard,
  jokers,
  dispatchJokerAction,
  gameOver,
}) => {
  const [firstElement, secondElement] = useElement();

  // Function to be executed as a click event for each element on the board, that was selected
  const handleElementState = (index: number): void => {
    // Improved: Create a deep copy of the current board state.
    let currentBoard = JSON.parse(JSON.stringify(board)); // Avoid mutating the original state directly

    // Elements can only be selected once the board is filled with elements (ensuring valid operations)
    if (currentBoard.every((element: ElementType) => element.color !== "")) {
      // Select first Element
      if (firstElement.current === null) {
        firstElement.current = index;

        // Utilize Jokers if active (Improved comment clarity)
        if (jokers.rook.status === "selected") {
          dispatchJokerAction({ type: "ROOK_UTILIZED" });
          setBoard(utilizeRook(firstElement.current, currentBoard));
          firstElement.current = null;
        } else if (jokers.bishop.status === "selected") {
          dispatchJokerAction({ type: "BISHOP_UTILIZED" });
          setBoard(utilizeBishop(firstElement.current, currentBoard));
          firstElement.current = null;
        } else if (jokers.knight.status === "selected") {
          dispatchJokerAction({ type: "KNIGHT_UTILIZED" });
          setBoard(utilizeKnight(firstElement.current, currentBoard));
          firstElement.current = null;
        } else if (jokers.queen.status === "selected") {
          dispatchJokerAction({ type: "QUEEN_UTILIZED" });
          setBoard(utilizeQueen(firstElement.current, currentBoard));
          firstElement.current = null;
        }
      }

      // Select second Element
      else if (firstElement.current !== null && secondElement.current === null)
        secondElement.current = index;

      // If both elements are selected, check if the move is valid (Improvement: validation)
      if (
        firstElement.current !== null &&
        secondElement.current !== null &&
        !isValidMove(firstElement.current, secondElement.current, board)
      ) {
        firstElement.current = null;
        secondElement.current = null;
      }

      // If both elements are selected and the move is valid (Improvement: swapping logic)
      if (firstElement.current !== null && secondElement.current !== null) {
        // Swap the elements on the currentBoard
        currentBoard[firstElement.current] = board[secondElement.current];
        currentBoard[secondElement.current] = board[firstElement.current];

        // If one of the elements is flagged as "lv3", perform subsequent operation (Improvement: lv3 element handling)
        if (
          (currentBoard[firstElement.current].level === "lv3" ||
            currentBoard[secondElement.current].level === "lv3") &&
          currentBoard[firstElement.current].level !==
            currentBoard[secondElement.current].level
        ) {
          let interceptedElements: { index: number; level: string }[] = [];

          // Store the lv3 element
          const lv3 =
            currentBoard[firstElement.current].level === "lv3"
              ? firstElement.current
              : secondElement.current;

          // Store the color of the element to be eliminated
          const eliminateColor =
            currentBoard[firstElement.current].level === "lv3"
              ? currentBoard[secondElement.current].color
              : currentBoard[firstElement.current].color;

          // Improved: Mark elements to be removed and store intercepted elements.
          currentBoard = currentBoard.map((element: ElementType, i: number) => {
            if (
              element.color === eliminateColor &&
              (element.level === "lv1" || element.level === "")
            ) {
              element.flag = "removed"; // Mark as "removed" for elimination
            } else if (element.color === eliminateColor) {
              interceptedElements.push({
                index: i,
                level: currentBoard[i].level,
              }); // Store advanced elements
            }
            return element;
          });

          // Trigger the interception of advanced elements captured by lv3 element
          handleInterceptedElements(interceptedElements, currentBoard, board);

          // Lastly, mark the lv3 element for removal
          currentBoard[lv3].flag = "removed";
        }

        // After successful operation, reset selections and update board state (Improved: clearing selections)
        firstElement.current = null;
        secondElement.current = null;
        setBoard(currentBoard); // Apply the updated board state
      }
    }
  };

  return (
    <>
      <div className={BoardStyles.board} data-gameover={JSON.stringify(gameOver)}>
        {/* Map over the board and render the elements */}
        {board.map((element: ElementType, index: number) => (
          <Element
            target={element}
            index={index}
            key={index}
            handleElementState={handleElementState}
            data-testid={`board-element-${index}`} 
          />
        ))}
      </div>
    </>
  );
};

export default Board;
