//node_modules
import React from "react";
import { NextComponentType } from "next";
import { Container, Row } from "react-bootstrap";

//pages
import { PageProps } from "../types";

//components
import HeaderComponent from "src/components/header-component";
import FooterComponent from "src/components/footer-component";

//locals
import TestimonialComponent from "./components/testimonial-component";
import PagingComponent from "./components/router-component";
import MetaComponent from "./meta";

const AboutTestimonialsPage: NextComponentType<any, any, PageProps> = ({ testimonials, page, total }) => {
  return (
    <>
      <MetaComponent />
      <HeaderComponent />
      <Container>
        <h1 className="text-center my-5">TESTIMONIALS</h1>
        <Row className="justify-content-center">
          {testimonials.map((testimonial) => (
            <TestimonialComponent key={testimonial._key} testimonial={testimonial} />
          ))}
        </Row>
        <PagingComponent page={page} total={total} />
      </Container>
      <div className="my-auto" />
      <FooterComponent />
    </>
  );
};

export default AboutTestimonialsPage;
