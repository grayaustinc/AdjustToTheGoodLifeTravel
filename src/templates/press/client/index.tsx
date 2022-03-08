//import node_modules
import React from "react";
import { NextComponentType } from "next";
import { Container, Row } from "react-bootstrap";

//import pages
import { PageProps } from "../types";

//layout
import SiteLayout from "src/layouts/site-layout";

//locals
import MetaComponent from "./meta";
import MentionComponent from "./components/mention-component";

//styles
import style from "./styles/press.module.scss";

const PressPage: NextComponentType<any, any, PageProps> = ({ mentions }) => {
  return (
    <SiteLayout>
      <MetaComponent />
      <Container className="my-5">
        <h1 className={style["header"]}>Mentions in the Press</h1>
        <div className={style["subheader"]}>Who's mentioned Us? Here is a list of our mentions online!</div>
        <Row className="justify-content-center mt-4">
          {mentions.map((mention, i) => (
            <MentionComponent key={mention.title || i} mention={mention} />
          ))}
        </Row>
      </Container>
    </SiteLayout>
  );
};

export default PressPage;
