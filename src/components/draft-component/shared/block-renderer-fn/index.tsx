import { ContentBlock, ContentState } from "draft-js";
import { FunctionComponent } from "react";

export interface RendererProps {
  contentState: ContentState;
  block: ContentBlock;
}

type FCRP = FunctionComponent<RendererProps>;

function getAtomicComponent(ImageAtomicComponent: FCRP, YoutubeAtomicComponent: FCRP, PartAtomicComponent: FCRP) {
  const AtomicComponent: FCRP = ({ contentState, block }) => {
    const data = block.getData();

    const type = data.get("type");

    switch (type) {
      case "IMAGE":
        return <ImageAtomicComponent contentState={contentState} block={block} />;
      case "YOUTUBE":
        return <YoutubeAtomicComponent contentState={contentState} block={block} />;
      case "PART":
        return <PartAtomicComponent contentState={contentState} block={block} />;
      default:
        return <></>;
    }
  };
  return AtomicComponent;
}

function wrapper(ImageAtomicComponent: FCRP, YoutubeAtomicComponent: FCRP, PartAtomicComponent: FCRP) {
  const AtomicComponent = getAtomicComponent(ImageAtomicComponent, YoutubeAtomicComponent, PartAtomicComponent);

  function getBlockRenderer(block: ContentBlock): any {
    const type = block.getType();

    switch (type) {
      case "atomic":
        return {
          component: AtomicComponent,
          editable: false,
        };
      default:
        return null;
    }
  }

  return getBlockRenderer;
}

export default wrapper;
