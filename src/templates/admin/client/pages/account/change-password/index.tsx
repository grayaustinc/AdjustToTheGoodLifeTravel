//node_modules
import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";

//alert
import AlertProvider from "src/contexts/error-alert/alert-provider";

//components
import ChangeComponent from "./change-component";

const AdminDashboardPage: FunctionComponent<any> = () => {
  return (
    <Container className="my-3">
      <div className="text-center">
        <h1>Change Password</h1>
      </div>
      <AlertProvider>
        <ChangeComponent />
      </AlertProvider>
    </Container>
  );
};

export default React.memo(AdminDashboardPage);
