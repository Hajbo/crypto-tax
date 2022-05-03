import { Tooltip2 } from "@blueprintjs/popover2";
import Image from "next/image";

const infoImage = "/info.svg";

const TableTooltip = (props: any) => {
  const content = (
    <div style={{ height: "auto", width: "250px", maxWidth: "250px" }}>
      {props.text}
    </div>
  );
  return (
    <Tooltip2 content={content} placement="top">
      <div>
        <Image src={infoImage} alt="info" width={10} height={10} />
      </div>
    </Tooltip2>
  );
};

export default TableTooltip;
