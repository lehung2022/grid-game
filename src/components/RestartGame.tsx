import RestartGameStyles from "./css_modules/RestartGameStyles.module.css";
import generateBoard from "../business/boardGenerator";
import { Action } from "../business/special-power/jokerState";

// Define types for props
interface RestartGameProps {
  resetBoard: (board: ReturnType<typeof generateBoard>) => void;
  resetScore: (score: number) => void;
  resetJokers: (action: Action) => void;
  resetGameOver: (gameOver: boolean) => void;
}

const RestartGame: React.FC<RestartGameProps> = ({
  resetBoard,
  resetScore,
  resetJokers,
  resetGameOver,
}) => {
  const newGame = () => {
    resetBoard(generateBoard());
    resetScore(0);
    resetJokers({ type: "RESET" });
    resetGameOver(false);
  };

  return (
    <div className={RestartGameStyles.restartGameWrapper}>
      <button className={RestartGameStyles.restartGame} onClick={newGame}>
        NEW GAME
      </button>
    </div>
  );
};

export default RestartGame;
