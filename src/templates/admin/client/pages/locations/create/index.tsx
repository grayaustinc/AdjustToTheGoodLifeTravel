//node_modules
import React, { FunctionComponent, useState } from "react";
import { useUpdateEffect } from "react-use";

//alert
import AlertProvider from "src/contexts/error-alert/alert-provider";

//components
import LocationComponent from "./location-component";

//types
import type { PageProps } from "src/templates/admin/server/paths/locations/create";

const AdminLocationCreateEditPage: FunctionComponent<PageProps> = (props) => {
  const [location, setLocation] = useState(props.location);

  useUpdateEffect(() => {
    setLocation(props.location);
  }, [props]);

  return (
    <AlertProvider>
      <LocationComponent location={location} setLocation={setLocation} />
    </AlertProvider>
  );
};

export default React.memo(AdminLocationCreateEditPage);
