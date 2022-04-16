//node_modules
import { useFormik } from "formik";
import React, { FunctionComponent, ChangeEvent, useState, useCallback } from "react";
import { Form, FloatingLabel, Row, Col, Card } from "react-bootstrap";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import capitalize from "lodash/capitalize";
import { phone } from "phone";

//alerts
import useMakeAlert from "src/contexts/error-alert/useMakeAlert";

//components
import SubmitButton from "src/components/submit-button";

import CountryCodeComponent from "./country-code-component";

//api
import createContact from "src/templates/api/contact/client";
import { contacts, ContactSchemaType, getFormikValidate } from "src/templates/api/contact/validation";

const initialValues: ContactSchemaType = {
  fullname: "",
  phone: "",
  email: "",
  contact: contacts[0],
  message: "",
};

interface PropsType {
  setSubmitted: (value: boolean) => void;
}

const FormComponent: FunctionComponent<PropsType> = ({ setSubmitted }) => {
  const makeAlert = useMakeAlert();
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState("USA");

  const onSubmit = useCallback(async (values: ContactSchemaType) => {
    setSubmitting(true);
    try {
      const response = await createContact(values);
      if (response.ok) {
        setSubmitted(true);
      } else {
        setSubmitting(false);
        makeAlert(`Failed to submit: ${response.message}`);
      }
    } catch (error: any) {
      setSubmitting(false);
      makeAlert(`Failed to submit: ${error?.message || "Unknown error"}`);
    }
  }, []);

  const formik = useFormik<ContactSchemaType>({
    validate: getFormikValidate(code),
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  const handlePhone = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const result = phone(raw, { country: code });
      formik.setFieldValue("phone", result.phoneNumber);
    },
    [formik, code]
  );

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <Card.Header className="text-center">
          <FontAwesomeIcon size="2x" icon={faInbox} />
          <h2 className="py-2">Contact by Form</h2>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col lg={6} style={{ alignSelf: "center" }}>
              <FloatingLabel className="my-4" controlId="contact-fullname" label="Full Name">
                <Form.Control
                  type="text"
                  name="fullname"
                  placeholder="Enter Full Name"
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  isValid={formik.touched.fullname && !formik.errors.fullname}
                  isInvalid={!!formik.errors.fullname}
                  required
                />
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">A full name is required</Form.Control.Feedback>
              </FloatingLabel>
              <CountryCodeComponent value={code} onChange={setCode} />
              <FloatingLabel className="my-4" controlId="contact-phone" label="Phone Number">
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formik.values.phone}
                  onChange={handlePhone}
                  isValid={formik.touched.phone && !formik.errors.phone}
                  isInvalid={!!formik.errors.phone}
                  required
                />
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">A valid phone number is required</Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel className="my-4" controlId="contact-email" label="Email Address">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  isValid={formik.touched.email && !formik.errors.email}
                  isInvalid={!!formik.errors.email}
                  required
                />
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">A valid email is required</Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel className="my-4" controlId="contact-contact" label="Preferred Contact">
                <Form.Select
                  name="contact"
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                  isValid={formik.touched.contact && !formik.errors.contact}
                  isInvalid={!!formik.errors.contact}
                  required
                >
                  {contacts.map((contact) => {
                    return (
                      <option key={contact} value={contact}>
                        {capitalize(contact)}
                      </option>
                    );
                  })}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col lg={6} className="d-flex">
              <FloatingLabel className="my-4 flex-grow-1" controlId="contact-message" label="Message">
                <Form.Control
                  as="textarea"
                  name="message"
                  value={formik.values.message || ""}
                  onChange={formik.handleChange}
                  isValid={formik.touched.message && !formik.errors.message}
                  isInvalid={!!formik.errors.message}
                  style={{ resize: "none", height: "100%", minHeight: "256px" }}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Card.Body>
        <div className="d-grid g-2">
          <SubmitButton className="mb-2 mx-3" variant="primary" size="lg" submitting={submitting}>
            Submit Form
          </SubmitButton>
        </div>
      </Card>
    </Form>
  );
};

export default FormComponent;
