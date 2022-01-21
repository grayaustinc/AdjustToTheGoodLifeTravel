//node_modules
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import { FormikContextType } from "formik";
import { FormControl, FloatingLabel, FormGroup, FormCheck } from "react-bootstrap";
import timeFormat from "date-fns/format";

//types
import type { BlogDocumentData } from "libs/arangodb/collections/blogs";
import { useInterval } from "react-use";

//types
import type { BlogSchemaType } from "src/templates/api/admin/db/blog/update/validation";

interface PublishProps {
  formik: FormikContextType<BlogSchemaType>;
  blog: BlogDocumentData;
}

const PublishComponent: FunctionComponent<PublishProps> = ({ formik, blog }) => {
  const [auto, setAuto] = useState(false);
  const published = formik.values.published || false;
  const date = Date.now();
  const publishedTime: number = formik.values.published_time || date;
  const modifiedTime: number = formik.values.modified_time || date;

  useEffect(() => {
    if (blog.published) {
      setAuto(false);
    } else {
      setAuto(true);
    }
  }, [blog.published, published]);

  useInterval(() => {
    const date = Date.now();
    if (auto) formik.setFieldValue("published_time", date);
    formik.setFieldValue("modified_time", date);
  }, 1000);

  return (
    <>
      <h2 className="ms-1">Publish</h2>
      <div className="mb-2 mt-1">
        <FormCheck type="switch" label="Publish the blog to the website" name="published" checked={published} onChange={formik.handleChange} />
      </div>
      <div className="mb-2 mt-1">
        <h3 className="h4">Published Time</h3>
        <FormControl type="datetime-local" value={timeFormat(publishedTime, "yyyy-MM-dd'T'HH:mm")} disabled />
      </div>
      <div className="mb-2 mt-1">
        <h3 className="h4">Modified Time</h3>
        <FormControl type="datetime-local" value={timeFormat(modifiedTime, "yyyy-MM-dd'T'HH:mm")} disabled />
      </div>
    </>
  );
};

export default React.memo(PublishComponent);
