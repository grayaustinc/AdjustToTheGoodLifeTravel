import React, { FunctionComponent } from "react";
import NextImage from "next/image";
import Link from "next/link";
import ReactGA from "react-ga4";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

import image1 from "src/images/8df5c93fd190e56f46108d39ed8bbb51.png";
import image2 from "src/images/489ed5fcc1a16101dbbc7757ad75b945.png";
import image3 from "src/images/baa0727900308633b333db5ad820bc56.png";
import image4 from "src/images/d9aa28303e629eb1d172dc829b68caff.png";

const data = [
  {
    title: "Let's chat!",
    description: "Set up a free, no-obligation consultation with us via email or phone.",
    src: image1,
    alt: "Picture of family",
    quality: 30,
  },
  {
    title: "Make a plan!",
    description: "we put together the best options that meet your needs",
    src: image2,
    alt: "Picture of a seal",
    quality: 10,
  },
  {
    title: "Booked!",
    description: "Book your trip! Make the payment and reserve the trip you have always wanted to experience!",
    src: image3,
    alt: "Picture of birds",
    quality: 50,
  },
  {
    title: "Enjoy!",
    description: "Look forward to sharing amazing, memorable experiences with your friends and family!",
    src: image4,
    alt: "Vase full of flowers",
    quality: 50,
  },
];

function bookingClicked() {
  ReactGA.event({ action: "booking_consultation", category: "click" });
}

//TODO change up text inside container

import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";

const sizes = getBootstrapSizes(384, 384, 384, 384, 256, 256);

const TravelPlanComponent: FunctionComponent = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center">TRAVEL PLANNING</h1>
      <Row>
        {data.map((info) => {
          return (
            <Col key={info.title} sm={12} md={6} xl={3} className="align-self-end">
              <Card.Body className="text-center">
                <Card.Title as="h2" className="h4">
                  {info.title}
                </Card.Title>
                <Card.Text>{info.description}</Card.Text>
              </Card.Body>
              <Card.Body>
                <NextImage src={info.src} alt={info.alt} placeholder="blur" width="100%" height="100%" sizes={sizes} quality={info.quality} layout="responsive" />
              </Card.Body>
            </Col>
          );
        })}
      </Row>
      <Row className="mt-5">
        <h2 className="text-center">Dream Vacation Planning Session</h2>
        <p className="text-center">
          Let’s schedule your FREE 15-minute travel consultation and speak by phone. I can answer your travel questions and collect information I need to turn your travel dreams
          into a memorable vacation!
        </p>
        <div className="text-center">
          <Link href="https://10to8.com/book/tjfpqu-free/" passHref>
            <Button rel="nofollow noindex" target="_blank" size="lg" onClick={bookingClicked}>
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span className="ms-2">BOOK YOUR FREE CONSULTATION</span>
            </Button>
          </Link>
        </div>
      </Row>
    </Container>
  );
};

export default React.memo(TravelPlanComponent);
