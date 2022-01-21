import { useFormik } from "formik";
import React, { FunctionComponent } from "react";
import { Button, Modal, FormControl, FloatingLabel } from "react-bootstrap";

import type { LinkModalAsset } from "../../hook";
import validationSchema, { LinkDataType } from "src/components/draft-component/shared/validation/link";

interface LinkFormikProps {
  asset: LinkModalAsset;
  handleClose: () => void;
}

const initialValues: LinkDataType = {
  href: "",
};

const LinkFormikComponent: FunctionComponent<LinkFormikProps> = ({ asset, handleClose }) => {
  const formik = useFormik<LinkDataType>({
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: asset.data || initialValues,
    onSubmit: (values) => asset.onSubmit && asset.onSubmit(values),
  });

  return (
    <>
      <Modal.Body>
        <FloatingLabel label="href" className="mb-3">
          <FormControl placeholder="placeholder" name="href" value={formik.values.href || ""} onChange={formik.handleChange} />
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

export default React.memo(LinkFormikComponent);
