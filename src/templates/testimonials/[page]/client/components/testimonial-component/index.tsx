//import node_modules
import React, { FunctionComponent } from "react";
import { Container, Image, Row, Col, Card, Button, Carousel } from "react-bootstrap";

import StarRatigComponent from "src/components/star-rating-component";

//styles
import style from "./tc.module.scss";

//types
import type { TestimonialDocumentData } from "libs/arangodb/collections/testimonials";

interface TestimonialProps {
  testimonial: TestimonialDocumentData;
}

const TestimonialComponent: FunctionComponent<TestimonialProps> = ({ testimonial }) => {
  return (
    <Col xs={12} xl={6} className="px-5">
      <div className={style["item"]}>
        <h2 className="h3 mt-3">{testimonial.title}</h2>
        <h3 className="h5">{testimonial.locations}</h3>
        <StarRatigComponent rating={testimonial.rating} />
        <p>{testimonial.description}</p>
        <p>{`— ${testimonial.reviewer}`}</p>
      </div>
    </Col>
  );
};

export default React.memo(TestimonialComponent);
