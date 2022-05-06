import { PAGE_WIDTH } from "../utils/constants";

const bodyStyle = {
  width: PAGE_WIDTH,
  minWidth: "1400px", // 1500px - 100px padding (2x50)
  padding: "50px",
  display: "flex",
  flexFlow: "column",
};

const Body = (props: any) => {
  return <div style={bodyStyle} className="print-body">{props.children}</div>;
};

export default Body;
