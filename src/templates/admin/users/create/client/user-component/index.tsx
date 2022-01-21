//node_modules
import React, { FunctionComponent, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Container, Form } from "react-bootstrap";
import { useFormik } from "formik";

//alert
import AlertComponent from "src/contexts/error-alert/alert-component";
import useMakeAlert from "src/contexts/error-alert/useMakeAlert";

//formik
import UsernameComponent from "./formik/username-component";
import PasswordComponent from "./formik/password-component";

//components
import SubmitButton from "src/components/submit-button";

//schema
import schema, { UserSchemaType } from "src/templates/api/admin/db/user/create/validation";

//api
import createUser from "src/templates/api/admin/db/user/create/client";

const initialValues: UserSchemaType = {
  username: "",
  password: "",
};

const UserModifierComponent: FunctionComponent = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const makeAlert = useMakeAlert();

  const onSubmit = useCallback(
    async (values: UserSchemaType) => {
      setSubmitting(true);
      try {
        const response = await createUser(values);
        if (response.ok) {
          router.push(`/admin/users/create/${response.user._key}/`);
        } else {
          setSubmitting(false);
          makeAlert(`Failed to create user: ${response.message}`);
        }
      } catch (error: any) {
        setSubmitting(false);
        makeAlert(`Failed to create user: ${error?.message || "Unknown error"}`);
      }
    },
    [makeAlert]
  );

  const formik = useFormik<UserSchemaType>({
    initialValues: initialValues,
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  return (
    <Container className="my-3">
      <AlertComponent />
      <Form noValidate onSubmit={formik.handleSubmit}>
        <UsernameComponent formik={formik} />
        <hr className="my-4" />
        <PasswordComponent formik={formik} />
        <hr className="my-4" />
        <div>
          <SubmitButton submitting={submitting}>Create User</SubmitButton>
        </div>
      </Form>
    </Container>
  );
};

export default React.memo(UserModifierComponent);
