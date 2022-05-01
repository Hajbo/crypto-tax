import { TEXT_COLOR } from "../utils/constants";


const buttonStyle = {
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
};

type ButtonProps = {
    text: string;
    onClick: () => void;
}

const Button = (props: ButtonProps) => {
    return (
        <button style={buttonStyle} onClick={props.onClick}>{props.text}</button>
    )
}

export default Button;