import { ReactElement } from "react";
import styles from "./Button.module.scss";
import { boolean } from "zod";

type Button = {
  text?: string;
  onClick?: (event: any) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  disabled?: boolean
};

const Button = ({ children, text, onClick, className, type, disabled }: Button) => {
  return (
    <button
      type={type && `${type}`}
      className={`${styles.button} ${className && styles[className]}`}
      onClick={onClick && onClick}
      disabled={disabled}
    >
      {children && children}
      {text}
    </button>
  );
};

export default Button;
