import React, { FunctionComponent, useMemo } from "react";

import type { RendererProps } from "src/components/draft-component/shared/block-renderer-fn";
import type { ImageDataType } from "src/modals/image/validation";

import NextImageComponent from "src/components/next-image-component";

const ImageRenderComponent: FunctionComponent<RendererProps> = ({ contentState, block }) => {
  const data: ImageDataType = block.getData().toObject() as any;

  const priority = useMemo(() => {
    for (const target of contentState.getBlocksAsArray()) {
      if (target.getType() === "IMAGE") {
        return target.getKey() === block.getKey();
      }
    }
    return false;
  }, [contentState, block]);

  return <NextImageComponent data={data} priority={priority} />;
};

export default React.memo(ImageRenderComponent);
