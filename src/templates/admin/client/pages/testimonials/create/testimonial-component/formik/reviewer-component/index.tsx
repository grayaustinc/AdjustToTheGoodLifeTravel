//node_modules
import React, { FunctionComponent } from "react";
import { FormikContextType } from "formik";
import { FormControl, FloatingLabel, FormGroup } from "react-bootstrap";

//types
import type { TestimonialSchemaType } from "src/templates/api/admin/db/testimonial/upsert/validation";

interface ReviewerFormikProps {
  formik: FormikContextType<TestimonialSchemaType>;
}

const ReviewerComponent: FunctionComponent<ReviewerFormikProps> = ({ formik }) => {
  const reviewer = formik.values.reviewer || "";

  return (
    <>
      <h2 className="ms-1">
        <span>Testimonial Reviewer</span>
      </h2>
      <FormGroup>
        <FloatingLabel label="Testimonial Reviewer">
          <FormControl
            type="text"
            placeholder="Testimonial Reviewer"
            name="reviewer"
            value={reviewer}
            onChange={formik.handleChange}
            isValid={formik.touched.reviewer && !formik.errors.reviewer}
            isInvalid={!!formik.errors.reviewer}
          />
        </FloatingLabel>
        <FormControl.Feedback>Looks good!</FormControl.Feedback>
      </FormGroup>
    </>
  );
};

export default React.memo(ReviewerComponent);
