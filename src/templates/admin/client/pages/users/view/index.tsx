//node_modules
import React, { FunctionComponent, useState, useCallback } from "react";
import { useUpdateEffect } from "react-use";

//components
import PreviewComponent from "src/components/admin-components/preview-component";
import PagingComponent from "src/components/paging-component";

//libs
import { TOTAL_DOCUMENTS_PER_PAGE } from "src/templates/admin/server/paths/users/view/constant";

//types
import type { PageProps } from "src/templates/admin/server/paths/users/view";
import type { UserDocumentData } from "libs/arangodb/collections/users";

function getHref(location: UserDocumentData) {
  return `/admin/users/create/${location._key}/`;
}

function generateHref(page: number) {
  return `/admin/users/view/${page}`;
}

function getHeader(location: UserDocumentData) {
  return location.username;
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
      <PreviewComponent
        name="user"
        title="List of all Users"
        subtitle="You can use this menu in order to modify/delete Users"
        values={users}
        getHeader={getHeader}
        getHref={getHref}
        /*onDelete={onDelete}*/
      />
      <div className="my-auto" />
      <PagingComponent page={props.page} totalPerPage={TOTAL_DOCUMENTS_PER_PAGE} total={props.total} maxButtons={5} generateHref={generateHref} />
    </>
  );
};

export default AdminLocationsPage;
