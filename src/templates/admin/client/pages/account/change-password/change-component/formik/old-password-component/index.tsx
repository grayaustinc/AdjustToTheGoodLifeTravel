//node_modules
import React, { FunctionComponent } from "react";
import { FormikContextType } from "formik";
import { FormControl, FloatingLabel, FormGroup } from "react-bootstrap";

//types
import type { ChangePasswordSchemaType } from "src/templates/api/admin/account/change-password/validation";

interface OldPasswordFormikProps {
  formik: FormikContextType<ChangePasswordSchemaType>;
}

const OldPasswordComponent: FunctionComponent<OldPasswordFormikProps> = ({ formik }) => {
  const oldPassword = formik.values.oldPassword || "";

  return (
    <>
      <h2 className="ms-1">
        <span>Old Password</span>
      </h2>
      <FormGroup>
        <FloatingLabel label="Old Password">
          <FormControl
            type="password"
            autoComplete="current-password"
            placeholder="OldPassword"
            name="oldPassword"
            value={oldPassword}
            onChange={formik.handleChange}
            isValid={formik.touched.oldPassword && !formik.errors.oldPassword}
            isInvalid={!!formik.errors.oldPassword}
          />
        </FloatingLabel>
        <FormControl.Feedback>Looks good!</FormControl.Feedback>
      </FormGroup>
    </>
  );
};

export default React.memo(OldPasswordComponent);
