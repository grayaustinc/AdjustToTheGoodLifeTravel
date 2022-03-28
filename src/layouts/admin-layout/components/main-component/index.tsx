//node_modules
import React, { useCallback, FunctionComponent } from "react";
import Link from "next/link";
import { Button, Navbar } from "react-bootstrap";
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//components
import LogoutComponent from "../logout-component";

interface AdminMainProps {
  toggle: boolean;
  onToggle: (value: boolean) => void;
}

const AdminMainComponent: FunctionComponent<AdminMainProps> = ({ toggle, onToggle, children }) => {
  const setToggle = useCallback(() => onToggle(!toggle), [toggle, onToggle]);

  return (
    <React.Fragment>
      <Navbar bg="light" variant="light">
        <Button variant="light" className="ms-2" onClick={setToggle}>
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <div className="mx-auto" />
        <Link href="/" passHref>
          <Button variant="outline-success">
            <span className="me-2">Home</span>
            <FontAwesomeIcon icon={faHome} />
          </Button>
        </Link>
        <LogoutComponent type="navbar" />
      </Navbar>
      {children}
    </React.Fragment>
  );
};

export default AdminMainComponent;
