import { PAGE_WIDTH } from "../utils/constants";

const bodyStyle = {
  width: PAGE_WIDTH,
  padding: "50px",
};

const Body = (props: any) => {
  return <div style={bodyStyle}>{props.children}</div>;
};

export default Body;
