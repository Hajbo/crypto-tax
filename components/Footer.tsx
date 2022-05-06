import {
  PAGE_WIDTH,
  FOOTER_HEIGHT,
  YELLOW,
  TEXT_COLOR,
} from "../utils/constants";
import { FOOTER_TEXT } from "../utils/texts";

const footerStyle = {
  width: PAGE_WIDTH,
  minWidth: "1500px",
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
    <div className="not-printed" style={footerStyle} id="footer">
      <div style={boldFooterText}>KRIPTOBEVALLAS.HU</div>

      <div style={footerText}>© kriptobevallas.hu | 2022</div>

      <div style={{ ...footerText, width: "799px" }}>{FOOTER_TEXT}</div>
    </div>
  );
};

export default Footer;
