import React, { useCallback } from "react";
import { FunctionComponent } from "react";
import Link from "next/link";
import { Offcanvas } from "react-bootstrap";
import { faTachometerAlt, faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent, SidebarHeader } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//context
import { useAuthenticated } from "src/contexts/user";

//components
import UserMenu from "./user-menu";
import TestimonialMenu from "./testimonial-menu";
import MentionMenu from "./mention-menu";
import LocationMenu from "./location-menu";
import BlogMenu from "./blog-menu";
import LogoutComponent from "../logout-component";

import styles from "./index.module.scss";

interface AdminHeaderProps {
  toggle: boolean;
  onToggle: (value: boolean) => void;
}

const AdminProSidebarComponent: FunctionComponent<AdminHeaderProps> = ({ toggle, onToggle }) => {
  const user = useAuthenticated();

  const onHide = useCallback(() => onToggle(false), [onToggle]);

  return (
    <Offcanvas show={toggle} onHide={onHide}>
      <ProSidebar width="auto">
        <SidebarHeader>
          <Offcanvas.Header closeButton>
            <div className={styles["header"]}>Admin Panel</div>
          </Offcanvas.Header>
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
            <UserMenu user={user} />
            <TestimonialMenu user={user} />
            <LocationMenu user={user} />
            {/* <MentionMenu user={user} /> */}
            <BlogMenu user={user} />
            <SidebarFooter>
              <MenuItem icon={<FontAwesomeIcon icon={faHome} />}>
                <Link href="/">Home</Link>
              </MenuItem>
              <LogoutComponent type="pro-sidebar" />
            </SidebarFooter>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </Offcanvas>
  );
};

export default React.memo(AdminProSidebarComponent);
