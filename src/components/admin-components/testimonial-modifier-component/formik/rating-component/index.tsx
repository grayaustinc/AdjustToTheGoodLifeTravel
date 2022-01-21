//node_modules
import React, { FunctionComponent } from "react";
import { FormikContextType } from "formik";
import { FormSelect, FormControl, FormGroup } from "react-bootstrap";
import times from "lodash/times";

//types
import type { TestimonialSchemaType } from "src/templates/api/admin/db/testimonial/upsert/validation";

interface TitleFormikProps {
  formik: FormikContextType<TestimonialSchemaType>;
}

const TitleComponent: FunctionComponent<TitleFormikProps> = ({ formik }) => {
  const rating = formik.values.rating || 0;

  return (
    <>
      <h2 className="ms-1">
        <span>Testimonial Rating</span>
      </h2>
      <FormGroup>
        <FormSelect name="rating" value={rating} onChange={formik.handleChange} isValid={formik.touched.rating && !formik.errors.rating} isInvalid={!!formik.errors.rating}>
          {times(11).map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </FormSelect>
        <FormControl.Feedback>Looks good!</FormControl.Feedback>
      </FormGroup>
    </>
  );
};

export default React.memo(TitleComponent);
