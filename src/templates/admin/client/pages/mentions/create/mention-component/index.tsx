//node_modules
import React, { FunctionComponent, useCallback, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import defaults from "lodash/defaults";

//alert
import AlertComponent from "src/contexts/error-alert/alert-component";
import useMakeAlert from "src/contexts/error-alert/useMakeAlert";

//formik
import TitleComponent from "./formik/title-component";
import UrlComponent from "./formik/url-component";
import ImageComponent from "./formik/image-component";
import DateComponent from "./formik/date-component";

//components
import SubmitButton from "src/components/submit-button";

//schema
import schema, { MentionSchemaType } from "src/templates/api/admin/db/mention/upsert/validation";

//api
import upsertTestimonial from "src/templates/api/admin/db/mention/upsert/client";

//types
import type { MentionDocumentData } from "libs/arangodb/collections/mentions";

interface MentionModifierProps {
  mention?: MentionDocumentData;
  setMention: (mention: MentionDocumentData) => void;
}

function getInitialValues(value?: MentionDocumentData) {
  const defaultValue: MentionSchemaType = {
    _key: undefined,
    title: "",
    url: "",
    image: null,
    published_time: Date.now(),
  };
  return defaults(value, defaultValue);
}

const MentionModifierComponent: FunctionComponent<MentionModifierProps> = ({ mention, setMention }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const makeAlert = useMakeAlert();

  const onSubmit = useCallback(async (values: MentionSchemaType) => {
    setSubmitting(true);
    try {
      const response = await upsertTestimonial(values);
      if (response.ok) {
        setMention(response.mention);
        router.push(`/admin/mentions/create/${response.mention._key}/`);
        setSubmitting(false);
      } else {
        setSubmitting(false);
        makeAlert(`Failed to create mention: ${response.message}`);
      }
    } catch (error: any) {
      setSubmitting(false);
      makeAlert(`Failed to create mention: ${error?.message || "Unknown error"}`);
    }
  }, []);

  const initialValues = useMemo(() => getInitialValues(mention), [mention]);

  const formik = useFormik<MentionSchemaType>({
    initialValues: initialValues,
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  return (
    <Container className="my-3">
      <AlertComponent />
      <Form noValidate onSubmit={formik.handleSubmit}>
        <UrlComponent formik={formik} />
        <hr className="my-4" />
        <TitleComponent formik={formik} />
        <hr className="my-4" />
        <ImageComponent formik={formik} />
        <hr className="my-4" />
        <DateComponent formik={formik} />
        <hr className="my-4" />
        <div>
          <SubmitButton submitting={submitting}>Save Mention</SubmitButton>
        </div>
      </Form>
    </Container>
  );
};

export default React.memo(MentionModifierComponent);
