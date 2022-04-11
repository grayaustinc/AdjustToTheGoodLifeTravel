//node_modules
import React, { FunctionComponent } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { Container, Row, Col, Button } from "react-bootstrap";

//components
import ParallaxComponent from "src/components/parallax-component";
import ParallaxHeaderComponent from "src/components/parallax-header-component";

//images
import src from "src/images/e14928f047b58720d574e7034b54326b.png";

//styles
import styles from "./referral.module.scss";

//sizes
import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";
const sizes = getBootstrapSizes(384, 640, 750, 1200, 1200, 1200);

const referral = "http://www.sandals.com/?referral=104018&agentid=STGR2506";

const SandalsPage: FunctionComponent<any> = () => {
  return (
    <div className="my-5">
      <ParallaxComponent bgImage={src} bgImageAlt="Sandals Resort" strength={0} quality={80}>
        <Container className="my-5">
          <div className={styles["container"]}>
            <h2 className={styles["header"]}>Explore a New Kind of Paradise</h2>
            <div className="text-center my-3">
              <Link href={referral} passHref>
                <Button variant="success" className={`${styles["button"]} text-uppercase`} rel="noopener nofollow" target="_blank" size="lg">
                  Look Closer Here!
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </ParallaxComponent>
    </div>
  );

  return (
    <div className={styles["content"]}>
      <div className={styles["wrapper"]}>
        <NextImage className={styles["image"]} src={src} alt="Sandals Referral" quality={80} sizes={sizes} objectFit="cover" layout="responsive" />
      </div>
      <div className={styles["content"]}>
        <h2 className={styles["referral-header"]}>Explore a New Kind of Paradise</h2>
        <div className="text-center">
          <Link href={referral} passHref>
            <Button variant="success" className="text-uppercase" rel="noopener nofollow" target="_blank" size="lg">
              Look Closer Here!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
  return (
    <div className={styles["referral"]}>
      <NextImage src={src} alt="Sandals Referral" placeholder="blur" sizes={sizes} objectFit="cover" quality={80} />
      <div className={styles["referral-text"]}>
        <h2 className={styles["referral-header"]}>Explore a New Kind of Paradise</h2>
        <div className="text-center">
          <Link href={referral} passHref>
            <Button variant="success" className="text-uppercase" rel="noopener nofollow" target="_blank" size="lg">
              Look Closer Here!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SandalsPage);
