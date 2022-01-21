import React, { FunctionComponent } from "react";
import { NavDropdown } from "react-bootstrap";

interface NavHeaderDropdownLinkProps {
  title: string;
}

const NavHeaderDropdownLinkComponent: FunctionComponent<NavHeaderDropdownLinkProps> = ({ title, children }) => {
  return <NavDropdown title={title}>{children}</NavDropdown>;
};

export default NavHeaderDropdownLinkComponent;
