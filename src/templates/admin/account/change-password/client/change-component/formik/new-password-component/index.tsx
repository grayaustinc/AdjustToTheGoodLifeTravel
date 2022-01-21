//node_modules
import React, { FunctionComponent } from "react";
import { FormikContextType } from "formik";
import { FormControl, FloatingLabel, FormGroup } from "react-bootstrap";

//types
import type { ChangePasswordSchemaType } from "src/templates/api/admin/account/change-password/validation";

interface NewPasswordFormikProps {
  formik: FormikContextType<ChangePasswordSchemaType>;
}

const NewPasswordComponent: FunctionComponent<NewPasswordFormikProps> = ({ formik }) => {
  const newPassword = formik.values.newPassword || "";

  return (
    <>
      <h2 className="ms-1">
        <span>New Password</span>
      </h2>
      <FormGroup>
        <FloatingLabel label="Old Password">
          <FormControl
            type="password"
            autoComplete="new-password"
            placeholder="NewPassword"
            name="newPassword"
            value={newPassword}
            onChange={formik.handleChange}
            isValid={formik.touched.newPassword && !formik.errors.newPassword}
            isInvalid={!!formik.errors.newPassword}
          />
        </FloatingLabel>
        <FormControl.Feedback>Looks good!</FormControl.Feedback>
      </FormGroup>
    </>
  );
};

export default React.memo(NewPasswordComponent);
