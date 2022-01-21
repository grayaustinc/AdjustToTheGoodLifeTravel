import React, { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";

import { YoutubeModalAsset, YoutubeModalDispatch } from "../hook";

import YoutubeFormikComponent from "./youtube-formik-component";

interface ImageModalProps {
  asset: YoutubeModalAsset;
  dispatch: YoutubeModalDispatch;
}

//https://www.youtube.com/watch?v=dQw4w9WgXcQ

const YoutubeModal: FunctionComponent<ImageModalProps> = ({ asset, dispatch }) => {
  const handleClose = () => dispatch({ type: "hide" });

  return (
    <Modal size="lg" show={asset.show} fullscreen="lg-down" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Youtube Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <YoutubeFormikComponent asset={asset} handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(YoutubeModal);
