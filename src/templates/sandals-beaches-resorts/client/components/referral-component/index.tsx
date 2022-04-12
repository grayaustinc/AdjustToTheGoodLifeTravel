//node_modules
import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Container, Button } from "react-bootstrap";

//components
import ParallaxComponent from "src/components/parallax-component";

//images
import bgImage from "src/images/e14928f047b58720d574e7034b54326b.png";

//styles
import styles from "./referral.module.scss";

const href = "http://www.sandals.com/?referral=104018&agentid=STGR2506";

const SandalsPage: FunctionComponent<any> = () => {
  return (
    <div className={`${styles["wrapper"]} my-5`}>
      <ParallaxComponent bgImage={bgImage} bgImageAlt="Sandals Resort" strength={0} quality={80}>
        <Container className="my-5">
          <div className={styles["container"]}>
            <h2 className={styles["header"]}>Explore a New Kind of Paradise</h2>
            <div className="text-center my-3">
              <Link href={href} passHref>
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
};

export default React.memo(SandalsPage);
