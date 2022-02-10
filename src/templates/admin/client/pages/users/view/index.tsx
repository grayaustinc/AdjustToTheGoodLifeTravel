//node_modules
import React, { FunctionComponent, useState, useCallback } from "react";
import { useUpdateEffect } from "react-use";

//modifier
import createModifierComponent from "src/components/admin-components/modifier-component";

//components
import PagingComponent from "./router-component";

//api
//TODO disable delete?
// import deleteUser from "src/templates/api/admin/db/user/delete/client";

//types
import type { PageProps } from "src/templates/admin/server/paths/users/view";
import type { UserDocumentData } from "libs/arangodb/collections/users";

const ModifierComponent = createModifierComponent<UserDocumentData>();

function getHref(location: UserDocumentData) {
  return `/admin/users/create/${location._key}/`;
}

function getHeader(location: UserDocumentData) {
  return `${location._key} - ${location.username}`;
}

const AdminLocationsPage: FunctionComponent<PageProps> = (props) => {
  const [users, setUsers] = useState(props.users);

  // const onDelete = useCallback(
  //   async (target: UserDocumentData) => {
  //     if (window.confirm(`Are you sure you want to delete User: "${target.username}"?`)) {
  //       const response = await deleteUser(target);
  //       if (response.ok) {
  //         setUsers((data) => data.filter((value) => value._key !== target._key));
  //       } else {
  //         window.alert(response.message);
  //       }
  //     }
  //   },
  //   [setUsers]
  // );

  useUpdateEffect(() => {
    setUsers(props.users);
  }, [props]);

  return (
    <>
      <ModifierComponent
        name="user"
        title="List of all Users"
        subtitle="You can use this menu in order to modify/delete Users"
        values={users}
        getHeader={getHeader}
        getHref={getHref}
        /*onDelete={onDelete}*/
      />
      <div className="my-auto" />
      <PagingComponent page={props.page} total={props.total} />
    </>
  );
};

export default AdminLocationsPage;
