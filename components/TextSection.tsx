import { TEXT_COLOR, TEXT_SECTION_WIDTH, YELLOW } from "../utils/constants";

type TextSectionProps = {
  header: string;
  content: string;
  id: string;
};

const TextSectionContainerStyle = {
  width: TEXT_SECTION_WIDTH,

  display: "flex",
  flexFlow: "column",
  justifyContent: "flex-start",

  gap: "30px",
};

const TextSectionHeaderStyle = {
  width: "100%",

  color: YELLOW,
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 900,
  fontSize: "40px",
  lineHeight: "49px",

  textTransform: "uppercase" as const,
};

const TectSectionContentStyle = {
  width: "100%",
  paddingLeft: "80px",

  color: TEXT_COLOR,
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "26px",

};

const TextSection = (props: TextSectionProps) => {
  return (
    <div style={TextSectionContainerStyle} id={props.id}>
      <span style={TextSectionHeaderStyle}>{props.header}</span>
      <div
        style={TectSectionContentStyle}
        dangerouslySetInnerHTML={{ __html: props.content }}
        className="custom-links"
      />
    </div>
  );
};

export default TextSection;
