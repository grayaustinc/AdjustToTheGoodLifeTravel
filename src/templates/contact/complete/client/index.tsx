//node_modules
import React from "react";
import { NextComponentType } from "next";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

//layout
import SiteLayout from "src/layouts/site-layout";

//locals
import MetaComponent from "./meta";

//styles
import style from "./complete.module.scss";

const ContactPage: NextComponentType<any, any, any> = (p) => {
  return (
    <SiteLayout>
      <MetaComponent />
      <div className="my-auto">
        <Container className="my-5">
          <h1 className={style["header"]}>MESSAGE WAS SENT!</h1>
          <div className="text-center">
            <FontAwesomeIcon size="8x" icon={faCheckCircle} color="#198754" />
          </div>
          <p className={style["text"]}>Thank you for contacting us, we will get back to you as soon as we can!</p>
        </Container>
      </div>
    </SiteLayout>
  );
};

export default ContactPage;
