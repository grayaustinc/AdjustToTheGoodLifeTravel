//node_modules
import React, { FunctionComponent, useState } from "react";
import { Card, Form, FloatingLabel } from "react-bootstrap";
import { useFormik } from "formik";
import { useRouter } from "next/router";

//alert
import AlertComponent from "src/contexts/error-alert/alert-component";
import useMakeAlert from "src/contexts/error-alert/useMakeAlert";

//components
import SubmitButton from "src/components/submit-button";

//api
import loginFetch from "src/templates/api/admin/login/client";
import loginSchema from "src/templates/api/admin/login/validation";

const AdminLoginPage: FunctionComponent = () => {
  const router = useRouter();
  const makeAlert = useMakeAlert();
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    validationSchema: loginSchema,
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async function (values) {
      setSubmitting(true);
      try {
        const data = await loginFetch(values);
        if (data.ok) {
          router.push("/admin/");
        } else {
          setSubmitting(false);
          makeAlert(data.message);
        }
      } catch (error: any) {
        setSubmitting(false);
        makeAlert(error?.message || "An unknown error occurred");
      }
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <Card.Body>
          <Card.Title as="h1" className="text-center mb-5">
            Admin Login
          </Card.Title>
          <AlertComponent />
          <FloatingLabel className="my-4" controlId="login-username" label="Username">
            <Form.Control
              type="username"
              name="username"
              placeholder="Enter Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              isValid={formik.touched.username && !formik.errors.username}
              isInvalid={!!formik.errors.username}
              required
            />
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">A Username is required</Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel className="my-4" controlId="login-password" label="Password">
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              isValid={formik.touched.password && !formik.errors.password}
              isInvalid={!!formik.errors.password}
              required
            />
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">A password is required</Form.Control.Feedback>
          </FloatingLabel>
        </Card.Body>
        <div className="m-2 d-grid gap-2">
          <SubmitButton variant="primary" className="p-2" submitting={submitting}>
            <b>Login</b>
          </SubmitButton>
        </div>
      </Card>
    </Form>
  );
};

export default AdminLoginPage;
