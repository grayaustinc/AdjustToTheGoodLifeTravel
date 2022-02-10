import React, { FunctionComponent } from "react";

const AdminNotFoundPage: FunctionComponent<any> = () => {
  return (
    <div className="my-auto">
      <h1 className="display-1 text-center font-weight-bold">404</h1>
      <h4 className="text-center">Admin page was not found!</h4>
    </div>
  );
};

export default React.memo(AdminNotFoundPage);
