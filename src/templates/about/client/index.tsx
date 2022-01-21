//node_modules
import React from "react";
import { NextComponentType } from "next";
import NextImage from "next/image";
import { Container, Row, Col, Card } from "react-bootstrap";

//pages
import type { PageProps } from "../types";

//libs
import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";

//components
import HeaderComponent from "src/components/header-component";
import FooterComponent from "src/components/footer-component";
import MapComponent from "src/components/map-component";
import Parallax from "src/components/react-parallax-component";

//locals
import LocationsCarouselComponent from "./components/locations-carousel-component";
import MetaComponent from "./meta";

//styles
import style from "./tc.module.scss";

//images
import stacy from "src/images/9e528c4d2bebc8f4e28a959be207953c.png";
import parallax1 from "src/images/034a26112ead212bfa4442bfc89c3267.png";

const sizes = getBootstrapSizes(256, 256, 256, 256, 256, 256);

//TODO change image to haley

const AboutPage: NextComponentType<any, any, PageProps> = ({ locations }) => {
  return (
    <>
      <MetaComponent />
      <HeaderComponent />
      <Parallax bgImage={parallax1} bgImageAlt="Parallax Background Image" strength={-200}>
        <Container className="my-5">
          <Row className="g-0 justify-content-center" style={{ minHeight: "596px" }}>
            <Col className="my-auto d-flex justify-content-center">
              <h1 className={style["hh"]}>Learn About Us!</h1>
            </Col>
          </Row>
        </Container>
      </Parallax>
      <div className={style["bg"]}>
        <Container className="my-2">
          <Row className="my-5">
            <Col md={4} className="my-auto text-center">
              <Card.Body className={style["image-container"]}>
                <NextImage src={stacy} sizes={sizes} quality={75} objectFit="contain" />
              </Card.Body>
            </Col>
            <Col md={8}>
              <Card.Body>
                <h1 className={style["h"]}>Stacy Gray</h1>
                <Card.Text className={`${style["b"]} mb-4`}>
                  I am a Raleigh, NC based travel agent who specializes in helping families and couples find and experience the most amazing dream vacations. I take the stress out
                  of planning by taking care of all the details so you can relax and enjoy your escape vacation!
                </Card.Text>
                <Card.Text className={`${style["b"]} mt-4`}>
                  I have been helping my clients since 2013 get right to the heart of their destination by knowing how to find the best deals on cruises, all inclusive, Disney,
                  Europe, and the Caribbean. As your personal travel agent, I am able to give you the attention and personal service you deserve at no extra cost to you and can
                  also price match any trip you may have already found. Since my agency has exclusive benefits with many of the cruise lines, all inclusive resorts, and many tour
                  package companies, I am confident I will be able to beat competitors rates. Feel free to sign up for an Dream Vacation Planning Session below so I can help you
                  turn your travel dreams into memorable vacations!
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
          <Row className="my-5">
            <Col md={{ span: 4, order: "last" }} className="my-auto text-center">
              <Card.Body className={style["image-container"]}>
                <NextImage src={stacy} sizes={sizes} quality={75} objectFit="contain" />
              </Card.Body>
            </Col>
            <Col md={{ span: 8, order: "first" }}>
              <Card.Body>
                <h1 className={style["h"]}>Haley Gray</h1>
                <Card.Text className={`${style["b"]} mb-4`}>
                  I am a Raleigh, NC based travel agent who specializes in helping families and couples find and experience the most amazing dream vacations. I take the stress out
                  of planning by taking care of all the details so you can relax and enjoy your escape vacation!
                </Card.Text>
                <Card.Text className={`${style["b"]} mt-4`}>
                  I have been helping my clients since 2013 get right to the heart of their destination by knowing how to find the best deals on cruises, all inclusive, Disney,
                  Europe, and the Caribbean. As your personal travel agent, I am able to give you the attention and personal service you deserve at no extra cost to you and can
                  also price match any trip you may have already found. Since my agency has exclusive benefits with many of the cruise lines, all inclusive resorts, and many tour
                  package companies, I am confident I will be able to beat competitors rates. Feel free to sign up for an Dream Vacation Planning Session below so I can help you
                  turn your travel dreams into memorable vacations!
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="my-5">
        <h4 className={style["t"]}>Places we have visited</h4>
        <MapComponent locations={locations} />
      </Container>
      <LocationsCarouselComponent locations={locations} />
      <div className="m-auto" />
      <FooterComponent />
    </>
  );
};

export default AboutPage;
