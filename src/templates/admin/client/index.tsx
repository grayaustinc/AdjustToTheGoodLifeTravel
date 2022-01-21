import React from "react";
import { NextComponentType } from "next";
import { Container } from "react-bootstrap";

import AdminLayout from "src/layouts/admin-layout";

const AdminDashboardPage: NextComponentType<any, any, any> = (p) => {
  return (
    <AdminLayout>
      <Container className="my-3">
        <div className="text-center">
          <h1>Welcome to the Admin Panel</h1>
        </div>
      </Container>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
