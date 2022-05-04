import Image from "next/image";
import { TEXT_COLOR, YELLOW } from "../utils/constants";
import { HEADER_TEXT } from "../utils/texts";

const headerImage = "/headerImage.svg";
const greenDots = "/headerGreenDots.svg";
const redDots = "/headerRedDots.svg";

const headerStyle = {
  width: "100%",

  backgroundImage: `url(${greenDots}), url(${redDots})`,
  backgroundPosition: "left bottom, right top",
  backgroundRepeat: "no-repeat",
  backgroundSize: "310px 310px, 210px 210px",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  paddingTop: "30px",
  paddingBottom: "30px",
  gap: "50px",
  marginBottom: "50px",
};

const headerTextContainerStyle = {
  width: "666px",
  display: "flex",
  flexFlow: "column",
  textAlign: "right" as const,

  justifyContent: "center",
  alignItems: "flex-end",

  gap: "20px",
};

const headerBoldTextStyle = {
  height: "300px",
  width: "690px",

  color: YELLOW,
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 900,
  fontSize: "120px",
  lineHeight: "100px",

  textAlign: "right" as const,
  textTransform: "uppercase" as const,
};

const headerTextStyle = {
  width: "500px",
  height: "100px",

  color: TEXT_COLOR,
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "26px",

  textAlign: "right" as const,
};

const betaStyles = {
  top: "-75px",
  position: "relative" as const,

  color: "black",
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 900,
  fontSize: "12px",
  lineHeight: "15px",
}

const Header = () => {
  return (
    <div style={headerStyle} id="crypto-tax-header">
      <div style={headerTextContainerStyle}>
        <div style={headerBoldTextStyle}>
          <span style={betaStyles}>BETA</span>KRIPTO
          <br />
          BEVALLAS
          <br />
          <div style={{color: "black"}}>.HU</div>
        </div>
        <div style={headerTextStyle}>{HEADER_TEXT}</div>
      </div>
      <Image src={headerImage} alt="Header Image" width={380} height={461} />
    </div>
  );
};

export default Header;
