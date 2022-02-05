import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Nav, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface NavInterface {
  name: string;
  icon: IconDefinition;
  href: string;
}

const NavCanvasLinkComponent: FunctionComponent<NavInterface> = ({ href, name, icon }) => {
  return (
    <Col xs={4} className="my-3">
      <Link href={href} passHref>
        <Nav.Link className="p-0 text-center text-muted">
          <FontAwesomeIcon icon={icon} size="lg" />
          <div>{name}</div>
        </Nav.Link>
      </Link>
    </Col>
  );
};

export default React.memo(NavCanvasLinkComponent);
