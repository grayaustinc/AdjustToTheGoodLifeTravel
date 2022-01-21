//node_modules
import React from "react";
import { NextComponentType } from "next";
import { Container } from "react-bootstrap";

//alert
import AlertProvider from "src/contexts/error-alert/alert-provider";

//layout
import AdminLayout from "src/layouts/admin-layout";

//components
import ChangeComponent from "./change-component";

const AdminDashboardPage: NextComponentType<any, any, any> = (p) => {
  return (
    <AdminLayout>
      <Container className="my-3">
        <div className="text-center">
          <h1>Change Password</h1>
        </div>
        <AlertProvider>
          <ChangeComponent />
        </AlertProvider>
      </Container>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
