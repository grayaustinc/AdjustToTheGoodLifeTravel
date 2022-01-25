//node_modules
import React, { FunctionComponent } from "react";

//meta components
import DefaultMetaComponent from "src/components/meta/default-component";

//hooks
import useWebsiteUrl from "src/hooks/useWebsiteUrl";

const title = "Thank You! - Adjust to the Good Life Travel";
const description = "Successfully contacted a travel agent!";

const MetaComponent: FunctionComponent = () => {
  const url = useWebsiteUrl();

  return <DefaultMetaComponent title={title} description={description} url={url} />;
};

export default React.memo(MetaComponent);
