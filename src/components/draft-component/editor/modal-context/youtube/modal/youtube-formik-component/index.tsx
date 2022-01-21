import { useFormik } from "formik";
import React, { FunctionComponent } from "react";
import { Button, Modal, FormControl, Form, FloatingLabel } from "react-bootstrap";

import { YoutubeModalAsset } from "../../hook";
import validationSchema, { YoutubeDataType } from "src/components/draft-component/shared/validation/youtube";

import YoutubeComponent from "src/components/draft-component/shared/components/youtube-component";

interface YoutubeFormikProps {
  asset: YoutubeModalAsset;
  handleClose: () => void;
}

const initialValues: YoutubeDataType = {
  videoId: "",
};

const YoutubeFormikComponent: FunctionComponent<YoutubeFormikProps> = ({ asset, handleClose }) => {
  const formik = useFormik<YoutubeDataType>({
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: (values) => asset.onSubmit && asset.onSubmit(values),
  });

  return (
    <>
      <Modal.Body>
        <FloatingLabel label="videoId" className="mb-3">
          <FormControl placeholder="placeholder" name="videoId" value={formik.values.videoId || ""} onChange={formik.handleChange} />
          <Form.Text className="text-muted ms-3">
            https://www.youtube.com/watch?v=<span className="text-info">dQw4w9WgXcQ</span>
          </Form.Text>
        </FloatingLabel>
        {formik.values.videoId && <YoutubeComponent data={formik.values} />}
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

export default React.memo(YoutubeFormikComponent);
