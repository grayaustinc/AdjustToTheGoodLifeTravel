//node_modules
import React from "react";
import { NextComponentType } from "next";
import { Container, Accordion } from "react-bootstrap";

//components
import HeaderComponent from "src/components/header-component";
import FooterComponent from "src/components/footer-component";

//locals
import MetaComponent from "./meta";

//data
import data from "./faq";

//style
import style from "./f.module.scss";

const FaqPage: NextComponentType<any, any, any> = () => {
  return (
    <>
      <MetaComponent />
      <HeaderComponent />
      <Container className="my-5">
        <h1 className="text-center mb-4">Frequently Asked Questions</h1>
        <Accordion>
          {data.map((item, i) => (
            <Accordion.Item key={i} eventKey={String(i)}>
              <Accordion.Header>
                <span className={style["h"]}>{item.title}</span>
              </Accordion.Header>
              {item.text.map((text, j) => (
                <Accordion.Body key={j} className={style["b"]}>
                  {text}
                </Accordion.Body>
              ))}
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
      <div className="my-auto" />
      <FooterComponent />
    </>
  );
};

export default FaqPage;
