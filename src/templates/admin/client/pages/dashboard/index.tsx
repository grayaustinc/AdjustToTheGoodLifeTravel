import React, { FunctionComponent } from "react";
import { Container, Row } from "react-bootstrap";

//components
import CardComponent from "./components/card-component";

//images
import matomo from "src/images/admin/fd5e4dd62090f46f1e6fb37075a92e02.png";
import arango from "src/images/admin/c3f38111eaeef6c3a0714c52d28984f3.png";
import minio from "src/images/admin/5c24e7851b5cbfdf71c4e44342f06133.png";
import gmail from "src/images/admin/3d338bf9ed416194be345914aed14f18.png";

//TODO make hrefs into env?
//TODO gmail server needs setup
const AdminDashboardPage: FunctionComponent<any> = () => {
  return (
    <Container className="my-3">
      <div className="text-center">
        <h1>Welcome to the Admin Dashboard</h1>
        <Container>
          <Row className="justify-content-center">
            <CardComponent src={gmail} alt="gmail link" href="https://mail.adjusttothegoodlifetravel.com/" text="Gmail Mail Server" />
            <CardComponent src={matomo} alt="matomo link" href="https://matomo.adjusttothegoodlifetravel.com/" text="Matomo Analytics" />
            <CardComponent src={minio} alt="minio link" href="https://minio.adjusttothegoodlifetravel.com/" text="Minio Storage" />
            <CardComponent src={arango} alt="arango link" href="https://arango.adjusttothegoodlifetravel.com/" text="ArangoDB Database" />
          </Row>
        </Container>
      </div>
    </Container>
  );
};

export default React.memo(AdminDashboardPage);
