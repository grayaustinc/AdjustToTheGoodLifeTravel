import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Nav, NavDropdown } from "react-bootstrap";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface NavInterface {
  name: string;
  icon: IconDefinition;
  href: string;
}

const NavHeaderDropdownLinkItemComponent: FunctionComponent<NavInterface> = ({ href, name }) => {
  return (
    <NavDropdown.Item as="div">
      <Link href={href} passHref>
        <Nav.Link>
          <span className="px-1 my-auto">{name}</span>
        </Nav.Link>
      </Link>
    </NavDropdown.Item>
  );
};

export default React.memo(NavHeaderDropdownLinkItemComponent);
