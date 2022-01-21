//node_modules
import React, { FunctionComponent, useMemo } from "react";
import { FormikContextType } from "formik";
import { FormControl, FloatingLabel, FormGroup } from "react-bootstrap";
import toFinite from "lodash/toFinite";

//components
import MapComponent from "src/components/map-component";

//types
import type { LocationSchemaType } from "src/templates/api/admin/db/location/upsert/validation";

function getCoordinates(value?: LocationSchemaType["coordinates"]): [number, number] {
  if (value) {
    return [value[0] || 0, value[1] || 0];
  }
  return [0, 0];
}

interface NameFormikProps {
  formik: FormikContextType<LocationSchemaType>;
}

const DescriptionComponent: FunctionComponent<NameFormikProps> = ({ formik }) => {
  const coordinates = getCoordinates(formik.values.coordinates).join(",");

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const split = event.target.value.split(",");
    const finites = split.map((v) => toFinite(v));
    formik.setFieldValue("coordinates", getCoordinates(finites));
  };

  const locations = useMemo(() => [{ name: formik.values.name, coordinates: getCoordinates(formik.values.coordinates) }], [formik.values.name, formik.values.coordinates]);

  return (
    <>
      <h2 className="ms-1">
        <span>Location Coordinates</span>
      </h2>
      <FormGroup>
        <FloatingLabel label="Location Coordinates">
          <FormControl
            type="text"
            placeholder="Location Coordinates"
            name="coordinates"
            value={coordinates}
            onChange={onChange}
            //onChange={formik.handleChange}
            isValid={formik.touched.coordinates && !formik.errors.coordinates}
            isInvalid={!!formik.errors.coordinates}
          />
        </FloatingLabel>
        <FormControl.Feedback>Looks good!</FormControl.Feedback>
        <MapComponent locations={locations} />
      </FormGroup>
    </>
  );
};

export default React.memo(DescriptionComponent);
