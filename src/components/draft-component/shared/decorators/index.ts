import { ContentState, CompositeDecorator, DraftDecorator } from "draft-js";
import { FunctionComponent } from "react";

export interface DecoratorProps {
  blockKey: string;
  entityKey: string;
  contentState: ContentState;
  decoratedText: string;
  dir: any;
  end: number;
  offsetKey: string;
  start: number;
}

function wrapper(LinkComponent: FunctionComponent<DecoratorProps>) {
  const linkStrategy: DraftDecorator = {
    strategy: (block, callback, contentState) => {
      block.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        if (entityKey) {
          return contentState.getEntity(entityKey).getType() === "LINK";
        }
        return false;
      }, callback);
    },
    component: LinkComponent,
  };

  return new CompositeDecorator([linkStrategy]);
}

export default wrapper;
