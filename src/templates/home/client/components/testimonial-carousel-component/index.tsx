//node_modules
import React, { FunctionComponent, useCallback, useEffect, useRef } from "react";
import { Button, Container, Carousel, ButtonGroup } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import type { CarouselRef } from "react-bootstrap/esm/Carousel";

//libs
import type { TestimonialDocumentData } from "libs/arangodb/collections/testimonials";

//components
import StarRatingComponent from "src/components/star-rating-component";

//styles
import style from "./testimonial.module.scss";
import { headClassName } from "src/styles/modules/head";

interface TestimonialCarouselProps {
  testimonials: TestimonialDocumentData[];
}

const TestimonialCarouselComponent: FunctionComponent<TestimonialCarouselProps> = ({ testimonials }) => {
  const ref = useRef<CarouselRef>(null);

  const gotoNext = useCallback(() => ref.current?.next(), [ref]);
  const gotoPrev = useCallback(() => ref.current?.prev(), [ref]);

  return (
    <React.Fragment>
      <Container className="mt-5">
        <h1 className={`${headClassName} text-center`}>TESTIMONIALS</h1>
      </Container>
      <div className="my-5">
        <Carousel ref={ref} slide={true} wrap={true} controls={false} indicators={false} interval={5000}>
          {testimonials.map((testimonial, i) => (
            <Carousel.Item key={i} className="text-center">
              <div className={style["item"]}>
                <p className="h3 mt-3">{testimonial.title}</p>
                <p className="h5">{testimonial.locations}</p>
                <StarRatingComponent rating={testimonial.rating} />
                <p>{testimonial.description}</p>
                <p>{`— ${testimonial.reviewer}`}</p>
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
              <Button variant="outline-primary">Read More Reviews</Button>
            </Link>
            <Button variant="outline-dark" onClick={gotoNext}>
              <span className="me-2">Next</span>
              <FontAwesomeIcon icon={faForward} />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(TestimonialCarouselComponent);
