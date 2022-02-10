//node_modules
import React, { FunctionComponent, useCallback } from "react";
import { FormikContextType } from "formik";
import { FormControl, FloatingLabel, FormGroup, Button } from "react-bootstrap";

//alert
import useMakeAlert from "src/contexts/error-alert/useMakeAlert";

//api
import scrapeUrl from "src/templates/api/admin/metascraper/get/client";

//types
import type { MentionSchemaType } from "src/templates/api/admin/db/mention/upsert/validation";

interface UrlFormikProps {
  formik: FormikContextType<MentionSchemaType>;
}

const TitleComponent: FunctionComponent<UrlFormikProps> = ({ formik }) => {
  const url = formik.values.url || "";
  const makeAlert = useMakeAlert();

  const onClick = useCallback(async () => {
    try {
      const response = await scrapeUrl({ url: url });
      if (response.ok) {
        formik.setFieldValue("title", response.data.title);
        formik.setFieldValue("url", response.data.url);
        formik.setFieldValue("published_time", response.data.published_time);
        formik.setFieldValue("image.src", response.data.image);
        formik.setFieldValue("image.srcType", "EXTERNAL");
      } else {
        makeAlert(`Failed to scrape url: ${response.message}`);
      }
    } catch (error: any) {
      makeAlert(`Failed to scrape url: ${error?.message || "Unknown error"}`);
    }
  }, [url, formik, makeAlert]);

  return (
    <>
      <h2 className="ms-1">
        <span>Mention Url</span>
      </h2>
      <Button variant="outline-primary" onClick={onClick}>
        Attempt Data Fetch
      </Button>
      <FormGroup>
        <FloatingLabel label="Mention Url">
          <FormControl
            type="url"
            placeholder="Mention Url"
            name="url"
            value={url}
            onChange={formik.handleChange}
            isValid={formik.touched.url && !formik.errors.url}
            isInvalid={!!formik.errors.url}
          />
        </FloatingLabel>
        <FormControl.Feedback type="valid">Looks good!</FormControl.Feedback>
        <FormControl.Feedback type="invalid">Please provide a proper url</FormControl.Feedback>
      </FormGroup>
    </>
  );
};

export default React.memo(TitleComponent);
