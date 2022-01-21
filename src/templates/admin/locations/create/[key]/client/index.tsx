//node_modules
import React, { useState } from "react";
import { NextComponentType } from "next";
import { useUpdateEffect } from "react-use";

//layout
import AdminLayout from "src/layouts/admin-layout";

//alert
import AlertProvider from "src/contexts/error-alert/alert-provider";

//components
import LocationModifierComponent from "src/components/admin-components/location-modifier-component";

//types
import type { PageProps } from "../types";

const AdminLocationCreateEditPage: NextComponentType<any, any, PageProps> = (props) => {
  const [location, setLocation] = useState(props.location);

  useUpdateEffect(() => {
    setLocation(props.location);
  }, [props]);

  return (
    <AdminLayout>
      <AlertProvider>
        <LocationModifierComponent location={location} setLocation={setLocation} />
      </AlertProvider>
    </AdminLayout>
  );
};

export default AdminLocationCreateEditPage;
