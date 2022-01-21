import React, { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";

import { LinkModalAsset, LinkModalDispatch } from "../hook";

import LinkFormikComponent from "./link-formik-component";

interface ImageModalProps {
  asset: LinkModalAsset;
  dispatch: LinkModalDispatch;
}

//https://www.youtube.com/watch?v=dQw4w9WgXcQ

const LinkModal: FunctionComponent<ImageModalProps> = ({ asset, dispatch }) => {
  const handleClose = () => dispatch({ type: "hide" });

  return (
    <Modal size="lg" show={asset.show} fullscreen="lg-down" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Link</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LinkFormikComponent asset={asset} handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(LinkModal);
