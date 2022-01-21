//node_modules
import React, { FunctionComponent } from "react";
import { FormikContextType } from "formik";
import { FormControl, FloatingLabel, FormGroup } from "react-bootstrap";

//types
import type { LocationSchemaType } from "src/templates/api/admin/db/location/upsert/validation";

interface NameFormikProps {
  formik: FormikContextType<LocationSchemaType>;
}

const NameComponent: FunctionComponent<NameFormikProps> = ({ formik }) => {
  const name = formik.values.name || "";

  return (
    <>
      <h2 className="ms-1">
        <span>Location Name</span>
      </h2>
      <FormGroup>
        <FloatingLabel label="Location Name">
          <FormControl
            type="text"
            placeholder="Location Name"
            name="name"
            value={name}
            onChange={formik.handleChange}
            isValid={formik.touched.name && !formik.errors.name}
            isInvalid={!!formik.errors.name}
          />
        </FloatingLabel>
        <FormControl.Feedback>Looks good!</FormControl.Feedback>
      </FormGroup>
    </>
  );
};

export default React.memo(NameComponent);
