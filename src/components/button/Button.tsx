import styles from "./Button.module.scss";

type Button = {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button = ({ text, onClick, className, type }: Button) => {
  return (
    <button
      type={type && `${type}`}
      className={`${styles.button} ${className && styles[className]}`}
      onClick={onClick && onClick}
    >
      {text}
    </button>
  );
};

export default Button;
