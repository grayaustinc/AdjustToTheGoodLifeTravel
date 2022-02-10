//node_modules
import React, { FunctionComponent } from "react";
import { FormikContextType } from "formik";
import { FormControl, FloatingLabel, FormGroup } from "react-bootstrap";

//types
import type { TestimonialSchemaType } from "src/templates/api/admin/db/testimonial/upsert/validation";

interface LocationsFormikProps {
  formik: FormikContextType<TestimonialSchemaType>;
}

const LocationsComponent: FunctionComponent<LocationsFormikProps> = ({ formik }) => {
  const locations = formik.values.locations || "";

  return (
    <>
      <h2 className="ms-1">
        <span>Testimonial Locations</span>
      </h2>
      <FormGroup>
        <FloatingLabel label="Testimonial Locations">
          <FormControl
            type="text"
            placeholder="Testimonial Locations"
            name="locations"
            value={locations}
            onChange={formik.handleChange}
            isValid={formik.touched.locations && !formik.errors.locations}
            isInvalid={!!formik.errors.locations}
          />
        </FloatingLabel>
        <FormControl.Feedback>Looks good!</FormControl.Feedback>
      </FormGroup>
    </>
  );
};

export default React.memo(LocationsComponent);
