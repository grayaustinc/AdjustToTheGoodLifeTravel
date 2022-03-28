import React from "react";
import { FunctionComponent } from "react";
import Link from "next/link";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//access-control
import ac from "libs/access-control";

//types
import type { UserDocumentData } from "libs/arangodb/collections/users";

interface PropsType {
  user?: UserDocumentData;
}

const UserMenu: FunctionComponent<PropsType> = ({ user }) => {
  const access = ac.can(user?.role || "none").readAny("user");

  if (access.granted) {
    return (
      <SubMenu title="Users" icon={<FontAwesomeIcon icon={faUsers} />}>
        <MenuItem>
          <Link href="/admin/users/">View All</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/admin/users/create/">Create New</Link>
        </MenuItem>
      </SubMenu>
    );
  }
  return null;
};

export default React.memo(UserMenu);
