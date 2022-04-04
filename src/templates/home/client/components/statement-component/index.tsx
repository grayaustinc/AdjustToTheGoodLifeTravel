//node_modules
import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";

//TODO possibly keep/remove/edit
const StatementComponent: FunctionComponent = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center">TRAVEL PLANNING</h1>
      <div className="mt-5">
        <p className="text-center">Some brand Statement goes here?</p>
      </div>
    </Container>
  );
};

export default React.memo(StatementComponent);
