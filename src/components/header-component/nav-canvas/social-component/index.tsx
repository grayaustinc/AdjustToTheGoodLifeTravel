import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Nav, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface NavSocialInterface {
  name: string;
  icon: IconDefinition;
  color: string;
  href: string;
}

const NavCanvasSocialComponent: FunctionComponent<NavSocialInterface> = ({ name, icon, color, href }) => {
  return (
    <Col xs={4} className="my-3">
      <Link href={href} passHref>
        <Nav.Link className="p-0 text-center text-secondary" rel="noopener nofollow">
          <FontAwesomeIcon icon={icon} color={color} size="2x" />
          <div>{name}</div>
        </Nav.Link>
      </Link>
    </Col>
  );
};

export default React.memo(NavCanvasSocialComponent);
