const greenDots = "/textSectionGreenDots.svg";
const redDots = "/textSectionRedDots.svg";

const TextSectionContainerStyle = {
  padding: "30px 0px",

  display: "flex",
  flexFlow: "column",
  alignItems: "center",
  gap: "50px",

  backgroundImage: `url(${redDots}), url(${greenDots})`,
  backgroundPosition: "left bottom, right top",
  backgroundRepeat: "no-repeat",
  backgroundSize: "210px 210px, 210px 210px",
};

const TextSectionContainer = (props: any) => {
  return (
    <div style={TextSectionContainerStyle} id="text-section-container" className="not-printed">
      {props.children}
    </div>
  );
};

export default TextSectionContainer;
