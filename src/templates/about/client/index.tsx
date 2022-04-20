//node_modules
import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import NextImage from "next/image";
import dynamic from "next/dynamic";
import { Container, Row, Col, Card } from "react-bootstrap";

//pages
import type { PageProps } from "../types";

//libs
import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";

//layout
import SiteLayout from "src/layouts/site-layout";

//components
import ParallaxComponent from "src/components/parallax-component";
import ParallaxHeaderComponent from "src/components/parallax-header-component";

//dynamic
const MapComponent = dynamic(() => import("src/components/map-component"));

//locals
import LocationsCarouselComponent from "./components/locations-carousel-component";
import MetaComponent from "./meta";

//styles
import { blackLinkClassName } from "src/styles/modules/link";
import style from "./tc.module.scss";

//images
import stacy from "src/images/9e528c4d2bebc8f4e28a959be207953c.png";
import haley from "src/images/f7091e063ae7ef9ef00e1d938eb4587a.png";
import parallax1 from "src/images/d40aaf23ea6975f9fd137914e53aeaef.png";

const sizes = getBootstrapSizes({ xs: 256 });

const AboutPage: NextPage<PageProps> = ({ locations }) => {
  return (
    <SiteLayout>
      <MetaComponent />
      <ParallaxComponent bgImage={parallax1} bgImageAlt="Parallax Background Image" quality={60} strength={-250} priority>
        <ParallaxHeaderComponent>Learn About Us!</ParallaxHeaderComponent>
      </ParallaxComponent>
      <div className={style["bg"]}>
        <Container className="my-2">
          <Row className="my-5">
            <Col lg={4} className="mt-lg-5 mb-auto text-center">
              <Card.Body className={style["image-container"]}>
                <NextImage src={stacy} alt="Image of Stacy Gray" sizes={sizes} quality={75} placeholder="blur" objectFit="contain" />
              </Card.Body>
            </Col>
            <Col lg={8}>
              <h2 className={style["h"]}>Stacy Gray</h2>
              <div className={style["phone"]}>
                <Link href="tel:+1-919-810-3743" passHref>
                  <a>(919) 810-3743</a>
                </Link>
              </div>
              <Card.Text className={`${style["b"]} mb-4`}>
                I am a Raleigh, NC based travel agent specializing in planning honeymoons, family gatherings, group travel and destination weddings. My passion is to help you find
                and experience the most amazing dream vacations. I take the stress out of planning by taking care of all the details so you can relax and enjoy your escape
                vacation! I love creating tailor-made vacations and my valued clients get my first hand experience.
              </Card.Text>
              <Card.Text className={`${style["b"]} mt-4`}>
                My background is in healthcare, and I am a chiropractor in Raleigh NC for the last 26 years and a travel agent for the last 9 years. I launched Adjust to the Good
                Life Travel in 2013 based solely on my love and passion for travel! My dad was a Naval officer and we traveled extensively growing up when we lived in Europe. Our
                family loves exploring new destinations, experiencing unique adventures, and creating lifelong memories together. My daughter, Haley Gray has joined the family
                business and is now also a travel consultant with our travel agency.
              </Card.Text>
              <Card.Text className={`${style["b"]} mt-4`}>
                Our family has cruised over 25 different sailings to almost all of the Caribbean islands, Hawaii, Alaska, Europe, Tahiti, Galapagos and other exotic destinations.
                We have explored over 33 countries, and traveled to almost all of the states within the U.S. We also love exploring the U.S National parks and taking expeditions.
                As an experienced travel partner, I have the personal knowledge to help your family too! Having the personal knowledge of these destinations has enabled me to see
                first hand what my clients will experience.
              </Card.Text>
              <Card.Text className={`${style["b"]} mt-4`}>
                I hold one of the highest levels of certification within the cruise industry, as a Master Cruise Counselor designated through CLIA (Cruise Lines International
                Association). It is a rigorous program that includes first attaining Accredited Cruise Counselor status, after selling many, many cruises, inspecting and personally
                sailing on different types of ships. This program enabled me to experience a wide range of cruise brands and gain first hand knowledge so that I can create the
                perfect experience for my clients.
              </Card.Text>
              <Card.Text className={`${style["b"]} mt-4`}>
                As a preferred Sandals and Beaches Specialist, I have completed an extensive educational program where I learned and experienced first hand about the Sandals and
                Beaches resorts. Being recognized by the industry as a Sandals expert, enables me to help match you to the perfect Caribbean destination.
              </Card.Text>
              <Card.Text className={`${style["b"]} mt-4`}>
                Thank you for taking the time to visit Adjust to the Good Life Travel and considering us for any and all of your vacation planning needs. We are truly grateful for
                the opportunity to work with you. I love helping my clients discover new and exciting adventures and enjoy building lasting relationships!
              </Card.Text>
              <Card.Text className={`${style["b"]} mt-4`}>
                Feel free to sign up for a{" "}
                <Link href="https://10to8.com/book/tjfpqu-free/" passHref>
                  <a className={blackLinkClassName} rel="nofollow noindex" target="_blank">
                    Dream Vacation Planning Session
                  </a>
                </Link>{" "}
                so I can help you turn your travel dreams into memorable vacations!
              </Card.Text>
            </Col>
          </Row>
          <Row className="my-5">
            <Col lg={{ span: 4, order: "last" }} className="mt-lg-5 mb-auto text-center">
              <Card.Body className={style["image-container"]}>
                <NextImage src={haley} alt="Image of Haley Gray" sizes={sizes} quality={75} placeholder="blur" objectFit="contain" />
              </Card.Body>
            </Col>
            <Col lg={{ span: 8, order: "first" }}>
              <Card.Body>
                <h2 className={style["h"]}>Haley Gray</h2>
                <div className={style["phone"]}>
                  <Link href="tel:+1-919-710-2657" passHref>
                    <a>(919) 710-2657</a>
                  </Link>
                </div>
                <Card.Text className={`${style["b"]} mb-4`}>
                  Even at a young age, I’ve always had a thirst for adventure! Becoming a travel agent with Adjust to the Good Life Travel with my mom, Stacy Gray was a natural
                  step for me because of my love and passion for travel.
                </Card.Text>
                <Card.Text className={`${style["b"]} mb-4`}>
                  Growing up with a mom as a travel agent and my unique childhood of visiting 40 states and 32 countries has truly inspired me to want to help others experience
                  their own travel adventures! My passion for culture, and exploration coupled with my first-hand experience has given me the knowledge to help you turn your dreams
                  into reality. I am confident that my expertise will assist in providing you with incredible travel experiences and authentic adventures while helping you create
                  your own amazing memories.
                </Card.Text>
                <Card.Text className={`${style["b"]} mt-4`}>
                  I am looking forward to help you plan your next vacation and will search extensively to find you the best rates at the best locations! As your personal travel
                  agent, I am able to give you the attention and personal service you deserve at no extra cost to you and can even price match any trip you may have already found.
                  Since our agency has exclusive benefits with many of the cruise lines, all-inclusive resorts, and many tour package companies, I am confident I will be able to
                  beat competitors rates.
                </Card.Text>
                <Card.Text className={`${style["b"]} mt-4`}>
                  If you are ready to book your next adventure, please reach out to me and we can begin the process of creating a tailor made vacation for you as soon as possible!
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <Container className="my-5">
        <h4 className={style["t"]}>Places we have visited</h4>
        <MapComponent locations={locations} />
      </Container> */}
      {/* <LocationsCarouselComponent locations={locations} /> */}
      <div className="m-auto" />
    </SiteLayout>
  );
};

export default AboutPage;
