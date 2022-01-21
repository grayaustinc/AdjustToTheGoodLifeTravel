import React, { FunctionComponent, useCallback, useRef, useState } from "react";
import { Container, Row, Col, Button, Carousel, ButtonGroup } from "react-bootstrap";
import Link from "next/link";
import type { TestimonialDocumentData } from "libs/arangodb/collections/testimonials";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import type { CarouselRef } from "react-bootstrap/esm/Carousel";

import StarRatigComponent from "src/components/star-rating-component";

import { trimText } from "libs/helper/text-trim";

import style from "./tc.module.scss";

interface TestimonialCarouselProps {
  testimonials: TestimonialDocumentData[];
}

const TestimonialCarouselComponent: FunctionComponent<TestimonialCarouselProps> = ({ testimonials }) => {
  const ref = useRef<CarouselRef>(null);

  const gotoNext = useCallback(() => ref.current?.next(), [ref]);
  const gotoPrev = useCallback(() => ref.current?.prev(), [ref]);

  return (
    <div className={`${style["wrapper"]} my-5`}>
      <h1 className="text-center">TESTIMONIALS</h1>
      <Carousel ref={ref} slide={true} wrap={true} controls={false} indicators={false} interval={5000}>
        {testimonials.map((testimonial, i) => (
          <Carousel.Item key={i} className="text-center">
            <div className={style["item"]}>
              <h2 className="h3 mt-3">{testimonial.title}</h2>
              <h3 className="h5">{testimonial.locations}</h3>
              <StarRatigComponent rating={testimonial.rating} />
              <div>{trimText(testimonial.description, 0, 300, 360, "...")}</div>
              <div>— {testimonial.reviewer}</div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="d-flex justify-content-center">
        <ButtonGroup>
          <Button variant="outline-dark" onClick={gotoPrev}>
            <FontAwesomeIcon icon={faBackward} />
            <span className="ms-2">Prev</span>
          </Button>
          <Link href="/testimonials/" passHref>
            <Button variant="outline-success">Read More Reviews</Button>
          </Link>
          <Button variant="outline-dark" onClick={gotoNext}>
            <span className="me-2">Next</span>
            <FontAwesomeIcon icon={faForward} />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default React.memo(TestimonialCarouselComponent);
