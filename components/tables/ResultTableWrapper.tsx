import { separatedNumber } from "../../utils/formatting";

const getResultTableWrapperStyles = (width?: string) => {
  return {
    border: "2px solid #121212",
    boxSizing: "border-box" as const,
    borderRadius: "6px",

    width: width,
  };
};

const commonFontStyle = {
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "20px",

  textTransform: "uppercase" as const,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  color: "#121212",
};

const resultTableWrapperHeaderStyles = {
  height: "50px",

  background: "#FFD700",
  borderRadius: "6px 6px 0px 0px",
  borderBottom: "3px solid #121212",

  ...commonFontStyle,
};

const resultTableWrapperChildrenStyles = {
  display: "flex",
  flexFlow: "row",
  justifyContent: "space-evenly",
};

const bottomTextStyle = {
  ...commonFontStyle,

  color: "#FFFFFF",
  background: "#FD3E63",
  width: "230px",
  height: "33px",
};

const bottomTextWrapperStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
};

export const ResultTableWrapper = (props: any) => {
  const { customChildrenCss = {}, bottomText, width, header } = props;

  return (
    <div
      style={{ ...getResultTableWrapperStyles(width), ...customChildrenCss }}
    >
      <div style={resultTableWrapperHeaderStyles}>{header}</div>
      <div style={resultTableWrapperChildrenStyles}>{props.children}</div>
      {bottomText && (
        <div style={bottomTextWrapperStyle}>
          <div style={bottomTextStyle}>{bottomText}</div>
        </div>
      )}
    </div>
  );
};

const getResultTableValueWrapperStyles = (
  bigFont?: boolean,
  width?: string
) => {
  return {
    width: width,

    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "center",

    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: bigFont ? 700 : 400,
    fontSize: bigFont ? "16px" : "12px",
    lineHeight: bigFont ? "20px" : "15px",

    textTransform: "uppercase" as const,

    color: "#121212",

    margin: "20px",
  };
};

const hrStyle = {
  borderTop: "2px solid #121212",
  width: "100%",
  marginTop: "10px",
  marginBottom: "10px",
};
export const ResultTableValueWrapper = (props: any) => {
  return (
    <div style={getResultTableValueWrapperStyles(props.bigFont, props.width)}>
      <span>{props.header}</span>
      <hr style={hrStyle} />
      <span>{`${separatedNumber(props.value)} HUF`}</span>
    </div>
  );
};
