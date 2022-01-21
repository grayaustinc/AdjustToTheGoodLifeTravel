//node_modules
import React from "react";
import { NextComponentType } from "next";

//layout
import AdminLayout from "src/layouts/admin-layout";

//alert
import AlertProvider from "src/contexts/error-alert/alert-provider";

//components
import UserComponent from "./user-component";

//types
import type { PageProps } from "../types";

const AdminLocationCreatePage: NextComponentType<any, any, PageProps> = () => {
  return (
    <AdminLayout>
      <AlertProvider>
        <UserComponent />
      </AlertProvider>
    </AdminLayout>
  );
};

export default AdminLocationCreatePage;
