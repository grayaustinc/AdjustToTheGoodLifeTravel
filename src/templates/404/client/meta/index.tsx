//node_modules
import React, { FunctionComponent } from "react";

//meta components
import DefaultMetaComponent from "src/components/meta/default-component";

const title = "Page Not Found - Adjust to the Good Life Travel";
const description = "This page could not be found!";

const MetaComponent: FunctionComponent = () => {
  return (
    <>
      <DefaultMetaComponent title={title} description={description} />
    </>
  );
};

export default React.memo(MetaComponent);
