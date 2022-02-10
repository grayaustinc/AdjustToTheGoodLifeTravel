import React, { FunctionComponent } from "react";
import { Spinner } from "react-bootstrap";

const LoadingComponent: FunctionComponent = () => {
  return (
    <div className="text-center">
      <Spinner variant="primary" animation="border" />
    </div>
  );
};

export default React.memo(LoadingComponent);
