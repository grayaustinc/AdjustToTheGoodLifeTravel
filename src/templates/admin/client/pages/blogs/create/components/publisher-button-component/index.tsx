//node_modules
import React, { FunctionComponent, useCallback, useState } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

//types
import type { BlogDocumentData } from "libs/arangodb/collections/blogs";
import type { DraftDocumentData } from "libs/arangodb/collections/drafts";

//modal
import PublishModalComponent from "./publisher-modal-component";

//alert
import AlertProvider from "src/contexts/error-alert/alert-provider";

//api

interface PublishedSettingsButtonProps {
  blog: BlogDocumentData;
  draft: DraftDocumentData;
  setBlog: (blog: BlogDocumentData) => void;
}

const PublisherComponent: FunctionComponent<PublishedSettingsButtonProps> = ({ blog, draft, setBlog }) => {
  const [show, setShow] = useState(false);

  const handleShow = useCallback(() => setShow(true), [setShow]);
  const handleHide = useCallback(() => setShow(false), [setShow]);

  return (
    <AlertProvider>
      <PublishModalComponent show={show} blog={blog} draft={draft} setBlog={setBlog} handleHide={handleHide} />
      <Button variant="primary" className="mx-2 my-1" onClick={handleShow}>
        <FontAwesomeIcon icon={faPen} />
        <span className="ms-2">Publisher</span>
      </Button>
    </AlertProvider>
  );
};

export default React.memo(PublisherComponent);
