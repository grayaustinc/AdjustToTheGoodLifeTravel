import React, { FunctionComponent, PropsWithChildren } from "react";
import { DecoratorProps } from "src/components/draft-component/shared/decorators";
import type { LinkDataType } from "src/components/draft-component/shared/validation/link";

import LinkComponent from "src/components/draft-component/shared/components/link-component";

const LinkDecoratorComponent: FunctionComponent<PropsWithChildren<DecoratorProps>> = ({ entityKey, contentState, children }) => {
  const data: LinkDataType = contentState.getEntity(entityKey).getData();

  return <LinkComponent href={data.href}>{children}</LinkComponent>;
};

export default LinkDecoratorComponent;
