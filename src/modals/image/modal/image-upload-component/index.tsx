import { useFormik } from "formik";
import React, { FunctionComponent, useState } from "react";
import { Button, Modal, FormControl, FormGroup, Form, FloatingLabel, Container } from "react-bootstrap";
import isString from "lodash/isString";

import validationSchema, { ImageDataType } from "src/modals/image/validation";
import { ImageModalAsset } from "src/modals/image/hook";

import UploadStatusComponent, { UploadStatus } from "./upload-status-component";
import ImageRenderComponent from "../render-component";

import uploadImage from "src/templates/api/admin/s3/image-upload/client";

interface ImageModalBodySrcProps {
  asset: ImageModalAsset;
  handleClose: () => void;
}

const initialValues: ImageDataType = {
  src: "",
  srcType: "STATIC",
  alt: "",
  quality: 30,
};

const ImageUploadComponent: FunctionComponent<ImageModalBodySrcProps> = ({ asset, handleClose }) => {
  const [status, setStatus] = useState<UploadStatus>({ type: "error", message: "Choose a file to upload" });

  const formik = useFormik<ImageDataType>({
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: (values) => asset.onSubmit && asset.onSubmit(values),
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.currentTarget.files?.item(0) || null;
    if (file) {
      setStatus({ type: "uploading" });
      const reader = new FileReader();
      reader.onloadend = async () => {
        const image = reader.result;
        if (isString(image)) {
          try {
            const response = await uploadImage({
              image: image,
              Prefix: "/images/",
            });

            if (response.ok) {
              formik.setFieldValue("src", response.staticSrc);
              setStatus({ type: "complete" });
            } else {
              formik.setFieldValue("src", "");
              setStatus({ type: "error", message: response.message });
            }
          } catch {
            formik.setFieldValue("src", "");
            setStatus({ type: "error", message: "An unknown error occurred!" });
          }
        }
      };
      reader.readAsDataURL(file);
    } else {
      formik.setFieldValue("src", undefined);
    }
  };

  return (
    <>
      <Modal.Body>
        <FormGroup className="mb-3">
          <FormControl type="file" accept="image/*" placeholder="placeholder" onChange={onChange} />
        </FormGroup>
        <Container>
          <UploadStatusComponent status={status} />
          {formik.values.src && <ImageRenderComponent showStats={true} data={formik.values} />}
        </Container>
        <FormGroup className="mb-3">
          <Form.Label>Quality - The quality of the image (the lower the better)</Form.Label>
          <Form.Range placeholder="placeholder" name="quality" min={1} max={100} step={1} value={formik.values.quality} onChange={formik.handleChange} />
        </FormGroup>
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

export default React.memo(ImageUploadComponent);
