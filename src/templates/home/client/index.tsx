//node_modules
import React from "react";
import { NextComponentType } from "next";
import Link from "next/link";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

//types
import type { PageProps } from "../types";

//src components
import Parallax from "src/components/react-parallax-component";
import HeaderComponent from "src/components/header-component";
import FooterComponent from "src/components/footer-component";

//components
import TravelPlanComponent from "./components/travel-plan-component";
import TestimonialCarouselComponent from "./components/testimonial-carousel-component";
import PartnersAffiliatesComponent from "./components/partners-affiliates-component";
import MetaComponent from "./meta";

//images
import parallax1 from "src/images/dd8d493f79a87a6fc4abec5605696108.png";
import parallax2 from "src/images/f8f8e0309fcf757da2220e09081f9e54.png";

//styles
import styles from "./styles/home.module.scss";

//TODO brand statement
//TODO short bio
//TODO bgImageAlts

const HomePage: NextComponentType<any, any, PageProps> = ({ testimonials }) => {
  return (
    <>
      <MetaComponent />
      <HeaderComponent />
      <Parallax bgImage={parallax1} bgImageAlt="Mountains" strength={-300} priority>
        <Container className="my-5">
          <Row className={`g-0 justify-content-center ${styles["parallax-row"]}`}>
            <Col className="my-auto d-flex justify-content-center">
              <h1 className={styles["parallax-text"]}>Welcome to Adjust to the Good Life Travel, where I specialize in turning your travel dreams into memorable vacations!</h1>
            </Col>
          </Row>
        </Container>
      </Parallax>
      <TravelPlanComponent />
      <Parallax bgImage={parallax2} bgImageAlt="Oceans" strength={-300}>
        <Container className="my-5">
          <Row className={`g-0 text-center ${styles["parallax-row"]}`}>
            <Col md={6} className="my-auto d-flex">
              <Card className={`mx-auto ${styles["card"]}`}>
                <Card.Body>
                  <Card.Title>Ready to get started?</Card.Title>
                  <Card.Text>
                    Let my travel experience help to plan <b>your vacation!</b>
                  </Card.Text>
                  <Row className="g-0">
                    <Link href="/contact/" passHref>
                      <Button variant="outline-primary">CONTACT US</Button>
                    </Link>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="my-auto d-flex">
              <Card className={`mx-auto ${styles["card"]}`}>
                <Card.Body>
                  <Card.Title>Sandals Resorts</Card.Title>
                  <Card.Text>
                    <b>More quality inclusions</b> than any other resorts on the planet
                  </Card.Text>
                  <Row className="g-0">
                    <Link href="/sandals-beaches-resorts/" passHref>
                      <Button variant="outline-success">LOOK CLOSER</Button>
                    </Link>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Parallax>
      <TestimonialCarouselComponent testimonials={testimonials} />
      <PartnersAffiliatesComponent />
      <div className="m-auto" />
      <FooterComponent />
    </>
  );
};

export default HomePage;
