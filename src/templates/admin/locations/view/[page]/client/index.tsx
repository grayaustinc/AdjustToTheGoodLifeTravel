//node_modules
import React, { useCallback, useState } from "react";
import { NextComponentType } from "next";
import { useUpdateEffect } from "react-use";

//layout
import AdminLayout from "src/layouts/admin-layout";

//modifier
import createModifierComponent from "src/components/admin-components/modifier-component";

//components
import PagingComponent from "./router-component";

//api
import deleteLocation from "src/templates/api/admin/db/location/delete/client";

//types
import type { PageProps } from "../types";
import type { LocationDocumentData } from "libs/arangodb/collections/locations";

const ModifierComponent = createModifierComponent<LocationDocumentData>();

function getHref(location: LocationDocumentData) {
  return `/admin/locations/create/${location._key}/`;
}

function getHeader(location: LocationDocumentData) {
  return `${location._key} - ${location.name}`;
}

const AdminLocationsPage: NextComponentType<any, any, PageProps> = (props) => {
  const [locations, setLocations] = useState(props.locations);

  const onDelete = useCallback(
    async (target: LocationDocumentData) => {
      if (window.confirm(`Are you sure you want to delete Location: ${target.name}?`)) {
        const response = await deleteLocation(target);
        if (response.ok) {
          setLocations((data) => data.filter((value) => value._key !== target._key));
        } else {
          window.alert(response.message);
        }
      }
    },
    [setLocations]
  );

  useUpdateEffect(() => {
    setLocations(props.locations);
  }, [props]);

  return (
    <AdminLayout>
      <ModifierComponent
        name="location"
        title="List of all Locations"
        subtitle="You can use this menu in order to modify/delete Locations"
        values={locations}
        getHeader={getHeader}
        getHref={getHref}
        onDelete={onDelete}
      />
      <div className="my-auto" />
      <PagingComponent page={props.page} total={props.total} />
    </AdminLayout>
  );
};

export default AdminLocationsPage;
