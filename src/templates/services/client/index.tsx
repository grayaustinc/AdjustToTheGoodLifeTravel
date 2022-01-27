//node_modules
import React from "react";
import { NextComponentType } from "next";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

//components
import HeaderComponent from "src/components/header-component";
import FooterComponent from "src/components/footer-component";
import ParallaxComponent from "src/components/parallax-component";
import ParallaxHeaderComponent from "src/components/parallax-header-component";

//images
import parallax1 from "src/images/97b9375cf75ade65090bccc8c8ef5884.png";

//locals
import MetaComponent from "./meta";

//data
import data from "./data";

//style
import styles from "./f.module.scss";

const ServicesPage: NextComponentType<any, any, any> = () => {
  return (
    <>
      <MetaComponent />
      <HeaderComponent />
      <ParallaxComponent bgImage={parallax1} bgImageAlt="Parallax Image" strength={-200} priority>
        <ParallaxHeaderComponent size="sm">Services We Provide</ParallaxHeaderComponent>
      </ParallaxComponent>
      <Container className="my-5">
        {/* <h1 className="text-center mb-4">Services We Provide</h1> */}
        <ListGroup>
          {data.map((item, i) => (
            <ListGroup.Item key={i} className={styles["h"]}>
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
      <div className="my-auto" />
      <FooterComponent />
    </>
  );
};

export default ServicesPage;
