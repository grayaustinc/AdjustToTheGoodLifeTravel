import React, { FunctionComponent, useCallback, useState } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

import HelpOffcanvas from "./help-offcanvas";

const HelpButtonComponent: FunctionComponent = () => {
  const [show, setShow] = useState(false);

  const toggleShow = useCallback(() => setShow((x) => !x), [setShow]);

  return (
    <>
      <HelpOffcanvas show={show} setShow={setShow} />
      <Button variant="light" className="mx-2 my-1" onClick={toggleShow}>
        <FontAwesomeIcon icon={faInfoCircle} />
        <span className="ms-2">Help</span>
      </Button>
    </>
  );
};

export default React.memo(HelpButtonComponent);
