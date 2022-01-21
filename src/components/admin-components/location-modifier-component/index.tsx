//node_modules
import React, { FunctionComponent, useCallback, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import defaults from "lodash/defaults";

//alert
import AlertComponent from "src/contexts/error-alert/alert-component";
import useMakeAlert from "src/contexts/error-alert/useMakeAlert";

//formik
import NameComponent from "./formik/name-component";
import DescriptionComponent from "./formik/description-component";
import CoordinatesComponent from "./formik/coordinates-component";
import ImageComponent from "./formik/image-component";

//components
import SubmitButton from "src/components/submit-button";

//schema
import schema, { LocationSchemaType } from "src/templates/api/admin/db/location/upsert/validation";

//api
import upsertLocation from "src/templates/api/admin/db/location/upsert/client";

//types
import type { LocationDocumentData } from "libs/arangodb/collections/locations";

interface LocationModifierProps {
  location?: LocationDocumentData;
  setLocation: (location: LocationDocumentData) => void;
}

function getInitialValues(value?: LocationDocumentData) {
  const defaultValue: LocationSchemaType = {
    _key: undefined,
    name: "",
    description: "",
    image: null,
    coordinates: [0, 0],
  };
  return defaults(value, defaultValue);
}

const LocationModifierComponent: FunctionComponent<LocationModifierProps> = ({ location, setLocation }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const makeAlert = useMakeAlert();

  const onSubmit = useCallback(async (values: LocationSchemaType) => {
    setSubmitting(true);
    try {
      const response = await upsertLocation(values);
      if (response.ok) {
        setLocation(response.location);
        router.push(`/admin/locations/create/${response.location._key}/`);
        setSubmitting(false);
      } else {
        setSubmitting(false);
        makeAlert(`Failed to create location: ${response.message}`);
      }
    } catch (error: any) {
      setSubmitting(false);
      makeAlert(`Failed to create location: ${error?.message || "Unknown error"}`);
    }
  }, []);

  const formik = useFormik<LocationSchemaType>({
    initialValues: getInitialValues(location),
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  return (
    <Container className="my-3">
      <AlertComponent />
      <Form noValidate onSubmit={formik.handleSubmit}>
        <NameComponent formik={formik} />
        <hr className="my-4" />
        <ImageComponent formik={formik} />
        <hr className="my-4" />
        <DescriptionComponent formik={formik} />
        <hr className="my-4" />
        <CoordinatesComponent formik={formik} />
        <hr className="my-4" />
        <div>
          <SubmitButton submitting={submitting}>Save Location</SubmitButton>
        </div>
      </Form>
    </Container>
  );
};

export default LocationModifierComponent;
