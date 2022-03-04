//node_modules
import React, { FunctionComponent, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Container, Form } from "react-bootstrap";
import { useFormik } from "formik";

//alert
import AlertComponent from "src/contexts/error-alert/alert-component";
import useMakeAlert from "src/contexts/error-alert/useMakeAlert";

//formik
import OldPasswordComponent from "./formik/old-password-component";
import NewPasswordComponent from "./formik/new-password-component";

//components
import SubmitButton from "src/components/submit-button";

//schema
import schema, { ChangePasswordSchemaType } from "src/templates/api/admin/account/change-password/validation";

//api
import createUser from "src/templates/api/admin/account/change-password/client";

const initialValues: ChangePasswordSchemaType = {
  oldPassword: "",
  newPassword: "",
};

const UserModifierComponent: FunctionComponent = () => {
  const [submitting, setSubmitting] = useState(false);
  const setAlert = useMakeAlert();

  const onSubmit = useCallback(
    async (values: ChangePasswordSchemaType) => {
      setSubmitting(true);
      try {
        const response = await createUser(values);
        if (response.ok) {
          window.alert("Password changed successfully!");
          setAlert();
          setSubmitting(false);
        } else {
          setSubmitting(false);
          setAlert(`Failed to change password: ${response.message}`);
        }
      } catch (error: any) {
        setSubmitting(false);
        setAlert(`Failed to change password: ${error?.message || "Unknown error"}`);
      }
    },
    [setAlert]
  );

  const formik = useFormik<ChangePasswordSchemaType>({
    initialValues: initialValues,
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  return (
    <Container className="my-3">
      <AlertComponent />
      <Form noValidate onSubmit={formik.handleSubmit}>
        <OldPasswordComponent formik={formik} />
        <hr className="my-4" />
        <NewPasswordComponent formik={formik} />
        <hr className="my-4" />
        <div>
          <SubmitButton submitting={submitting}>Change Password</SubmitButton>
        </div>
      </Form>
    </Container>
  );
};

export default React.memo(UserModifierComponent);
