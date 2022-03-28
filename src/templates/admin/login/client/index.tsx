//node_modules
import React from "react";
import { NextPage } from "next";
import NextImage from "next/image";
import { Container, Row, Col } from "react-bootstrap";

//alert
import AlertProvider from "src/contexts/error-alert/alert-provider";

//components
import FormComponent from "./form-component";

//images
import image from "src/images/97b9375cf75ade65090bccc8c8ef5884.png";

//styles
import style from "./login.module.scss";

const AdminLoginPage: NextPage<any> = () => {
  return (
    <div className={style["wrapper"]}>
      <NextImage src={image} alt="Login Background" layout="fill" objectFit="cover" quality={100} />
      <div className="d-flex flex-grow-1 align-items-center">
        <Container>
          <Row>
            <Col md={9} lg={8} xl={6} className="mx-auto">
              <AlertProvider>
                <FormComponent />
              </AlertProvider>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AdminLoginPage;
