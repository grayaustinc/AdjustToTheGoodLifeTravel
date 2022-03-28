import React from "react";
import { FunctionComponent } from "react";
import Link from "next/link";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//access-control
import ac from "libs/access-control";

//types
import type { UserDocumentData } from "libs/arangodb/collections/users";

interface PropsType {
  user?: UserDocumentData;
}

const MentionMenu: FunctionComponent<PropsType> = ({ user }) => {
  const access1 = ac.can(user?.role || "none").readAny("blog");

  if (access1.granted) {
    return (
      <SubMenu title="Press" icon={<FontAwesomeIcon icon={faNewspaper} />}>
        <MenuItem>
          <Link href="/admin/mentions/">View All</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/admin/mentions/create/">Create New</Link>
        </MenuItem>
      </SubMenu>
    );
  }
  return null;
};

export default React.memo(MentionMenu);
