//node_modules
import React, { FunctionComponent, useCallback, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { Navbar, Nav, Row, Col, Container, Offcanvas } from "react-bootstrap";
import { faFacebook, faInstagram, faPinterest } from "@fortawesome/free-brands-svg-icons";
import { faHome, faChild, faHotel, faIdCard, faConciergeBell, faQuestionCircle, faBlog, faNewspaper, IconDefinition, faPen } from "@fortawesome/free-solid-svg-icons";

//header components
import NavHeaderLinkComponent from "./nav-header/link-component";
import NavHeaderSocialComponent from "./nav-header/social-component";
import NavHeaderDropdownLinkItemComponent from "./nav-header/dropdown-link-item-component";
import NavHeaderDropdownLinkComponent from "./nav-header/dropdown-link-component";

//canvas components
import NavCanvasLinkComponent from "./nav-canvas/link-component";
import NavCanvasSocialComponent from "./nav-canvas/social-component";

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
    name: "About Us",
    icon: faChild,
    href: "/about/",
  },
  Testimonials: {
    name: "Testimonials",
    icon: faPen,
    href: "/testimonials/",
  },
  Sandals: {
    name: "Sandals",
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

type SocialsType = "Facebook" | "Instagram" | "Pinterest";

const socials: { [key in SocialsType]: NavSocialInterface } = {
  Facebook: { name: "Facebook", icon: faFacebook, color: "#4267B2", href: "https://www.facebook.com/AdjusttotheGoodLifeTravel/" },
  Instagram: { name: "Instagram", icon: faInstagram, color: "#DD2A7B", href: "https://www.instagram.com/adjusttothegoodlifetravel/" },
  Pinterest: { name: "Pinterest", icon: faPinterest, color: "#E60023", href: "/#" }, //TODO get pinterest href
};

const HeaderComponent: FunctionComponent = () => {
  const [show, setShow] = useState<boolean>(false);

  const handleShow = useCallback(() => setShow(true), [setShow]);
  const handleClose = useCallback(() => setShow(false), [setShow]);

  return (
    <>
      <Container className={style["container"]} fluid>
        <Row className="g-0">
          <Col lg={3} className="m-2 m-md-auto text-center">
            <h5 className={style["ff-satisfy"]}>RALEIGH, NC • EST. 2013</h5>
          </Col>
          <Col lg={6} className="text-center">
            <div className={style["logo"]}>
              <Link href="/" passHref={true}>
                <a>
                  <NextImage src={logo} alt="Adjust to the Good Life Travel Logo" width="675.828125px" height="256px" unoptimized />
                </a>
              </Link>
            </div>
          </Col>
          <Col lg={3}></Col>
        </Row>
      </Container>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
        <Navbar.Toggle className="ms-auto me-2" onClick={handleShow} />
        <Navbar.Collapse className="d-none d-lg-block">
          <Nav className={`${style["ff-lato"]} me-auto`}>
            <NavHeaderLinkComponent {...navigation.Home} />
            <NavHeaderDropdownLinkComponent title="About">
              <NavHeaderDropdownLinkItemComponent {...navigation.AboutUs} />
              <NavHeaderDropdownLinkItemComponent {...navigation.Testimonials} />
            </NavHeaderDropdownLinkComponent>
            <NavHeaderLinkComponent {...navigation.Sandals} />
            <NavHeaderLinkComponent {...navigation.Contact} />
            <NavHeaderLinkComponent {...navigation.Services} />
            <NavHeaderLinkComponent {...navigation.FAQ} />
            <NavHeaderLinkComponent {...navigation.Blog} />
            <NavHeaderLinkComponent {...navigation.Press} />
          </Nav>
          <Nav className={`${style["ff-lato"]} ms-auto`}>
            <NavHeaderSocialComponent {...socials.Facebook} />
            <NavHeaderSocialComponent {...socials.Instagram} />
            <NavHeaderSocialComponent {...socials.Pinterest} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className={style["oc-title"]}>Adjust to the Good Life Travel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container fluid>
            <Row className={`${style["ff-lato"]} justify-content-center`}>
              <NavCanvasLinkComponent {...navigation.Home} />
              <NavCanvasLinkComponent {...navigation.AboutUs} />
              <NavCanvasLinkComponent {...navigation.Testimonials} />
              <NavCanvasLinkComponent {...navigation.Sandals} />
              <NavCanvasLinkComponent {...navigation.Contact} />
              <NavCanvasLinkComponent {...navigation.Services} />
              <NavCanvasLinkComponent {...navigation.FAQ} />
              <NavCanvasLinkComponent {...navigation.Blog} />
              <NavCanvasLinkComponent {...navigation.Press} />
            </Row>
            <hr />
            <Row className={style["ff-lato"]}>
              <NavCanvasSocialComponent {...socials.Facebook} />
              <NavCanvasSocialComponent {...socials.Instagram} />
              <NavCanvasSocialComponent {...socials.Pinterest} />
            </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default React.memo(HeaderComponent);
