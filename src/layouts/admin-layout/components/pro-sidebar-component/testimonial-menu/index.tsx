import React from "react";
import { FunctionComponent } from "react";
import Link from "next/link";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//access-control
import ac from "libs/access-control";

//types
import type { UserDocumentData } from "libs/arangodb/collections/users";

interface PropsType {
  user?: UserDocumentData;
}

const TestimonialMenu: FunctionComponent<PropsType> = ({ user }) => {
  const access = ac.can(user?.role || "none").readAny("testimonial");

  if (access.granted) {
    return (
      <SubMenu title="Testimonials" icon={<FontAwesomeIcon icon={faPen} />}>
        <MenuItem>
          <Link href="/admin/testimonials/">View All</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/admin/testimonials/create/">Create New</Link>
        </MenuItem>
      </SubMenu>
    );
  }
  return null;
};

export default React.memo(TestimonialMenu);
