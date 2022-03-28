//import node_modules
import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Tooltip, Nav, Overlay, Container, Row, Col } from "react-bootstrap";

//types
import type { RecommendationBlogDocumentData } from "src/templates/blog/[slug]/types";

//components
import BlogPreviewComponent from "./blog-preview-component";

//styles
import style from "src/templates/blog/[slug]/client/blog.module.scss";

interface RecommendationBlogsProps {
  recommendations: RecommendationBlogDocumentData[];
}

const RecommendationBlogsComponent: FunctionComponent<RecommendationBlogsProps> = ({ recommendations }) => {
  return (
    <Container className="my-3">
      <div className={style["header"]}>More From AdjustToTheGoodLifeTravel</div>
      <Row className="justify-content-center">
        {recommendations.map((recommendation) => (
          <Col sm={12} md={6} xl={4} key={recommendation.slug}>
            <BlogPreviewComponent recommendation={recommendation} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default React.memo(RecommendationBlogsComponent);
