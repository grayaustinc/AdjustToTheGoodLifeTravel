import { useFormik } from "formik";
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Modal, FormControl, FormGroup, Form, FloatingLabel, Row, ButtonGroup } from "react-bootstrap";
import clone from "lodash/clone";
import isString from "lodash/isString";

import getImageList from "src/templates/api/admin/s3/image-list/client";

import validationSchema, { ImageDataType } from "src/modals/image/validation";
import { ImageModalAsset } from "src/modals/image/hook";

interface ImageModalBodySrcProps {
  asset: ImageModalAsset;
  handleClose: () => void;
}

import ImageRenderComponent from "../render-component";

import PagingComponent from "./page-component";

function chunkedPages<T>(items: T[], size: number): T[][] {
  const chunks = [];
  const target = clone(items);

  while (target.length) {
    chunks.push(target.splice(0, size));
  }

  return chunks;
}

const TOTAL_IMAGES_PER_PAGE = 6;

const initialValues: ImageDataType = {
  src: "",
  srcType: "STATIC",
  alt: "",
  quality: 30,
};

const ImageSearchComponent: FunctionComponent<ImageModalBodySrcProps> = ({ asset, handleClose }) => {
  const [page, setPage] = useState(1);
  const [ContinuationToken, setContinuationToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    if (list.length > 0 && !isString(ContinuationToken)) return;
    setLoading(true);
    getImageList({
      Prefix: "/images/",
      StartAfter: undefined,
      MaxKeys: TOTAL_IMAGES_PER_PAGE,
      ContinuationToken: ContinuationToken,
    })
      .then((response) => {
        if (response.ok) {
          setList((list) => [...list, ...response.data]);
          setContinuationToken(response.ContinuationToken);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, [page]);

  const formik = useFormik<ImageDataType>({
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: (values) => asset.onSubmit && asset.onSubmit(values),
  });

  const pageData = useMemo(() => chunkedPages(list, TOTAL_IMAGES_PER_PAGE), [list]);

  const setSrc = useCallback(
    (src: string) => {
      formik.setFieldValue("src", src);
    },
    [formik]
  );

  const prevDisabled = loading || page === 1;
  const nextDisabled = loading || (page * TOTAL_IMAGES_PER_PAGE >= list.length && !isString(ContinuationToken));

  return (
    <>
      <Modal.Body>
        <FormGroup className="mb-3">
          <Row className="my-2">
            <ButtonGroup>
              <Button variant="outline-success" disabled={prevDisabled} onClick={() => setPage(page - 1)}>
                Previous
              </Button>
              <Button variant="outline-success" disabled={nextDisabled} onClick={() => setPage(page + 1)}>
                Next
              </Button>
            </ButtonGroup>
          </Row>
          <PagingComponent loading={loading} data={pageData[page - 1] || []} currentSrc={formik.values.src} setSrc={setSrc} />
          <hr />
          {formik.values.src && <ImageRenderComponent showStats={true} data={formik.values} />}
          <FormGroup className="mb-3">
            <Form.Label>Quality - The quality of the image (the lower the better)</Form.Label>
            <Form.Range placeholder="placeholder" name="quality" min={1} max={100} step={1} value={formik.values.quality} onChange={formik.handleChange} />
          </FormGroup>
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

export default React.memo(ImageSearchComponent);
