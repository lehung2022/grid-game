import ElementStyles from "./css_modules/ElementStyles.module.css";

interface ElementProps {
  target: {
    color: string;
    level: string;
    flag: string;
  };
  index: number;
  handleElementState: (index: number) => void;
}

const Element: React.FC<ElementProps> = ({
  target,
  index,
  handleElementState,
}) => {
  return (
    <div
      className={`${ElementStyles.element} ${ElementStyles[target.color]}`}
      data-level={target.level} // Use data-level to store level
      data-flag={target.flag} // Use data-flag to store flag
      id={index.toString()} // Cast index to string for id
      onClick={() => handleElementState(index)}
    ></div>
  );
};

export default Element;
