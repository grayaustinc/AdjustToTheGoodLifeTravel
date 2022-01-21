import React, { FunctionComponent, useState } from "react";
import prettyBytes from "pretty-bytes";

import type { ImageDataType } from "src/modals/image/validation";
import NextImageComponent from "src/components/next-image-component";

import debounce from "libs/helper/debounce-render";

const init: RequestInit = {
  method: "GET",
  mode: "no-cors",
  cache: "no-cache",
  headers: {
    Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
  },
};

interface RenderProps {
  data: ImageDataType;
  onClick?: () => void;
  showStats?: boolean;
}

const RenderComponent: FunctionComponent<RenderProps> = ({ data, onClick, showStats }) => {
  const [textColorClass, setTextColorClass] = useState("text-danger");
  const [size, setSize] = useState<string>("cannot calculate filesize");

  async function retrieveMetadata(src: string) {
    const response = await fetch(src, init);
    const buffer = await response.arrayBuffer();
    if (buffer.byteLength < 80 * 1024) setTextColorClass("text-success");
    else if (buffer.byteLength < 120 * 1024) setTextColorClass("text-warning");
    else setTextColorClass("text-danger");
    setSize(`Image Size - ${prettyBytes(buffer.byteLength)}`);
  }

  const isStatic = data.srcType === "STATIC";

  return (
    <div className="py-3">
      <NextImageComponent data={data} onClick={onClick} onLoad={(event) => retrieveMetadata(event.currentTarget.currentSrc)} />
      {showStats && isStatic && <div className={`${textColorClass} text-center`}>{size}</div>}
    </div>
  );
};

export default React.memo<RenderProps>(debounce(RenderComponent, 250) as any);
