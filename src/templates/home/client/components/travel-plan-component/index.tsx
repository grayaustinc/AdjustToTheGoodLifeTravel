//node_modules
import React, { FunctionComponent } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

//images
import image1 from "src/images/8df5c93fd190e56f46108d39ed8bbb51.png";
import image2 from "src/images/3310862be57917f6970e00c2086ab4cb.png";
import image3 from "src/images/d5b944c1b1af0e7f461be0448084c5a8.png";
import image4 from "src/images/d9aa28303e629eb1d172dc829b68caff.png";

//styles
import styles from "../../styles/home.module.scss";
import { headClassName } from "src/styles/modules/head";

const data = [
  {
    title: "Creating It",
    description:
      "Set up a complimentary consultation with us through email or phone. We will gather all the details, and then get creative and piece together the perfect itinerary.",
    src: image1,
    alt: "Picture of family",
    quality: 50,
  },
  {
    title: "Perfecting It",
    description: "Working together, we can then fine tune all the details and tailor the experiences to your desires until it is perfect.",
    src: image2,
    alt: "Picture of a sailboats",
    quality: 50,
  },
  {
    title: "Payment",
    description: "Once you are happy, you will make a deposit to secure the trip you have always dreamed of and wanted to experience!",
    src: image3,
    alt: "Picture of birds",
    quality: 50,
  },
  {
    title: "Enjoy!",
    description: "While you are away on your amazing unforgettable vacation, we will be available to help with any questions that may arise.",
    src: image4,
    alt: "Vase full of flowers",
    quality: 50,
  },
];

import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";

const sizes = getBootstrapSizes(384, 384, 384, 384, 256, 256);

const TravelPlanComponent: FunctionComponent = () => {
  return (
    <Container className="my-5">
      <h1 className={`${headClassName} text-uppercase text-center`}>Ready to get Started?</h1>
      <Row>
        {data.map((info) => {
          return (
            <Col key={info.title} sm={12} md={6} xl={3}>
              <Card className="h-100 border-0">
                <Card.Body className="d-flex flex-column text-center">
                  <Card.Title as="h2" className="h3">
                    {info.title}
                  </Card.Title>
                  <Card.Text className={styles["modified-text"]}>{info.description}</Card.Text>
                  <div className="py-2 my-auto" />
                  <NextImage src={info.src} alt={info.alt} placeholder="blur" width="100%" height="100%" sizes={sizes} quality={info.quality} layout="responsive" />
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row className="mt-5">
        <h2 className="text-center">Dream Vacation Planning Session</h2>
        <p className={`${styles["modified-text"]} text-center`}>
          Let’s schedule your FREE 15-minute travel consultation and speak by phone. I can answer your travel questions and collect information I need to turn your travel dreams
          into a memorable vacation!
        </p>
        <div className="text-center">
          <Link href="https://10to8.com/book/tjfpqu-free/" passHref>
            <Button rel="nofollow noindex" target="_blank" size="lg">
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
