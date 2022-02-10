//node_modules
import React, { FunctionComponent } from "react";
import { FormikContextType } from "formik";
import { FormControl, FloatingLabel, FormGroup } from "react-bootstrap";

//types
import type { MentionSchemaType } from "src/templates/api/admin/db/mention/upsert/validation";

interface TitleFormikProps {
  formik: FormikContextType<MentionSchemaType>;
}

const TitleComponent: FunctionComponent<TitleFormikProps> = ({ formik }) => {
  const title = formik.values.title || "";

  return (
    <>
      <h2 className="ms-1">
        <span>Mention Title</span>
      </h2>
      <FormGroup>
        <FloatingLabel label="Mention Title">
          <FormControl
            type="text"
            placeholder="Mention Title"
            name="title"
            value={title}
            onChange={formik.handleChange}
            isValid={formik.touched.title && !formik.errors.title}
            isInvalid={!!formik.errors.title}
          />
        </FloatingLabel>
        <FormControl.Feedback>Looks good!</FormControl.Feedback>
      </FormGroup>
    </>
  );
};

export default React.memo(TitleComponent);
