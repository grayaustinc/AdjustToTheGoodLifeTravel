import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface NavSocialInterface {
  name: string;
  icon: IconDefinition;
  color: string;
  href: string;
}

const NavHeaderSocialComponent: FunctionComponent<NavSocialInterface> = ({ href, icon, color, name }) => {
  return (
    <Link href={href} passHref>
      <Nav.Link className="d-flex" rel="noopener nofollow">
        <FontAwesomeIcon icon={icon} color={color} size="2x" />
        <span className="mx-1 my-auto">{name}</span>
      </Nav.Link>
    </Link>
  );
};

export default React.memo(NavHeaderSocialComponent);
