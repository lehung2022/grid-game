import GameWrapperStypes from "./css_modules/GameWrapperStyles.module.css";

// Define types for props
interface GameWrapperProps {
  gameState: boolean;
  children: React.ReactNode;
}

const GameWrapper: React.FC<GameWrapperProps> = ({ gameState, children }) => {
  return (
    <div className={GameWrapperStypes.GameWrapper}>
      {gameState && (
        <div className={GameWrapperStypes.gameOverMsg}>
          GAME
          <br />
          OVER{" "}
        </div>
      )}
      {children}
    </div>
  );
};

export default GameWrapper;
