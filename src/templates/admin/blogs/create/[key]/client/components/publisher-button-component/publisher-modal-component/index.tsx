//node_modules
import { useFormik } from "formik";
import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

//types
import type { BlogDocumentData } from "libs/arangodb/collections/blogs";
import type { DraftDocumentData } from "libs/arangodb/collections/drafts";

//formik components
import SlugComponent from "./formik/slug-component";
import AuthorsComponent from "./formik/authors-component";
import ImageComponent from "./formik/image-component";
import TitleComponent from "./formik/title-component";
import DescriptionComponent from "./formik/description-component";
import PublishComponent from "./formik/publish-component";

//components
import SubmitButton from "src/components/submit-button";

//alert
import useMakeAlert from "src/contexts/error-alert/useMakeAlert";
import AlertComponent from "src/contexts/error-alert/alert-component";

//api
import saveBlog from "src/templates/api/admin/db/blog/update/client";
import { blogSchema, BlogSchemaType } from "src/templates/api/admin/db/blog/update/validation";

interface PublisherModalComponentProps {
  show: boolean;
  blog: BlogDocumentData;
  draft: DraftDocumentData;
  setBlog: (blog: BlogDocumentData) => void;
  handleHide: () => void;
}

function createInitialValues(blog: BlogDocumentData, draft: DraftDocumentData): BlogSchemaType {
  return {
    _key: blog._key,
    authors: blog.authors || [],
    image: blog.image || null,
    title: blog.title || "",
    description: blog.description || "",
    slug: blog.slug || "",
    published_time: blog.published_time || Date.now(),
    modified_time: blog.modified_time || Date.now(),
    published: blog.published || false,
    content: draft.content || [],
  };
}

const PublishModal: FunctionComponent<PublisherModalComponentProps> = ({ show, blog, draft, setBlog, handleHide }) => {
  const makeAlert = useMakeAlert();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = useMemo(() => createInitialValues(blog, draft), [blog, draft, show]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: blogSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const response = await saveBlog(values);
        if (response.ok) {
          setBlog(response.blog);
          handleHide();
        } else {
          setSubmitting(false);
          makeAlert(`Failed to save blog: ${response.message}`);
        }
      } catch (error) {
        setSubmitting(false);
        makeAlert(`Failed to save blog: ${error}`);
      }
    },
  });

  useEffect(() => {
    formik.resetForm();
    setSubmitting(false);
  }, [show]);

  const h = formik.handleChange;
  const f = formik.setFieldValue;
  const v = formik.values;
  const t = formik.touched;
  const e = formik.errors;

  return (
    <Modal size="lg" show={show} onHide={handleHide} backdrop="static" fullscreen="lg-down">
      <Modal.Header closeButton>
        <h1 className="h2">Publisher Settings</h1>
      </Modal.Header>
      <Modal.Body>
        <AlertComponent />
        <Form noValidate onSubmit={formik.handleSubmit}>
          <AuthorsComponent value={v.authors} onChange={h} setFieldValue={f} errors={e.authors} />
          <hr className="my-4" />
          <ImageComponent value={v.image} setFieldValue={f} draft={draft} />
          <hr className="my-4" />
          <TitleComponent formik={formik} draft={draft} />
          <hr className="my-4" />
          <DescriptionComponent formik={formik} draft={draft} />
          <hr className="my-4" />
          <SlugComponent blog={blog} formik={formik} />
          <hr className="my-4" />
          <PublishComponent formik={formik} blog={blog} />
          <hr className="my-4" />
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHide}>
              Close
            </Button>
            <SubmitButton submitting={submitting}>Update Blog</SubmitButton>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(PublishModal);
