import { useFormik } from "formik";
import React, { FunctionComponent } from "react";
import { Button, Modal, FormControl, Form, FloatingLabel } from "react-bootstrap";

import { ImageModalAsset } from "src/modals/image/hook";
import validationSchema, { ImageDataType } from "src/modals/image/validation";

import RenderComponent from "../render-component";

interface ImageModalBodySrcProps {
  asset: ImageModalAsset;
  handleClose: () => void;
}

const initalValues: ImageDataType = {
  src: "",
  srcType: "EXTERNAL",
  alt: "",
  quality: undefined,
};

const ImageUrlComponent: FunctionComponent<ImageModalBodySrcProps> = ({ asset, handleClose }) => {
  const formik = useFormik<ImageDataType>({
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: initalValues,
    onSubmit: (values) => asset.onSubmit && asset.onSubmit(values),
  });

  return (
    <>
      <Modal.Body>
        <FloatingLabel label="url" className="mb-3">
          <FormControl placeholder="placeholder" name="src" value={formik.values.src || ""} onChange={formik.handleChange} />
          <Form.Text className="text-muted ms-3">Should be a valid image link</Form.Text>
        </FloatingLabel>
        {formik.values.src && <RenderComponent showStats={true} data={formik.values} />}
        <FloatingLabel label="alt text" className="mb-3">
          <FormControl placeholder="placeholder" name="alt" value={formik.values.alt || ""} onChange={formik.handleChange} />
          <Form.Text className="text-muted ms-3">Alternate text to be displayed if image fails to load</Form.Text>
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={formik.submitForm}>
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
};

export default React.memo(ImageUrlComponent);
