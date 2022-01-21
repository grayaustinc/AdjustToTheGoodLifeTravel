import React, { FunctionComponent } from "react";
import { Row, Col, Spinner } from "react-bootstrap";

import ImageThumbnailComponent from "./image-thumbnail-component";

interface PagingProps {
  loading: boolean;
  data: string[];
  currentSrc: string;
  setSrc: (src: string) => void;
}

import selectStyle from "src/components/draft-component/editor/styles/selector.module.scss";

const PagingComponent: FunctionComponent<PagingProps> = ({ loading, data, currentSrc, setSrc }) => {
  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="grow" variant="success" />
      </div>
    );
  }

  return (
    <Row className="my-1 justify-content-center">
      {data.map((staticSrc, i) => (
        <Col key={i} xs={6} sm={4} className="py-2">
          <a className={staticSrc === currentSrc ? selectStyle["selection-renderer-active"] : selectStyle["selection-renderer"]}>
            <ImageThumbnailComponent src={staticSrc} onClick={() => setSrc(staticSrc)} />
          </a>
        </Col>
      ))}
    </Row>
  );
};

export default React.memo(PagingComponent);
