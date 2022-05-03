import {
  PAGE_WIDTH,
  FOOTER_HEIGHT,
  YELLOW,
  TEXT_COLOR,
} from "../utils/constants";
import { FOOTER_TEXT } from "../utils/texts";

const footerStyle = {
  width: PAGE_WIDTH,
  height: FOOTER_HEIGHT,
  backgroundColor: YELLOW,

  display: "flex",
  flexFlow: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  paddingTop: "20px",

  gap: "20px",

  borderTop: `3px solid ${TEXT_COLOR}`,
};

const footerText = {
  color: TEXT_COLOR,
  fontFamily: "Montserrat",
  fontStyle: "italic",
  fontWeight: 300,
  fontSize: "12px",
  lineHeight: "15px",
  alignText: "center",
};

const boldFooterText = {
  color: TEXT_COLOR,
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 900,
  fontSize: "20px",
  lineHeight: "24px",
  textTransform: "uppercase" as const,
};

const Footer = () => {
  return (
    <div style={footerStyle}>
      <div style={boldFooterText}>KRIPTOBEVALLAS.HU</div>

      <div style={footerText}>© kriptobevallas.hu | 2022</div>

      <div style={{ ...footerText, width: "799px" }}>{FOOTER_TEXT}</div>
    </div>
  );
};

export default Footer;
