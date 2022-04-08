import React, { FunctionComponent } from "react";
import { Col, Card } from "react-bootstrap";
import NextImage, { StaticImageData } from "next/image";
import NextLink from "next/link";

//helpers
import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";
const defaultSizes = getBootstrapSizes(256, 256, 256, 256, 256, 256);

//styles
import { blackLinkClassName } from "src/styles/modules/link";

interface CardProps {
  src: StaticImageData;
  alt: string;
  href: string;
  text: string;
}

const CardComponent: FunctionComponent<CardProps> = ({ src, alt, href, text }) => {
  return (
    <Col className="my-2" style={{ minWidth: "300px", maxWidth: "300px" }}>
      <Card>
        <Card.Body>
          <NextImage src={src} alt={alt} sizes={defaultSizes} quality={50} layout="responsive" objectFit="contain" />
          <NextLink href={href} passHref>
            <a className={blackLinkClassName} target="_blank">
              {text}
            </a>
          </NextLink>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default React.memo(CardComponent);
