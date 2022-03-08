//node_modules
import React from "react";
import { NextComponentType } from "next";
import { Container, Accordion } from "react-bootstrap";

//layout
import SiteLayout from "src/layouts/site-layout";

//locals
import MetaComponent from "./meta";

//data
import data from "./faq";

//style
import style from "./f.module.scss";

const FaqPage: NextComponentType<any, any, any> = () => {
  return (
    <SiteLayout>
      <MetaComponent />
      <Container className="my-5">
        <h1 className="text-center mb-4">Frequently Asked Questions</h1>
        <Accordion>
          {data.map((item, i) => (
            <Accordion.Item key={i} eventKey={String(i)}>
              <Accordion.Header>
                <span className={style["h"]}>{item.title}</span>
              </Accordion.Header>
              <Accordion.Body className={style["b"]}>
                {item.text.map((text, j) => (
                  <p key={j}>{text}</p>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </SiteLayout>
  );
};

export default FaqPage;
