import React, { FunctionComponent } from "react";
import { Row, Col, Spinner } from "react-bootstrap";

export type UploadStatus =
  | {
      type: "error";
      message: string;
    }
  | {
      type: "uploading";
    }
  | {
      type: "complete";
    };

interface UploadStatusProps {
  status: UploadStatus;
}

const UploadStatusComponent: FunctionComponent<UploadStatusProps> = ({ status }) => {
  switch (status.type) {
    case "error":
      return (
        <Row className="text-center my-2">
          <Col className="text-danger">{status.message}</Col>
        </Row>
      );
    case "uploading":
      return (
        <Row className="justify-content-center  my-2">
          <Spinner animation="border" variant="warning" />
        </Row>
      );
    case "complete":
      return (
        <Row className="text-center  my-2">
          <Col className="text-success">File successfully uploaded!</Col>
        </Row>
      );
  }
};

export default React.memo(UploadStatusComponent);
