import styles from  './Button.module.scss'

type Button = {
  text:string,
  onClick: () => void,
  className?: string
}

const Button = ({text, onClick, className} : Button) => {
  return ( <button className={`${styles.button} ${className && styles[className]}`} onClick={onClick}>{text}</button> );
}
 
export default Button;