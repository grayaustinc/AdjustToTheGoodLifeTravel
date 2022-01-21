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
import schema, { UserSchemaType } from "src/templates/api/admin/db/user/update/validation";

//api
import updateUser from "src/templates/api/admin/db/user/update/client";

//types
import type { UserDocumentData } from "libs/arangodb/collections/users";

interface UserModifierProps {
  user: UserDocumentData;
  setUser: (value: UserDocumentData) => void;
}

const UserModifierComponent: FunctionComponent<UserModifierProps> = ({ user, setUser }) => {
  const [submitting, setSubmitting] = useState(false);
  const makeAlert = useMakeAlert();

  const onSubmit = useCallback(
    async (values: UserSchemaType) => {
      setSubmitting(true);
      try {
        const response = await updateUser(values);
        if (response.ok) {
          setUser(response.user);
          setSubmitting(false);
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
    initialValues: user,
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
          <SubmitButton submitting={submitting}>Update User</SubmitButton>
        </div>
      </Form>
    </Container>
  );
};

export default React.memo(UserModifierComponent);
