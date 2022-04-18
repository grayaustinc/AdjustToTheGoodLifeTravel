//node_modules
import React, { FunctionComponent, useCallback, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { Navbar, Nav, Row, Col, Container, Offcanvas } from "react-bootstrap";
import { faFacebook, faInstagram, faPinterest } from "@fortawesome/free-brands-svg-icons";
import { faHome, faUsers, faHotel, faIdCard, faConciergeBell, faQuestionCircle, faBlog, faNewspaper, IconDefinition, faPen } from "@fortawesome/free-solid-svg-icons";
import { SocialProfileJsonLd } from "next-seo";

//header components
import NavHeaderLinkComponent from "./nav-header/link-component";
import NavHeaderSocialComponent from "./nav-header/social-component";

//canvas components
import NavCanvasLinkComponent from "./nav-canvas/link-component";
import NavCanvasSocialComponent from "./nav-canvas/social-component";

//libs
import getWebsiteUrl from "libs/helper/get-website-url";

//styles
import style from "./header.module.scss";

//images
import logo from "src/images/b5af1386aa9a31ab376a6d4dda63be82.svg";

interface NavInterface {
  name: string;
  icon: IconDefinition;
  href: string;
}

type NavigationType = "Home" | "AboutUs" | "Testimonials" | "Sandals" | "Contact" | "Services" | "FAQ" | "Blog" | "Press";

const navigation: { [key in NavigationType]: NavInterface } = {
  Home: {
    name: "Home",
    icon: faHome,
    href: "/",
  },
  AboutUs: {
    name: "Meet the Gray's",
    icon: faUsers,
    href: "/about/",
  },
  Testimonials: {
    name: "Testimonials",
    icon: faPen,
    href: "/testimonials/",
  },
  Sandals: {
    name: "Sandals / Beaches",
    icon: faHotel,
    href: "/sandals-beaches-resorts/",
  },
  Contact: {
    name: "Contact",
    icon: faIdCard,
    href: "/contact/",
  },
  Services: {
    name: "Services",
    icon: faConciergeBell,
    href: "/services/",
  },
  FAQ: {
    name: "FAQ",
    icon: faQuestionCircle,
    href: "/faq/",
  },
  Blog: {
    name: "Blog",
    icon: faBlog,
    href: "/blogs/",
  },
  Press: {
    name: "Press",
    icon: faNewspaper,
    href: "/press/",
  },
};

interface NavSocialInterface {
  name: string;
  icon: IconDefinition;
  color: string;
  href: string;
}

type SocialsType = "Facebook" | "Instagram";

const socials: { [key in SocialsType]: NavSocialInterface } = {
  Facebook: { name: "Facebook", icon: faFacebook, color: "#4267B2", href: "https://www.facebook.com/AdjusttotheGoodLifeTravel/" },
  Instagram: { name: "Instagram", icon: faInstagram, color: "#DD2A7B", href: "https://www.instagram.com/adjusttothegoodlifetravel/" },
  // Pinterest: { name: "Pinterest", icon: faPinterest, color: "#E60023", href: "/#" }, //TODO get pinterest href
};

const HeaderComponent: FunctionComponent = () => {
  const [show, setShow] = useState<boolean>(false);

  const handleShow = useCallback(() => setShow(true), [setShow]);
  const handleClose = useCallback(() => setShow(false), [setShow]);

  return (
    <header>
      <SocialProfileJsonLd
        keyOverride="json-socials"
        type="Organization"
        name="Adjust to the Good Life Travel"
        url={getWebsiteUrl("/")}
        sameAs={[socials.Facebook.href, socials.Instagram.href]}
      />
      <Container className={style["container"]} fluid>
        <Row className="g-0">
          <Col lg={3} className="text-center"></Col>
          <Link href="/" passHref={true}>
            <Col as="a" lg={6} className={`m-2 text-center ${style["logo"]}`}>
              <NextImage src={logo} alt="Adjust to the Good Life Travel Logo" width="675.828125px" height="256px" priority={true} unoptimized={true} />
            </Col>
          </Link>
          <Col lg={3} className="text-center"></Col>
        </Row>
      </Container>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle className="ms-auto me-2" onClick={handleShow} />
        <Navbar.Collapse className="d-none d-lg-block">
          <Nav className={`${style["ff-lato"]} me-auto`}>
            <NavHeaderLinkComponent {...navigation.Home} />
            <NavHeaderLinkComponent {...navigation.AboutUs} />
            <NavHeaderLinkComponent {...navigation.Testimonials} />
            <NavHeaderLinkComponent {...navigation.Sandals} />
            <NavHeaderLinkComponent {...navigation.Contact} />
            <NavHeaderLinkComponent {...navigation.Services} />
            <NavHeaderLinkComponent {...navigation.FAQ} />
            <NavHeaderLinkComponent {...navigation.Blog} />
          </Nav>
          <Nav className={`${style["ff-lato"]} ms-auto`}>
            <NavHeaderSocialComponent {...socials.Facebook} />
            <NavHeaderSocialComponent {...socials.Instagram} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className={style["oc-title"]}>Adjust to the Good Life Travel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container className={style["ff-lato"]} fluid>
            <Row className="justify-content-center">
              <NavCanvasLinkComponent {...navigation.Home} />
              <NavCanvasLinkComponent {...navigation.AboutUs} />
              <NavCanvasLinkComponent {...navigation.Testimonials} />
              <NavCanvasLinkComponent {...navigation.Sandals} />
              <NavCanvasLinkComponent {...navigation.Contact} />
              <NavCanvasLinkComponent {...navigation.Services} />
              <NavCanvasLinkComponent {...navigation.FAQ} />
              <NavCanvasLinkComponent {...navigation.Blog} />
            </Row>
            <hr />
            <Row className="justify-content-center">
              <NavCanvasSocialComponent {...socials.Facebook} />
              <NavCanvasSocialComponent {...socials.Instagram} />
            </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

export default React.memo(HeaderComponent);
