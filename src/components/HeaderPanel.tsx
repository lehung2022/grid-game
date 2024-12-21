import HeaderPanelStyles from "./css_modules/HeaderPanelStyles.module.css";

// Define types for props
interface HeaderPanelProps {
  children: React.ReactNode;
}

const HeaderPanel: React.FC<HeaderPanelProps> = ({ children }) => {
  return <div className={HeaderPanelStyles.headerPanel}>{children}</div>;
};

export default HeaderPanel;
