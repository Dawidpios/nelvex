import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

type DirectionType = "next" | "back";

const Arrow = (props: {
  direction: DirectionType;
  className?: string;
  style?: { display: string };
  onClick?: () => void;
}) => {
  const { className, style, onClick } = props;

  return (
    <>
      {props.direction === "next" ? (
        <MdArrowForwardIos
          style={{ ...style, color: 'black' }}
          className={className}
          onClick={onClick}
        />
      ) : (
        <MdArrowBackIos
          style={{ ...style, color: 'black' }}
          className={className}
          onClick={onClick}
        />
      )}
    </>
  );
};

export default Arrow;
