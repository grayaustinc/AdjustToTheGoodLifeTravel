//node_modules
import React from "react";
import { NextComponentType } from "next";
import { Container, ListGroup } from "react-bootstrap";

//components
import HeaderComponent from "src/components/header-component";
import FooterComponent from "src/components/footer-component";

//locals
import MetaComponent from "./meta";

//data
import data from "./data";

//style
import style from "./f.module.scss";

const ServicesPage: NextComponentType<any, any, any> = () => {
  return (
    <>
      <MetaComponent />
      <HeaderComponent />
      <Container className="my-5">
        <h1 className="text-center mb-4">Services We Provide</h1>
        <ListGroup>
          {data.map((item, i) => (
            <ListGroup.Item key={i} className={style["h"]}>
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
      <div className="my-auto" />
      <FooterComponent />
    </>
  );
};

export default ServicesPage;
