//node_modules
import React, { useState } from "react";
import { NextComponentType } from "next";

//layout
import AdminLayout from "src/layouts/admin-layout";

//alert
import AlertProvider from "src/contexts/error-alert/alert-provider";

//components
import LocationModifierComponent from "src/components/admin-components/location-modifier-component";

//types
import type { LocationDocumentData } from "libs/arangodb/collections/locations";
import type { PageProps } from "../types";

const AdminLocationCreatePage: NextComponentType<any, any, PageProps> = (props) => {
  const [location, setLocation] = useState<LocationDocumentData>();

  return (
    <AdminLayout>
      <AlertProvider>
        <LocationModifierComponent location={location} setLocation={setLocation} />
      </AlertProvider>
    </AdminLayout>
  );
};

export default AdminLocationCreatePage;
