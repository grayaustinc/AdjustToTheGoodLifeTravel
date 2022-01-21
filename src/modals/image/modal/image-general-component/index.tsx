import { useFormik } from "formik";
import React, { FunctionComponent } from "react";
import { Button, Modal, FormControl, FormGroup, Form, FloatingLabel, Container } from "react-bootstrap";

import validationSchema, { ImageDataType } from "src/modals/image/validation";
import { ImageModalAsset } from "src/modals/image/hook";

import ImageRenderComponent from "../render-component";

interface ImageGeneralComponentProps {
  asset: ImageModalAsset;
  handleClose: () => void;
}

const ImageGeneralComponent: FunctionComponent<ImageGeneralComponentProps> = ({ asset, handleClose }) => {
  if (!asset.data) {
    return <></>;
  }

  const formik = useFormik<ImageDataType>({
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: asset.data,
    onSubmit: (values) => asset.onSubmit && asset.onSubmit(values),
  });

  const isStatic = asset.data.srcType === "STATIC";

  return (
    <>
      <Modal.Body>
        <Container>
          <ImageRenderComponent showStats={true} data={formik.values} />
        </Container>
        {isStatic && (
          <FormGroup className="mb-3">
            <Form.Label>Quality - The quality of the image (the lower the better)</Form.Label>
            <Form.Range placeholder="placeholder" name="quality" min={1} max={100} step={1} value={formik.values.quality} onChange={formik.handleChange} />
          </FormGroup>
        )}
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

export default React.memo(ImageGeneralComponent);
