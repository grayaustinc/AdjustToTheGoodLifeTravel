import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Nav } from "react-bootstrap";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface NavInterface {
  name: string;
  icon: IconDefinition;
  href: string;
}

const NavHeaderLinkComponent: FunctionComponent<NavInterface> = ({ name, href }) => {
  return (
    <Link href={href} passHref>
      <Nav.Link>
        <span className="px-1 my-auto">{name}</span>
      </Nav.Link>
    </Link>
  );
};

export default React.memo(NavHeaderLinkComponent);
