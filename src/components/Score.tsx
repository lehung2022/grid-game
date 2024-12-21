import ScoreStyles from "./css_modules/ScoreStyles.module.css";

// Declare the expected prop types
interface ScoreProps {
  score: number;
}

const Score = ({ score }: ScoreProps) => {
  return (
    <div className={ScoreStyles.scoreContainer}>
      <div>SCORE</div>
      <div className={ScoreStyles.score}>{score}</div>
    </div>
  );
};

export default Score;
