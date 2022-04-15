import React, { FunctionComponent } from "react";
import NextImage from "next/image";
import { Container, Row, Col } from "react-bootstrap";

//images
import airlines_logo from "src/images/700579fd78c998891a2362f488709a24.png";
import sandals_certified_logo from "src/images/ae7c61ef659259bdf678cdbc10d147df.png";
import sandals_preferred_logo from "src/images/75620c18cdbe2039f6013c2966879e25.png";
import network_logo from "src/images/db5112e68994208e8461eefa4c30acd9.png";
import cruise_logo from "src/images/df32c1d52ce415eab1b200ab01a4921e.png";
import cruise_master_logo from "src/images/ca3adde2f8171f1f6fe6ba1fca20b6c0.png";
import cruise_accredited_logo from "src/images/0597b34887628d1444daa1efe54b8b5a.png";

//style
import style from "../../styles/home.module.scss";
import { headClassName } from "src/styles/modules/head";

const images = [
  { alt: "International Airlines Travel Agent Network Logo", src: airlines_logo, quality: 50 },
  { alt: "Cruise Lines International Association Logo", src: cruise_logo, quality: 75 },
  { alt: "Cruise Lines International Association Master Logo", src: cruise_master_logo, quality: 75 },
  { alt: "Cruise Lines International Association Accredited Logo", src: cruise_accredited_logo, quality: 75 },
  { alt: "TL Network Member Logo", src: network_logo, quality: 75 },
  { alt: "Sandals Certified Logo", src: sandals_certified_logo, quality: 25 },
  { alt: "Sandals Preferred Logo", src: sandals_preferred_logo, quality: 75 },
];

import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";

const sizes = getBootstrapSizes(96, 96, 96, 96, 96, 96);

const TravelPlanComponent: FunctionComponent = () => {
  return (
    <div className={`${style["bg-alt"]} border-top border-dark`}>
      <Container>
        <h2 className={`${headClassName} text-center my-5`}>
          <span className="d-block">Proud member of IATAN, CLIA, and Travel Leaders Network</span>
          <span className="d-block">and a few of our Credentials</span>
        </h2>
      </Container>
      <div className="my-5 mx-3">
        <Row className="g-0 justify-content-center" sm={2}>
          {images.map((info, i) => {
            return (
              <Col key={i} xs={6} md={2} lg={1} className={`${style["partners"]} p-2 justify-content-center`}>
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
