//node_modules
import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

//types
import type { PageProps } from "../types";

//layout
import SiteLayout from "src/layouts/site-layout";

//src components
import ParallaxComponent from "src/components/parallax-component";
import ParallaxHeaderComponent from "src/components/parallax-header-component";

//components
import TravelPlanComponent from "./components/travel-plan-component";
import TestimonialCarouselComponent from "./components/testimonial-carousel-component";
import PartnersAffiliatesComponent from "./components/partners-affiliates-component";
import MetaComponent from "./meta";

//images
//TODO fix
import parallax1 from "src/images/5f7cbe2dc628e35784b204b6d16dba89.png";
import parallax2 from "src/images/f8f8e0309fcf757da2220e09081f9e54.png";

//styles
import styles from "./styles/home.module.scss";

//TODO brand statement
//TODO short bio
const HomePage: NextPage<PageProps> = ({ testimonials }) => {
  return (
    <SiteLayout>
      <MetaComponent />
      <ParallaxComponent bgImage={parallax1} bgImageAlt="Mountains" strength={-300} priority>
        {/* <ParallaxHeaderComponent>Welcome to Adjust to the Good Life Travel, where we specialize in turning your travel dreams into memorable vacations!</ParallaxHeaderComponent> */}
        <ParallaxHeaderComponent>
          Adjust to the Good Life Travel is a Raleigh based travel agency, where we specialize in turning your travel dreams into memorable vacations!
        </ParallaxHeaderComponent>
      </ParallaxComponent>
      <TravelPlanComponent />
      <ParallaxComponent bgImage={parallax2} bgImageAlt="Oceans" strength={-300}>
        <Container className="my-5">
          <Row className={`g-0 text-center ${styles["parallax-row"]}`}>
            <Col md={6} className="my-auto d-flex">
              <Card className={`mx-auto ${styles["card"]} border-dark`}>
                <Card.Body>
                  <Card.Title>Ready to get started?</Card.Title>
                  <Card.Text>
                    Let my travel experience help to plan <b>your vacation!</b>
                  </Card.Text>
                  <Row className="g-0">
                    <Link href="/contact" passHref>
                      <Button variant="outline-primary">CONTACT US</Button>
                    </Link>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="my-auto d-flex">
              <Card className={`mx-auto ${styles["card"]} border-dark`}>
                <Card.Body>
                  <Card.Title>Sandals Resorts</Card.Title>
                  <Card.Text>
                    <b>More quality inclusions</b> than any other resorts on the planet
                  </Card.Text>
                  <Row className="g-0">
                    <Link href="/sandals-beaches-resorts" passHref>
                      <Button variant="outline-success">LOOK CLOSER</Button>
                    </Link>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </ParallaxComponent>
      <TestimonialCarouselComponent testimonials={testimonials} />
      <PartnersAffiliatesComponent />
    </SiteLayout>
  );
};

export default React.memo(HomePage);
