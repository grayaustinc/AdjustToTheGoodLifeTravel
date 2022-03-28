import React from "react";
import { FunctionComponent } from "react";
import Link from "next/link";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//access-control
import ac from "libs/access-control";

//types
import type { UserDocumentData } from "libs/arangodb/collections/users";

interface PropsType {
  user?: UserDocumentData;
}

const BlogMenu: FunctionComponent<PropsType> = ({ user }) => {
  const access1 = ac.can(user?.role || "none").readAny("blog");
  const access2 = ac.can(user?.role || "none").readOwn("blog");

  if (access1.granted || access2.granted) {
    return (
      <SubMenu title="Blogs" icon={<FontAwesomeIcon icon={faBlog} />}>
        <MenuItem>
          <Link href="/admin/blogs/">View All</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/admin/blogs/create/">Create New</Link>
        </MenuItem>
      </SubMenu>
    );
  }
  return null;
};

export default React.memo(BlogMenu);
