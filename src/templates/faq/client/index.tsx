//node_modules
import React from "react";
import { NextPage } from "next";
import { Container } from "react-bootstrap";

//layout
import SiteLayout from "src/layouts/site-layout";

//locals
import MetaComponent from "./meta";

//data
import data from "./faq";

//style
import style from "./f.module.scss";
import { headClassName } from "src/styles/modules/head";

const FaqPage: NextPage<any> = () => {
  return (
    <SiteLayout>
      <MetaComponent />
      <Container className="my-5">
        <h1 className={`${headClassName} text-center mb-4`}>Frequently Asked Questions</h1>
        {data.map((entity, i) => (
          <section key={i} className="py-3">
            <header>
              <h2 className={style["h"]}>{entity.question}</h2>
            </header>
            <span className={style["b"]}>
              {entity.answer.map((text, j) => (
                <p key={j}>{text}</p>
              ))}
            </span>
          </section>
        ))}
      </Container>
    </SiteLayout>
  );
};

export default FaqPage;
