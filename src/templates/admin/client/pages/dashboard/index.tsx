import React, { FunctionComponent } from "react";
import getConfig from "next/config";
import { Container, Row } from "react-bootstrap";

//components
import CardComponent from "./components/card-component";

//images
import matomo from "src/images/admin/fd5e4dd62090f46f1e6fb37075a92e02.png";
import arango from "src/images/admin/c3f38111eaeef6c3a0714c52d28984f3.png";
import minio from "src/images/admin/5c24e7851b5cbfdf71c4e44342f06133.png";
import email from "src/images/admin/c09b534a6250ef549f8233038704f810.png";

const { publicRuntimeConfig } = getConfig();
const { WEBSITE_EMAIL_DOMAIN, WEBSITE_ANALYTICS_DOMAIN, WEBSITE_S3_DOMAIN, WEBSITE_DATABASE_DOMAIN } = publicRuntimeConfig;

const AdminDashboardPage: FunctionComponent<any> = () => {
  return (
    <Container className="my-3">
      <div className="text-center">
        <h1>Welcome to the Admin Dashboard</h1>
        <Container>
          <Row className="justify-content-center">
            <CardComponent src={email} alt="mail link" href={WEBSITE_EMAIL_DOMAIN} text="MxRoute Mail Server" />
            <CardComponent src={matomo} alt="matomo link" href={WEBSITE_ANALYTICS_DOMAIN} text="Matomo Analytics" />
            <CardComponent src={minio} alt="minio link" href={WEBSITE_S3_DOMAIN} text="Minio Storage" />
            <CardComponent src={arango} alt="arango link" href={WEBSITE_DATABASE_DOMAIN} text="ArangoDB Database" />
          </Row>
        </Container>
      </div>
    </Container>
  );
};

export default React.memo(AdminDashboardPage);
