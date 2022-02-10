//node_modules
import React, { FunctionComponent } from "react";
import { FormikContextType } from "formik";
import { FormControl, FloatingLabel, FormGroup } from "react-bootstrap";

//types
import type { UserSchemaType } from "src/templates/api/admin/db/user/update/validation";

interface UsernameFormikProps {
  formik: FormikContextType<UserSchemaType>;
}

const UsernameComponent: FunctionComponent<UsernameFormikProps> = ({ formik }) => {
  const username = formik.values.username || "";

  return (
    <>
      <h2 className="ms-1">
        <span>Username</span>
      </h2>
      <FormGroup>
        <FloatingLabel label="Username">
          <FormControl type="text" placeholder="Username" name="username" value={username} onChange={formik.handleChange} disabled />
        </FloatingLabel>
        <FormControl.Feedback>Looks good!</FormControl.Feedback>
      </FormGroup>
    </>
  );
};

export default React.memo(UsernameComponent);
