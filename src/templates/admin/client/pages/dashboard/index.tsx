import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";

const AdminDashboardPage: FunctionComponent<any> = () => {
  return (
    <Container className="my-3">
      <div className="text-center">
        <h1>Welcome to the Admin Panel</h1>
      </div>
    </Container>
  );
};

export default React.memo(AdminDashboardPage);
