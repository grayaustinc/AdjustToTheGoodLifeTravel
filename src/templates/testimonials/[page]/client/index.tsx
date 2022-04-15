//node_modules
import React from "react";
import { NextPage } from "next";
import { Container, Row } from "react-bootstrap";

//pages
import { PageProps } from "../types";

//layout
import SiteLayout from "src/layouts/site-layout";

//locals
import TestimonialComponent from "./components/testimonial-component";
import PagingComponent from "./components/router-component";
import MetaComponent from "./meta";

//styles
import { headClassName } from "src/styles/modules/head";

const AboutTestimonialsPage: NextPage<PageProps> = ({ testimonials, page, total }) => {
  return (
    <SiteLayout>
      <MetaComponent />
      <Container>
        <h1 className={`${headClassName} text-center my-5`}>Testimonials</h1>
        <Row className="justify-content-center">
          {testimonials.map((testimonial) => (
            <TestimonialComponent key={testimonial._key} testimonial={testimonial} />
          ))}
        </Row>
        <PagingComponent page={page} total={total} />
      </Container>
    </SiteLayout>
  );
};

export default AboutTestimonialsPage;
