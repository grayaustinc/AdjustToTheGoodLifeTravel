//node_modules
import React, { FunctionComponent, useCallback } from "react";
import { FormikContextType } from "formik";
import { FormControl, FloatingLabel, FormGroup } from "react-bootstrap";
import timeFormat from "date-fns/format";

//types
import type { MentionSchemaType } from "src/templates/api/admin/db/mention/upsert/validation";

interface DateProps {
  formik: FormikContextType<MentionSchemaType>;
}

const DateComponent: FunctionComponent<DateProps> = ({ formik }) => {
  const publishedTime = formik.values.published_time;

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const value = event.target.value;
      const time = new Date(value).getTime();
      formik.setFieldValue("published_time", time);
    },
    [formik]
  );

  return (
    <>
      <h2 className="ms-1">
        <span>Mention Published Time</span>
      </h2>
      <FormGroup>
        <FloatingLabel label="Mention Published Time">
          <FormControl type="datetime-local" value={timeFormat(publishedTime, "yyyy-MM-dd'T'HH:mm")} onChange={handleChange} />
        </FloatingLabel>
      </FormGroup>
    </>
  );
};

export default React.memo(DateComponent);
