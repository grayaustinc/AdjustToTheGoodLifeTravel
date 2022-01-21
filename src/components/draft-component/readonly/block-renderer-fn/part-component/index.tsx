import React, { FunctionComponent } from "react";

import { RendererProps } from "src/components/draft-component/shared/block-renderer-fn";

import PartComponent from "src/components/draft-component/shared/components/part-component";

const PartRenderComponent: FunctionComponent<RendererProps> = () => {
  return <PartComponent />;
};

export default React.memo(PartRenderComponent);
