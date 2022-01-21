//node_modules
import React, { FunctionComponent, useCallback, useMemo } from "react";
import { FormikContextType } from "formik";
import { FormControl, FloatingLabel, FormGroup, Button } from "react-bootstrap";

//libs
import type { DraftDocumentData } from "libs/arangodb/collections/drafts";
import trimmer from "libs/helper/punctuation-trimmer";

//types
import type { BlogSchemaType } from "src/templates/api/admin/db/blog/update/validation";

interface TitleFormikProps {
  formik: FormikContextType<BlogSchemaType>;
  draft: DraftDocumentData;
}

function createTitleFromDraft(draft: DraftDocumentData) {
  const block = draft.content.blocks.find((block) => block.type === "header-one");
  if (!block) return "";
  const text = block.text;
  return trimmer(text, 60);
}

const TitleComponent: FunctionComponent<TitleFormikProps> = ({ formik, draft }) => {
  const title = formik.values.title || "";
  const currentLength = useMemo(() => title.length, [title]);

  const autofill = useCallback(() => {
    const newTitle = createTitleFromDraft(draft);
    formik.setFieldValue("title", newTitle, true);
  }, [draft, formik]);

  return (
    <>
      <h2 className="ms-1">
        <span className="me-1">SEO Title</span>(<span className={currentLength < 60 ? "text-success" : "text-danger"}>{currentLength}</span>)
      </h2>
      <div className="mb-2 mt-1">
        <Button variant="outline-dark" onClick={autofill}>
          Auto Fill
        </Button>
      </div>
      <FormGroup>
        <FloatingLabel label="SEO Title">
          <FormControl
            type="text"
            placeholder="SEO Title"
            name="title"
            value={title}
            onChange={formik.handleChange}
            isValid={formik.touched.title && !formik.errors.title}
            isInvalid={!!formik.errors.title}
          />
        </FloatingLabel>
        <div className="text-muted ms-2 me-5 mb-3">
          <small>
            The SEO Title is used in place of your Title on search engine results pages, such as a Google search. SEO titles over <b>60</b> characters will be truncated. SEO titles
            between 40 and 50 characters with commonly searched words have the best click-through-rates.
          </small>
        </div>
      </FormGroup>
    </>
  );
};

export default React.memo(TitleComponent);
