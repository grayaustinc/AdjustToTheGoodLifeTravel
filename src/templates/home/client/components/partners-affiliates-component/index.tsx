import React, { FunctionComponent } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { Container, Row, Col } from "react-bootstrap";

//images
import image1 from "src/images/2f442c1023167de5813d7d411fea020c.png";
import image2 from "src/images/9ca4514f2bf536d3904dd3a06991b10d.png";
import image3 from "src/images/bfce67e0f980b160905a12f2e14079e8.png";
import image4 from "src/images/ace3ffcb6f677c8fdbe7d9bc82c46a26.png";
import image5 from "src/images/3df05ea2e42393bec9d96de9567e491d.png";
import image6 from "src/images/d36ba3450aaad06898c053c65ea05ac8.png";
import image7 from "src/images/700579fd78c998891a2362f488709a24.png";
import image8 from "src/images/d6bb46816fc973d6a4258bb6c51152d5.png";
import image9 from "src/images/9f9f946a0ceb99eedfcb8daa8662dbbc.png";
import image10 from "src/images/ae7c61ef659259bdf678cdbc10d147df.png";

//style
import style from "../../styles/home.module.scss";

const images = [
  { alt: "Askan Agent Logo", src: image1, quality: 25 },
  { alt: "Carnival Logo", src: image2, quality: 75 },
  { alt: "Cruise Line International Association Logo", src: image3, quality: 22 },
  { alt: "Dreams Logo", src: image4, quality: 80 },
  { alt: "Freestyle Specialist Logo", src: image5, quality: 25 },
  { alt: "Funjet Vacations Logo", src: image6, quality: 50 },
  { alt: "International Airlines Travel Agent Network Logo", src: image7, quality: 20 },
  { alt: "Master Agent Logo", src: image8, quality: 85 },
  { alt: "Now Resorts & Spas Logo", src: image9, quality: 75 },
  { alt: "Sandals Logo", src: image10, quality: 10 },
];

import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";

const sizes = getBootstrapSizes(96, 96, 96, 96, 96, 96);

const TravelPlanComponent: FunctionComponent = () => {
  return (
    <div className={`${style["bg-alt"]} border-top border-dark`}>
      <h1 className="text-center my-5">Travel Partners and Certifications:</h1>
      <div className="my-5 mx-3">
        <Row className="g-0 justify-content-center" sm={2}>
          {images.map((info, i) => {
            return (
              <Col key={i} sm={6} md={2} lg={1} className="m-2 justify-content-center" style={{ width: "112px", height: "112px" }}>
                <NextImage
                  src={info.src}
                  alt={info.alt}
                  className={style["rounded"]}
                  placeholder="blur"
                  sizes={sizes}
                  width="112px"
                  height="112px"
                  quality={info.quality}
                  layout="responsive"
                  objectFit="contain"
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default React.memo(TravelPlanComponent);
