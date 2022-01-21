//node_modules
import React, { FunctionComponent, useCallback, useMemo } from "react";
import { FormikContextType } from "formik";
import { FormControl, FloatingLabel, FormGroup, Button } from "react-bootstrap";

//libs
import type { DraftDocumentData } from "libs/arangodb/collections/drafts";
import trimmer from "libs/helper/punctuation-trimmer";

//types
import type { BlogSchemaType } from "src/templates/api/admin/db/blog/update/validation";

interface DescriptionFormikProps {
  formik: FormikContextType<BlogSchemaType>;
  draft: DraftDocumentData;
}

function createDescriptionFromDraft(draft: DraftDocumentData) {
  const text = draft.content.blocks.reduce((text, block) => {
    if (block.type === "unstyled") {
      return `${text} ${block.text}`;
    }
    return text;
  }, "");
  return trimmer(text, 160);
}

const DescriptionComponent: FunctionComponent<DescriptionFormikProps> = ({ formik, draft }) => {
  const description = formik.values.description.replace(/[\n\r]+/g, "");
  const currentLength = useMemo(() => description.length, [description]);

  const autofill = useCallback(() => {
    const newDescription = createDescriptionFromDraft(draft);
    formik.setFieldValue("description", newDescription, true);
  }, [draft, formik]);

  return (
    <>
      <h2 className="ms-1">
        <span className="me-1">SEO Description</span>(<span className={currentLength < 160 ? "text-success" : "text-danger"}>{currentLength}</span>)
      </h2>
      <div className="mb-2 mt-1">
        <Button variant="outline-dark" onClick={autofill}>
          Auto Fill
        </Button>
      </div>
      <FormGroup>
        <FloatingLabel label="SEO Description">
          <FormControl
            as="textarea"
            style={{ resize: "none", height: "10em" }}
            type="text"
            placeholder="SEO Description"
            name="description"
            value={description}
            onChange={formik.handleChange}
            isValid={formik.touched.description && !formik.errors.description}
            isInvalid={!!formik.errors.description}
          />
        </FloatingLabel>
        <div className="text-muted ms-2 me-5 mb-3">
          <small>
            The SEO Description is used in place of your Subtitle on search engine results pages. Good SEO descriptions utilize keywords, summarize the story and are between
            155-160 characters long.
          </small>
        </div>
      </FormGroup>
    </>
  );
};

export default React.memo(DescriptionComponent);
