import React, { FunctionComponent, PropsWithChildren } from "react";
import { NavDropdown } from "react-bootstrap";

interface Props {
  title: string;
}

const NavHeaderDropdownLinkComponent: FunctionComponent<PropsWithChildren<Props>> = ({ title, children }) => {
  return <NavDropdown title={title}>{children}</NavDropdown>;
};

export default NavHeaderDropdownLinkComponent;
