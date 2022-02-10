//node_modules
import React, { FunctionComponent, useCallback } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { FormikContextType } from "formik";

//image modal
import useImageHook from "src/modals/image/hook";
import ImageModalComponent from "src/modals/image/modal";

//components
import NextImageComponent from "src/components/next-image-component";

//types
import type { LocationSchemaType } from "src/templates/api/admin/db/location/upsert/validation";

interface LocationModifierProps {
  formik: FormikContextType<LocationSchemaType>;
}

const ImageFormikComponent: FunctionComponent<LocationModifierProps> = ({ formik }) => {
  const [asset, dispatch] = useImageHook();

  const onClick = useCallback(() => {
    dispatch({
      type: "show",
      data: formik.values.image,
      onSubmit: (value) => {
        formik.setFieldValue("image", value);
        dispatch({ type: "hide" });
      },
    });
  }, [formik, dispatch]);

  return (
    <>
      <ImageModalComponent asset={asset} dispatch={dispatch} />
      <h2 className="ms-1">
        <span>Location Image</span>
      </h2>
      <div className="mx-auto" style={{ maxWidth: "512px" }}>
        {formik.values.image && <NextImageComponent data={formik.values.image} />}
      </div>
      <Row className="text-center g-0 mt-2">
        <Col>
          <Button onClick={onClick}>Choose Image</Button>
        </Col>
      </Row>
    </>
  );
};

export default ImageFormikComponent;
