import React from "react";
import { FunctionComponent } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { faTachometerAlt, faPen, faPlane, faBlog, faBars, faUser, faUsers, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarHeader } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMedia } from "react-use";

import responsive from "./responsive.module.scss";
import styles from "src/styles/admin-layout/index.module.scss";

interface AdminHeaderProps {
  toggle: boolean;
  onToggle: (value: boolean) => void;
}

const AdminHeaderComponent: FunctionComponent<AdminHeaderProps> = ({ toggle, onToggle }) => {
  const isMediumMedia = useMedia("(max-width: 768px)", true);
  const toggleClass = toggle ? responsive["title-toggle-1"] : responsive["title-toggle-2"];

  return (
    <ProSidebar className={styles["sidebar"]} collapsed={!isMediumMedia && toggle} toggled={isMediumMedia && toggle} breakPoint="md" onToggle={onToggle}>
      <SidebarHeader>
        <div className={styles["header"]}>
          <Button variant="light" className="px-2 py-0" onClick={() => onToggle(!toggle)}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <span className={`${toggleClass} ms-1`}>Admin Panel</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<FontAwesomeIcon icon={faTachometerAlt} />}>
            <Link href="/admin/dashboard/">dashboard</Link>
          </MenuItem>
          <SubMenu title="Account" icon={<FontAwesomeIcon icon={faUser} />}>
            <MenuItem>
              <Link href="/admin/account/change-password/">Change Password</Link>
            </MenuItem>
          </SubMenu>
          {/* <SubMenu title="Users" icon={<FontAwesomeIcon icon={faUsers} />}>
            <MenuItem>
              <Link href="/admin/users/">View All</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/admin/users/create/">Create New</Link>
            </MenuItem>
          </SubMenu> */}
          <SubMenu title="Testimonials" icon={<FontAwesomeIcon icon={faPen} />}>
            <MenuItem>
              <Link href="/admin/testimonials/">View All</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/admin/testimonials/create/">Create New</Link>
            </MenuItem>
          </SubMenu>
          <SubMenu title="Locations" icon={<FontAwesomeIcon icon={faPlane} />}>
            <MenuItem>
              <Link href="/admin/locations/">View All</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/admin/locations/create/">Create New</Link>
            </MenuItem>
          </SubMenu>
          {/* <SubMenu title="Press" icon={<FontAwesomeIcon icon={faNewspaper} />}>
            <MenuItem>
              <Link href="/admin/mentions/">View All</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/admin/mentions/create/">Create New</Link>
            </MenuItem>
          </SubMenu> */}
          <SubMenu title="Blogs" icon={<FontAwesomeIcon icon={faBlog} />}>
            <MenuItem>
              <Link href="/admin/blogs/">View All</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/admin/blogs/create/">Create New</Link>
            </MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};

export default React.memo(AdminHeaderComponent);
