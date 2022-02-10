//node_modules
import React, { FunctionComponent } from "react";
import { FormikContextType } from "formik";
import { FormControl, FloatingLabel, FormGroup } from "react-bootstrap";

//types
import type { UserSchemaType } from "src/templates/api/admin/db/user/update/validation";

interface PasswordFormikProps {
  formik: FormikContextType<UserSchemaType>;
}

const PasswordComponent: FunctionComponent<PasswordFormikProps> = ({ formik }) => {
  const password = formik.values.password || "";

  return (
    <>
      <h2 className="ms-1">
        <span>Password</span>
      </h2>
      <FormGroup>
        <FloatingLabel label="Password">
          <FormControl type="text" placeholder="Password" name="password" value={password} onChange={formik.handleChange} disabled />
        </FloatingLabel>
      </FormGroup>
    </>
  );
};

export default React.memo(PasswordComponent);
