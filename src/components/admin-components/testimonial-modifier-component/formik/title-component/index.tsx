//node_modules
import React, { FunctionComponent } from "react";
import { FormikContextType } from "formik";
import { FormControl, FloatingLabel, FormGroup } from "react-bootstrap";

//types
import type { TestimonialSchemaType } from "src/templates/api/admin/db/testimonial/upsert/validation";

interface TitleFormikProps {
  formik: FormikContextType<TestimonialSchemaType>;
}

const TitleComponent: FunctionComponent<TitleFormikProps> = ({ formik }) => {
  const title = formik.values.title || "";

  return (
    <>
      <h2 className="ms-1">
        <span>Testimonial Title</span>
      </h2>
      <FormGroup>
        <FloatingLabel label="Testimonial Title">
          <FormControl
            type="text"
            placeholder="Testimonial Title"
            name="title"
            value={title}
            onChange={formik.handleChange}
            isValid={formik.touched.title && !formik.errors.title}
            isInvalid={!!formik.errors.title}
          />
        </FloatingLabel>
        <FormControl.Feedback>Looks good!</FormControl.Feedback>
      </FormGroup>
    </>
  );
};

export default React.memo(TitleComponent);
