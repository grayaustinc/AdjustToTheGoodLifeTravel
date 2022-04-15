//node_modules
import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";

//styles
import styles from "../../styles/home.module.scss";
import { headClassName } from "src/styles/modules/head";

//TODO cleanup?
const StatementComponent: FunctionComponent = () => {
  return (
    <Container className="my-5">
      <h2 className={`${headClassName} text-center`}>Travel with Us</h2>
      <div className={`${styles["modified-text"]} text-center mt-3`}>
        <p>
          Stacy Gray's extensive personal knowledge and experience has established her as Raleigh, N.C. best travel agency. Adjust to the Good Life Travel is a family owned travel
          agency founded in 2013 located in Raleigh NC. We specialize in planning honeymoon trips, family vacations, group travel, all inclusive vacations, cruises, African safaris
          and destination weddings. Creating tailor-made vacations to Hawaii, Alaska, Galapagos, Tahiti, Greece, Italy, Spain, Portugal, Norway, Iceland, Australia, New Zealand and
          many more.
        </p>
        <p>
          Our passion is to help you find and experience the most amazing dream vacations. We take the stress out of planning by taking care of all the details so you can relax and
          enjoy your escape vacation! We love creating tailor-made vacations and our valued clients get our first hand experience. Book your complimentary consultation today! We
          have the experience to help you make your travel dreams come true! Book your complimentary consultation today!
        </p>
      </div>
    </Container>
  );
};

export default React.memo(StatementComponent);
