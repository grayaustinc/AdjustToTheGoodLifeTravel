import { FunctionComponent } from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./container.module.scss";

const ParallaxHeaderComponent: FunctionComponent = ({ children }) => {
  return (
    <Container className="my-5">
      <Row className={`g-0 justify-content-center ${styles["row"]}`}>
        <Col className="my-auto d-flex justify-content-center">
          <h1 className={styles["text"]}>{children}</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default ParallaxHeaderComponent;
