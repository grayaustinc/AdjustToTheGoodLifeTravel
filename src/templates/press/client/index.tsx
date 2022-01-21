//import node_modules
import React from "react";
import { NextComponentType } from "next";
import { Container, Row } from "react-bootstrap";

//import pages
import { PageProps } from "../types";

//components
import HeaderComponent from "src/components/header-component";
import FooterComponent from "src/components/footer-component";

//locals
import MetaComponent from "./meta";
import MentionComponent from "./components/mention-component";

//styles
import style from "./styles/press.module.scss";

const PressPage: NextComponentType<any, any, PageProps> = ({ mentions }) => {
  return (
    <>
      <MetaComponent />
      <HeaderComponent />
      <Container className="my-5">
        <h1 className={style["header"]}>Mentions in the Press</h1>
        <div className={style["subheader"]}>Who's mentioned Us? Here is a list of our mentions online!</div>
        <Row className="justify-content-center mt-4">
          {mentions.map((mention, i) => (
            <MentionComponent key={mention.title || i} mention={mention} />
          ))}
        </Row>
      </Container>
      <div className="my-auto" />
      <FooterComponent />
    </>
  );
};

export default PressPage;
