import Image from "next/image";
import { TEXT_COLOR } from "../utils/constants";

const buttonStyle = {
  width: "fit-content",
  height: "35px",
  padding: "5px 20px",

  background: "#00EFD4",
  border: "2px solid #121212",
  boxSsizing: "border-box",
  borderRadius: "6px",

  color: TEXT_COLOR,
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "12px",
  lineHeight: "15px",

  textTransform: "uppercase" as const,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",

  alignSelf: "center",
};

type ButtonProps = {
  text: string;
  onClick: () => void;
  icon?: string;
};

const Button = (props: ButtonProps) => {
  const { text, onClick, icon } = props;
  return (
    <button style={buttonStyle} onClick={onClick}>
      {icon ? <Image src={icon} alt="pdf" width={12} height={12} /> : null}
      {text}
    </button>
  );
};

export default Button;
