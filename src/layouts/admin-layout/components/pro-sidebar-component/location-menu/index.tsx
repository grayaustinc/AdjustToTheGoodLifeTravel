import React from "react";
import { FunctionComponent } from "react";
import Link from "next/link";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//access-control
import ac from "libs/access-control";

//types
import type { UserDocumentData } from "libs/arangodb/collections/users";

interface PropsType {
  user?: UserDocumentData;
}

const LocationMenu: FunctionComponent<PropsType> = ({ user }) => {
  const access = ac.can(user?.role || "none").readAny("location");

  if (access.granted) {
    return (
      <SubMenu title="Locations" icon={<FontAwesomeIcon icon={faPlane} />}>
        <MenuItem>
          <Link href="/admin/locations/">View All</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/admin/locations/create/">Create New</Link>
        </MenuItem>
      </SubMenu>
    );
  }
  return null;
};

export default React.memo(LocationMenu);
