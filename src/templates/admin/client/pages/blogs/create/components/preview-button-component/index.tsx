import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { Button } from "react-bootstrap";

interface PreviewProps {
  preview: boolean;
  togglePreview: () => void;
}

const PreviewButtonComponent: FunctionComponent<PreviewProps> = ({ preview, togglePreview }) => {
  if (preview) {
    return (
      <Button variant="success" className="mx-2 my-1" onClick={togglePreview}>
        <FontAwesomeIcon icon={faLock} />
        <span className="ms-2">Edit</span>
      </Button>
    );
  }
  return (
    <Button variant="success" className="mx-2 my-1" onClick={togglePreview}>
      <FontAwesomeIcon icon={faLockOpen} />
      <span className="ms-2">Preview</span>
    </Button>
  );
};

export default React.memo(PreviewButtonComponent);
