//node_modules
import React, { FunctionComponent } from "react";

//meta components
import DefaultMetaComponent from "src/components/meta/default-component";

const title = "Server Error - Adjust to the Good Life Travel";
const description = "An error occurred while loading this page!";

const MetaComponent: FunctionComponent = () => {
  return (
    <>
      <DefaultMetaComponent title={title} description={description} />
    </>
  );
};

export default React.memo(MetaComponent);
