import { FunctionComponent, PropsWithChildren } from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./container.module.scss";

type SizeType = "sm" | "md";

function getRowClass(size?: SizeType) {
  switch (size) {
    case "sm":
      return styles["height-sm"];
    default:
    case "md":
      return styles["height-md"];
  }
}

interface PropsType {
  size?: SizeType;
}

const ParallaxHeaderComponent: FunctionComponent<PropsWithChildren<PropsType>> = ({ size, children }) => {
  return (
    <Container className="my-5">
      <Row className={`g-0 justify-content-center ${getRowClass(size)}`}>
        <Col className="my-auto d-flex justify-content-center">
          <h1 className={styles["text"]}>{children}</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default ParallaxHeaderComponent;
