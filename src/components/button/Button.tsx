import styles from "./Button.module.scss";

type Button = {
  text?: string;
  onClick?: (event: any) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
};

const Button = ({
  children,
  text,
  onClick,
  className,
  type,
  disabled,
  isLoading,
}: Button) => {
  return (
    <button
      type={type && `${type}`}
      className={`${styles.button} ${className && styles[className]}`}
      onClick={onClick && onClick}
      disabled={disabled}
      style={{ opacity: isLoading ? "0.4" : "1" }}
    >
      {children && children}
      {text}
    </button>
  );
};

export default Button;
