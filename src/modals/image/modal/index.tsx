import React, { FunctionComponent, useEffect, useState } from "react";
import { Modal, Nav, Tab } from "react-bootstrap";

import { ImageModalAsset, ImageModalDispatch } from "../hook";

import ImageGeneralComponent from "./image-general-component";
import ImageUrlComponent from "./image-url-component";
import ImageUploadComponent from "./image-upload-component";
import ImageSearchComponent from "./image-search-component";

interface ImageModalProps {
  asset: ImageModalAsset;
  dispatch: ImageModalDispatch;
}

type ActiveType = "general" | "url" | "search" | "upload";

const ImageModal: FunctionComponent<ImageModalProps> = ({ asset, dispatch }) => {
  const [activeKey, setActiveKey] = useState<ActiveType>("general");

  useEffect(() => {
    if (asset.data) {
      setActiveKey("general");
    } else {
      setActiveKey("url");
    }
  }, [asset.data]);

  const handleClose = () => dispatch({ type: "hide" });

  function onSelectChange(activeKey: ActiveType) {
    setActiveKey(activeKey);
  }

  const handleActiveKeyGeneral = () => onSelectChange("general");
  const handleActiveKeyUrl = () => onSelectChange("url");
  const handleActiveKeySearch = () => onSelectChange("search");
  const handleActiveKeyUpload = () => onSelectChange("upload");

  return (
    <Modal size="lg" show={asset.show} fullscreen="lg-down" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Insert Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Nav justify variant="tabs" className="mb-3">
          {asset.data && (
            <Nav.Item>
              <Nav.Link onClick={handleActiveKeyGeneral} style={{ cursor: "pointer" }} active={activeKey === "general"}>
                General
              </Nav.Link>
            </Nav.Item>
          )}
          <Nav.Item>
            <Nav.Link onClick={handleActiveKeyUrl} style={{ cursor: "pointer" }} active={activeKey === "url"}>
              Url
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={handleActiveKeyUpload} style={{ cursor: "pointer" }} active={activeKey === "upload"}>
              Upload
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={handleActiveKeySearch} style={{ cursor: "pointer" }} active={activeKey === "search"}>
              Search
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          {asset.data && (
            <Tab.Pane active={activeKey === "general"}>
              <ImageGeneralComponent asset={asset} handleClose={handleClose} />
            </Tab.Pane>
          )}
          <Tab.Pane active={activeKey === "url"}>
            <ImageUrlComponent asset={asset} handleClose={handleClose} />
          </Tab.Pane>
          <Tab.Pane active={activeKey === "upload"}>
            <ImageUploadComponent asset={asset} handleClose={handleClose} />
          </Tab.Pane>
          <Tab.Pane active={activeKey === "search"}>
            <ImageSearchComponent asset={asset} handleClose={handleClose} />
          </Tab.Pane>
        </Tab.Content>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(ImageModal);
