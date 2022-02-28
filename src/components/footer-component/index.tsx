import React, { FunctionComponent } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { Navbar, Nav, Row, Col, Card, Image, Button, Container, ListGroup } from "react-bootstrap";

import style from "./footer.module.scss";

const linkData = [
  {
    href: "/blogs",
    text: "Blog",
  },
  {
    href: "/testimonials",
    text: "Testimonials",
  },
  {
    href: "/faq",
    text: "FAQ",
  },
];

const socialData = [
  {
    href: "https://www.facebook.com/AdjusttotheGoodLifeTravel/",
    text: "Facebook",
  },
  {
    href: "https://www.instagram.com/adjusttothegoodlifetravel/",
    text: "Instagram",
  },
  // {
  //   href: "/#", //TODO get pinterest href
  //   text: "Pinterest",
  // },
];

const contactData = [
  {
    href: "tel:+1-919-810-3743",
    text: "1(919) 810-3743",
  },
  {
    href: "mailto:stacygray@adjusttothegoodlifetravel.com",
    text: "Email Travel Agent",
  },
  {
    href: "/contact",
    text: "Contact Page",
  },
];

const FooterComponent: FunctionComponent = () => {
  return (
    <footer>
      <div className={style["f-1"]}>
        <Container>
          <Row>
            <Col xs={12} md={6} lg={3}>
              <Card.Body className="text-center">
                <Card.Title className={style["heading"]}>Links</Card.Title>
                {linkData.map((data) => (
                  <div key={data.text} className={style["link-wrapper"]}>
                    <Link href={data.href} passHref>
                      <a className={style["link"]}>{data.text}</a>
                    </Link>
                  </div>
                ))}
              </Card.Body>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Card.Body className="text-center">
                <Card.Title className={style["heading"]}>Socials</Card.Title>
                {socialData.map((data) => (
                  <div key={data.text} className={style["link-wrapper"]}>
                    <Link href={data.href} passHref>
                      <a className={style["link"]} rel="noopener nofollow" target="_blank">
                        {data.text}
                      </a>
                    </Link>
                  </div>
                ))}
              </Card.Body>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Card.Body className="text-center">
                <Card.Title className={style["heading"]}>Contact</Card.Title>
                {contactData.map((data) => (
                  <div key={data.text} className={style["link-wrapper"]}>
                    <Link href={data.href} passHref>
                      <a className={style["link"]}>{data.text}</a>
                    </Link>
                  </div>
                ))}
              </Card.Body>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Card.Body className="text-center">
                <Card.Title className={style["heading"]}>Agent Portal</Card.Title>
                <div className={style["link-wrapper"]}>
                  <Link href="/admin/login" passHref>
                    <a className={style["link"]} rel="nofollow noindex">
                      Agent Login
                    </a>
                  </Link>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={`${style["f-2"]} text-center`}>
        <span>
          © 2013 Adjust to the Good Life Travel • Independent Agent of{" "}
          <Link href="https://www.travelathome.com" passHref>
            <a className={style["special-link"]} rel="noopener nofollow" target="_blank">
              Dugan’s Travels
            </a>
          </Link>{" "}
          Proud Member of IATAN, OSSN, NACTA and{" "}
          <Link href="https://www.vacation.com" passHref>
            <a className={style["special-link"]} rel="noopener nofollow" target="_blank">
              Vacation.com
            </a>
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default React.memo(FooterComponent);
