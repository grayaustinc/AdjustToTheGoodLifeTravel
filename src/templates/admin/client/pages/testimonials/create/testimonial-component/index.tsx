//node_modules
import React, { FunctionComponent, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import defaults from "lodash/defaults";

//alert
import AlertComponent from "src/contexts/error-alert/alert-component";
import useMakeAlert from "src/contexts/error-alert/useMakeAlert";

//formik
import TitleComponent from "./formik/title-component";
import DescriptionComponent from "./formik/description-component";
import ReviewerComponent from "./formik/reviewer-component";
import LocationsComponent from "./formik/locations-component";
import RatingComponent from "./formik/rating-component";

//components
import SubmitButton from "src/components/submit-button";

//schema
import schema, { TestimonialSchemaType } from "src/templates/api/admin/db/testimonial/upsert/validation";

//api
import upsertTestimonial from "src/templates/api/admin/db/testimonial/upsert/client";

//types
import type { TestimonialDocumentData } from "libs/arangodb/collections/testimonials";

interface TestimonialModifierProps {
  testimonial?: TestimonialDocumentData;
  setTestimonial: (testimonial: TestimonialDocumentData) => void;
}

function getInitialValues(value?: TestimonialDocumentData) {
  const defaultValue: TestimonialSchemaType = {
    _key: undefined,
    title: "",
    rating: 0,
    description: "",
    reviewer: "",
    locations: "",
  };
  return defaults(value, defaultValue);
}

const TestimonialModifierComponent: FunctionComponent<TestimonialModifierProps> = ({ testimonial, setTestimonial }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const makeAlert = useMakeAlert();

  const onSubmit = useCallback(
    async (values: TestimonialSchemaType) => {
      setSubmitting(true);
      try {
        const response = await upsertTestimonial(values);
        if (response.ok) {
          setTestimonial(response.testimonial);
          router.push(`/admin/testimonials/create/${response.testimonial._key}/`);
          setSubmitting(false);
        } else {
          setSubmitting(false);
          makeAlert(`Failed to create testimonial: ${response.message}`);
        }
      } catch (error: any) {
        setSubmitting(false);
        makeAlert(`Failed to create testimonial: ${error?.message || "Unknown error"}`);
      }
    },
    [makeAlert]
  );

  const formik = useFormik<TestimonialSchemaType>({
    initialValues: getInitialValues(testimonial),
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  return (
    <Container className="my-3">
      <AlertComponent />
      <Form noValidate onSubmit={formik.handleSubmit}>
        <TitleComponent formik={formik} />
        <hr className="my-4" />
        <RatingComponent formik={formik} />
        <hr className="my-4" />
        <DescriptionComponent formik={formik} />
        <hr className="my-4" />
        <ReviewerComponent formik={formik} />
        <hr className="my-4" />
        <LocationsComponent formik={formik} />
        <hr className="my-4" />
        <div>
          <SubmitButton submitting={submitting}>Save Testimonial</SubmitButton>
        </div>
      </Form>
    </Container>
  );
};

export default React.memo(TestimonialModifierComponent);
