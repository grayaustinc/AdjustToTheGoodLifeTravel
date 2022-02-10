//node_modules
import React, { FunctionComponent } from "react";
import { FormikContextType } from "formik";
import { FormControl, FloatingLabel, FormGroup } from "react-bootstrap";

//types
import type { TestimonialSchemaType } from "src/templates/api/admin/db/testimonial/upsert/validation";

interface NameFormikProps {
  formik: FormikContextType<TestimonialSchemaType>;
}

const DescriptionComponent: FunctionComponent<NameFormikProps> = ({ formik }) => {
  const description = (formik.values.description || "").replace(/[\n\r]+/g, "");

  return (
    <>
      <h2 className="ms-1">
        <span>Testimonial Description</span>
      </h2>
      <FormGroup>
        <FloatingLabel label="Testimonial Description">
          <FormControl
            as="textarea"
            style={{ height: "150px", resize: "none" }}
            type="text"
            placeholder="Testimonial Description"
            name="description"
            value={description}
            onChange={formik.handleChange}
            isValid={formik.touched.description && !formik.errors.description}
            isInvalid={!!formik.errors.description}
          />
        </FloatingLabel>
        <FormControl.Feedback>Looks good!</FormControl.Feedback>
      </FormGroup>
    </>
  );
};

export default React.memo(DescriptionComponent);
