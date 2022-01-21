//node_modules
import React, { FunctionComponent, useCallback, useRef, useState } from "react";
import { Container, Card, Row, Col, Button, Carousel, ButtonGroup } from "react-bootstrap";
// import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import type { CarouselRef } from "react-bootstrap/esm/Carousel";

//components
import NextImageComponent from "src/components/next-image-component";

//types
import type { LocationDocumentData } from "libs/arangodb/collections/locations";

//styles
import style from "../../tc.module.scss";

interface LocationsCarouselProps {
  locations: LocationDocumentData[];
}

const LocationsCarouselComponent: FunctionComponent<LocationsCarouselProps> = ({ locations }) => {
  const ref = useRef<CarouselRef>(null);

  const gotoNext = useCallback(() => ref.current?.next(), [ref]);
  const gotoPrev = useCallback(() => ref.current?.prev(), [ref]);

  return (
    <div className={`${style["wrapper"]} mt-5 py-3`}>
      <Carousel ref={ref} slide={true} wrap={true} controls={false} indicators={false} interval={10000}>
        {locations.map((item, i) => {
          return (
            <Carousel.Item key={i}>
              <div className={style["item"]}>
                <Row className={item.image ? "" : "justify-content-center text-center"}>
                  {item.image && (
                    <Col md={6} className="my-auto text-center">
                      <Card.Body>
                        <NextImageComponent data={item.image} />
                      </Card.Body>
                    </Col>
                  )}
                  <Col md={6}>
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <div className="d-flex justify-content-center">
        <ButtonGroup>
          <Button variant="outline-dark" onClick={gotoPrev}>
            <FontAwesomeIcon icon={faBackward} />
            <span className="ms-2">Prev</span>
          </Button>
          {/* <Link href="/testimonials/" passHref>
            <Button variant="outline-success">Read More Reviews</Button>
          </Link> */}
          <Button variant="outline-dark" onClick={gotoNext}>
            <span className="me-2">Next</span>
            <FontAwesomeIcon icon={faForward} />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default React.memo(LocationsCarouselComponent);
