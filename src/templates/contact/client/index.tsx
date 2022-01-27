//node_modules
import React from "react";
import { NextComponentType } from "next";
import Link from "next/link";
import { Row, Col, Button, Container, Tabs, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

//alerts
import AlertComponent from "src/contexts/error-alert/alert-component";
import AlertProvider from "src/contexts/error-alert/alert-provider";

//components
import HeaderComponent from "src/components/header-component";
import FooterComponent from "src/components/footer-component";

//locals
import FormComponent from "./components/form-component";
import MetaComponent from "./meta";

import styles from "./contact.module.scss";

//TODO update p text to something better? DM Sans?

const ContactPage: NextComponentType<any, any, any> = (p) => {
  return (
    <>
      <MetaComponent />
      <HeaderComponent />
      <div className="mt-3 mb-auto">
        <Container className="my-3">
          <h1 className="text-center my-3" /*//TODO change text here as it is copied */>TELL US WHAT YOU ENVISION FOR YOUR TRAVEL EXPERIENCE</h1>
          <p className={`text-center mb-5 ${styles["p"]}`}>The more information we have, the better we can match you with the right advisor and ensure a successful experience.</p>
          <Row className="text-center g-0">
            <Col md={6} className="d-grid gap-2 border border-1 p-0">
              <Button variant="light" href="tel:+1-919-810-3743">
                <FontAwesomeIcon size="2x" icon={faPhone} />
                <h2>Contact by Phone</h2>
                <p>1(919) 810-3743</p>
              </Button>
            </Col>
            <Col md={6} className="d-grid gap-2 border border-1 p-0">
              <Button variant="light" href="mailto:stacygray@adjusttothegoodlifetravel.com">
                <FontAwesomeIcon size="2x" icon={faEnvelope} />
                <h2>Contact by Email</h2>
                <p>stacygray@adjusttothegoodlifetravel.com</p>
              </Button>
            </Col>
          </Row>
          <AlertProvider>
            <AlertComponent />
            <FormComponent />
          </AlertProvider>
        </Container>
        <div className="my-auto" />
      </div>
      <FooterComponent />
    </>
  );
};

export default ContactPage;
