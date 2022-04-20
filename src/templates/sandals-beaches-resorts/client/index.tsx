//node_modules
import React from "react";
import { NextPage } from "next";
import NextImage from "next/image";
import { Container, Row, Col } from "react-bootstrap";

//layout
import SiteLayout from "src/layouts/site-layout";

//components
import ParallaxComponent from "src/components/parallax-component";
import ParallaxHeaderComponent from "src/components/parallax-header-component";
import ReferralComponent from "./components/referral-component";

//meta
import MetaComponent from "./meta";

//images
import sandals_certificate from "src/images/ae7c61ef659259bdf678cdbc10d147df.png";
import parallax from "src/images/9f6e0b8e55a228caf31233ec5280b1e4.png";

//sizes
import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";
const certificate_sizes = getBootstrapSizes({ xs: 384, xl: 256 });

//styles
import styles from "./styles/sandals.module.scss";
import { headClassName } from "src/styles/modules/head";

const SandalsPage: NextPage<any> = () => {
  return (
    <SiteLayout>
      <MetaComponent />
      <ParallaxComponent bgImage={parallax} bgImageAlt="Sandals Resort" strength={-200} quality={50} priority>
        <ParallaxHeaderComponent>Sandals and Beaches Resorts</ParallaxHeaderComponent>
      </ParallaxComponent>
      <Container className="my-5">
        <h2 className={`${headClassName} text-center`}>Preferred Agency for Sandals and Beaches Resorts</h2>
        <Row className="g-0">
          <Col lg={3} className={styles["image"]}>
            <NextImage src={sandals_certificate} alt="Sandals Certified Specialist" placeholder="blur" sizes={certificate_sizes} quality={75} />
          </Col>
          <Col lg={9} className={styles["p"]}>
            <p>
              Adjust to the Good Travel is a Preferred Sandals and Beaches Travel Agency and Certified Sandals Specialists. Having traveled and experienced first hand most of all
              of the Sandals and Beaches resorts, we are uniquely trained in customizing which resort experience is perfect for your vacation. We can't wait to see where you'll go!
            </p>
            <p>
              Every Sandals resort sits directly on white sand beaches surrounded by turquoise waters, in the most gorgeous tropical destinations in the Caribbean islands like
              Grenada, Antigua, St. Lucia, Barbados, Curacao, Jamaica, and the Bahamas. Featuring 5 star Global Gourmet dining, unlimited premium liquors, exciting water sports,
              and the most luxurious accommodations.
            </p>
          </Col>
        </Row>
        <Row className="g-0">
          <Col className={styles["p"]}>
            <p>
              From over water bungalows in St. Lucia, and Jamaica, to beachfront bungalows and swim up pool suites you are sure to find a perfect suite for your getaway! The
              Sandals brand is truly one of the world's best luxury all inclusive resorts that was created for couples in love and they offer the most comprehensive all inclusive
              experience. All Sandals resorts are adults-only, and all tips, taxes, gratuities, roundtrip airport transfers and free WiFi are also included.
            </p>
            <h2 className={`${headClassName} text-center my-3`}>Eat and Drink</h2>
            <p>
              Limitless gourmet dining options at each Sandals resort includes up to 16 restaurants and is one of the most impressive highlights of your luxury all-inclusive
              vacation. Boasting a 5 star global gourmet program that will take you on a culinary experience that gives guests a new international cuisine every night. From over
              water restaurants to bare foot dining with unforgettable views you can pick where you want to dine each night. Internationally trained chefs prepare locally sourced
              food with the freshest quality ingredients to provide the most authentic culinary experience.
            </p>
            <p>
              Each Sandals resort has as many as 11 bars with some located right on the beach and directly over the ocean serving unlimited premium liquors, beer, and wine to give
              you an authentic island experience. All of the rooms are stocked daily with beer, wine and suites include premium liquors. Every Sandals property has a bar for every
              mood including sky bars, piano lounges, swim up pool bars and unique over-the-water bars.
            </p>
            <h2 className={`${headClassName} text-center my-3`}>Entertainment</h2>
            <p>
              There are endless ways to have fun day and night with themed parties, events and entertainment that includes live shows, steel drum bands, fire eaters, island
              performers, bonfire parties, and extravagant beach parties.
            </p>
            <p>
              At Sandals, guests can enjoy dozens of complimentary activities that include a full range of motorized and non -motorized water sports. From snorkeling to sailing
              with paddle boards, aqua trikes, glass bottom boats and kayaks. There are land sports including beach volleyball, basketball, shuffleboards, billiards, bowling,
              tennis, and table tennis. You can do as much or as little as you like while you're here - after all, it's your vacation!
            </p>
            <p>
              Sandals resorts include diving with the best in equipment, and staff at incredible dive sites! Even if you've never dived before, their PADI Discover Scuba Diving
              Program will give you a whole new underwater world to explore with all the instruction and equipment you need.
            </p>
            <h2 className={`${headClassName} text-center my-3`}>Championship Golf Courses</h2>
            <p>
              Some of the Sandals resorts have championship golf courses in Jamaica, St. Lucia, and the Bahamas that guests can enjoy with complimentary green fees perfect for any
              skill level.
            </p>
            <p>Best of all, free round-trip transfers are included from all our nearby Sandals Resorts.</p>
            <h2 className={`${headClassName} text-center my-3`}>Offshore Private Islands</h2>
            <p>
              Offshore island adventures await you at two of the Sandals resorts for a truly tropical experience. At Sandals Royal Bahamian, and Sandals Royal Caribbean you can
              escape to their private offshore island just minutes from the main resorts.
            </p>
            <p>
              Connect with us to help you pick the best Sandals resort based on your preferences! Our attention to detail and first hand experience will help you find a perfect
              destination for your honeymoon, anniversary or couples getaway.
            </p>
            <p>We don't just book vacations we book experiences!</p>
            <p>Looking for a family resort then we can also suggest the Beaches brand also owned by Sandals. </p>
            <ReferralComponent />
          </Col>
        </Row>
      </Container>
      <div className="m-auto" />
    </SiteLayout>
  );
};

export default React.memo(SandalsPage);
