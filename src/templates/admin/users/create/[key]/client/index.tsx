//node_modules
import React, { useState } from "react";
import { NextComponentType } from "next";
import { useUpdateEffect } from "react-use";

//layout
import AdminLayout from "src/layouts/admin-layout";

//alert
import AlertProvider from "src/contexts/error-alert/alert-provider";

//components
import UserComponent from "./user-component";

//types
import type { PageProps } from "../types";

const AdminLocationCreateEditPage: NextComponentType<any, any, PageProps> = (props) => {
  const [user, setUser] = useState(props.user);

  useUpdateEffect(() => {
    setUser(props.user);
  }, [props]);

  return (
    <AdminLayout>
      <AlertProvider>
        <UserComponent user={user} setUser={setUser} />
      </AlertProvider>
    </AdminLayout>
  );
};

export default AdminLocationCreateEditPage;
