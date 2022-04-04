//node_modules
import { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUpdateEffect } from "react-use";
import { faPhone, faEnvelope, faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";

//alerts
import AlertComponent from "src/contexts/error-alert/alert-component";
import AlertProvider from "src/contexts/error-alert/alert-provider";

//layout
import SiteLayout from "src/layouts/site-layout";

//locals
import FormComponent from "./components/form-component";
import MetaComponent from "./meta";

import styles from "./contact.module.scss";
import { blackLinkClassName } from "src/styles/modules/link";

const contactEmail = "contact@adjusttothegoodlifetravel.com";

const ContactPage: NextPage<any> = (props) => {
  const [submitted, setSubmitted] = useState(false);

  useUpdateEffect(() => {
    setSubmitted(false);
  }, [props]);

  if (submitted) {
    return (
      <SiteLayout>
        <MetaComponent />
        <div className="my-auto">
          <Container className="my-5">
            <h1 className={styles["header"]}>MESSAGE WAS SENT!</h1>
            <div className="text-center">
              <FontAwesomeIcon size="8x" icon={faEnvelopeCircleCheck} color="#198754" />
            </div>
            <div className={styles["text"]}>
              <p>Thank you very much for contacting us!</p>
              <p>
                We will look over your message and get back to you as soon a possible. In the meantime, feel free to view our latest{" "}
                <Link href="/blogs/">
                  <a className={blackLinkClassName}>blog posts</a>
                </Link>
                .
              </p>
            </div>
          </Container>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <MetaComponent />
      <div className="mt-3 mb-auto">
        <Container className="my-3">
          <h1 className="text-center my-3 text-uppercase">tell us what you envision for your travel journey</h1>
          <p className={`text-center mb-5 ${styles["p"]}`}>The more information we have, the better we can prepare your trip and ensure a successful experience!</p>
          <Row className="text-center g-0">
            <Col md={6} className="d-grid gap-2 border border-1 p-0">
              <Button variant="light" href="tel:+1-919-810-3743">
                <FontAwesomeIcon size="2x" icon={faPhone} />
                <h2>Contact by Phone</h2>
                <p>(919) 810-3743</p>
              </Button>
            </Col>
            <Col md={6} className="d-grid gap-2 border border-1 p-0">
              <Button variant="light" href={`mailto:${contactEmail}`}>
                <FontAwesomeIcon size="2x" icon={faEnvelope} />
                <h2>Contact by Email</h2>
                <p>{contactEmail}</p>
              </Button>
            </Col>
          </Row>
          <AlertProvider>
            <AlertComponent />
            <FormComponent setSubmitted={setSubmitted} />
          </AlertProvider>
        </Container>
      </div>
    </SiteLayout>
  );
};

export default ContactPage;
