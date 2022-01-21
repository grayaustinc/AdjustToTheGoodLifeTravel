//node_modules
import React, { FunctionComponent } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Link from "next/link";

//components
import NextImageComponent from "src/components/next-image-component";

import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";
const sizes = getBootstrapSizes(640, 640, 640, 256, 384, 384);

//styles
import style from "../../styles/press.module.scss";

//types
import type { MentionDocumentData } from "libs/arangodb/collections/mentions";

interface CardProps {
  mention: MentionDocumentData;
}

const MentionTitleComponent: FunctionComponent<CardProps> = ({ mention }) => {
  if (mention.title) {
    if (mention.url) {
      return (
        <Link href={mention.url} passHref>
          <a className={style["title"]}>
            <Card.Title>{mention.title}</Card.Title>
          </a>
        </Link>
      );
    }
    return <Card.Title>{mention.title}</Card.Title>;
  }
  return <></>;
};

const MentionComponent: FunctionComponent<CardProps> = ({ mention }) => {
  return (
    <Col md={6} xl={4} className="d-flex">
      <Card className={style["mention"]}>
        <NextImageComponent data={mention.image} sizes={sizes} />
        <Card.Body>
          <MentionTitleComponent mention={mention} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default React.memo(MentionComponent);
