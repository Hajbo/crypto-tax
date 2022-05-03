import { TEXT_COLOR, YELLOW } from "../utils/constants";

const links = [
  {
    text: "Hogyan működik",
    href: "#how-it-works",
  },
  {
    text: "Kriptóadózás",
    href: "#crypto-taxation",
  },
  {
    text: "Kik vagyunk",
    href: "#who-we-are",
  },
];

const NavbarStyle = {
  color: TEXT_COLOR,
  backgroundColor: YELLOW,
  borderBottom: `3px solid ${TEXT_COLOR}`,

  height: "66px",

  display: "flex",
  alignItems: "center",
};

const NavbarLeftContainerStyle = {
  width: "40%",
  display: "flex",
  justifyContent: "center",
};

const NavbarRightContainerStyle = {
  width: "60%",
  display: "flex",
  gap: "100px",
  justifyContent: "flex-start",
};

const NavbarLinkStyle = {
  textDecoration: "none",
  backgroundColor: "transparent !important",

  color: TEXT_COLOR,
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "20px",

  textTransform: "uppercase" as const,
};

const BoldNavbarLinkStyle = {
  ...NavbarLinkStyle,
  fontWeight: 900,
  fontSize: "20px",
  lineHeight: "24px",
};

const Navbar = () => {
  return (
    <div style={NavbarStyle}>
      <div style={NavbarLeftContainerStyle}>
        <a style={BoldNavbarLinkStyle} href="#">
          KRIPTOBEVALLAS.HU
        </a>
      </div>
      <div style={NavbarRightContainerStyle}>
        {links.map((link) => (
          <a style={NavbarLinkStyle} key={`nav-${link.href}`} href={link.href}>
            {link.text}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
