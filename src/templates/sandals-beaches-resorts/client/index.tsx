//node_modules
import React from "react";
import { NextComponentType } from "next";
import Link from "next/link";
import NextImage from "next/image";
import { Container, Row, Col } from "react-bootstrap";

//components
import HeaderComponent from "src/components/header-component";
import FooterComponent from "src/components/footer-component";

//components
import ParallaxComponent from "src/components/parallax-component";
import ParallaxHeaderComponent from "src/components/parallax-header-component";

//meta
import MetaComponent from "./meta";

//images
import sandals_certificate from "src/images/ae7c61ef659259bdf678cdbc10d147df.png";
import parallax from "src/images/3a09d58794098791c474322bf5cca573.png";
import sandals_referral from "src/images/82b569f71239953e188d6ab0ec75c846.png";

//sizes
import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";
const certificate_sizes = getBootstrapSizes(384, 384, 384, 384, 256, 256);
const referral_sizes = getBootstrapSizes(384, 640, 750, 1200, 1200, 1200);

//styles
import styles from "./styles/sandals.module.scss";

//TODO fix up everything
//TODO example https://rjttravels.com/sandals-travel-agency/

const SandalsPage: NextComponentType<any, any, any> = (p) => {
  return (
    <>
      <MetaComponent />
      <HeaderComponent />
      <ParallaxComponent bgImage={parallax} bgImageAlt="Sandals Resort" strength={-200} quality={80} priority>
        <ParallaxHeaderComponent>Sandals and Beaches Resorts</ParallaxHeaderComponent>
      </ParallaxComponent>
      <Container>
        <h1 className="text-center my-5">Preferred Agency for Sandals and Beaches Resorts</h1>
        <Row className="g-0">
          <Col lg={3} className={styles["image"]}>
            <NextImage src={sandals_certificate} alt="Sandals Certified Specialist" placeholder="blur" sizes={certificate_sizes} quality={75} />
          </Col>
          <Col lg={9}>
            <p className={styles["p"]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Col>
        </Row>
        <h1 className="text-center mt-5 mb-2">Sandals Referral</h1>
        <Row className="g-0">
          <Col className={styles["referral"]}>
            <Link href="http://www.sandals.com/?referral=104018&agentid=STGR2506" passHref>
              <a rel="noopener nofollow" target="_blank">
                <NextImage src={sandals_referral} alt="Sandals Referral" placeholder="blur" sizes={referral_sizes} quality={80} />
              </a>
            </Link>
          </Col>
        </Row>
      </Container>
      <div className="m-auto" />
      <FooterComponent />
    </>
  );
};

export default SandalsPage;
