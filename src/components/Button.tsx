import ButtonStyles from "./css_modules/ButtonStyles.module.css";

// Define the types for the props
interface ButtonProps {
  disabled: boolean;
  status: string;
  joker: {
    on: string;
    off: string;
  };
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  status,
  joker,
  onClick,
}) => {
  return (
    <button
      className={ButtonStyles.btn}
      disabled={disabled}
      onClick={onClick} // onClick is a default event handler
    >
      {status === "selected" ? (
        <img src={joker.on} alt="Joker" />
      ) : (
        <img src={joker.off} alt="Joker" />
      )}
    </button>
  );
};

export default Button;
