import React, { FunctionComponent } from "react";

import { RendererProps } from "src/components/draft-component/shared/block-renderer-fn";
import { YoutubeDataType } from "src/components/draft-component/shared/validation/youtube";

import YoutubeComponent from "src/components/draft-component/shared/components/youtube-component";

const YoutubeRenderComponent: FunctionComponent<RendererProps> = ({ block }) => {
  const data: YoutubeDataType = block.getData().toObject() as any;

  return <YoutubeComponent data={data} />;
};

export default React.memo(YoutubeRenderComponent);
