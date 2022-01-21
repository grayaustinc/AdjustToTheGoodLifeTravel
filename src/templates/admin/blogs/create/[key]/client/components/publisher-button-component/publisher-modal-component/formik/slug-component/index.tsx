//node_modules
import React, { FunctionComponent, useCallback, useEffect } from "react";
import { FormikContextType } from "formik";
import { FormControl, FloatingLabel, FormGroup, Button } from "react-bootstrap";
import slugify from "slugify";
import { customAlphabet } from "nanoid";

//helpers
import getWebsiteUrl from "libs/helper/get-website-url";

//types
import type { BlogSchemaType } from "src/templates/api/admin/db/blog/update/validation";
import { BlogDocumentData } from "libs/arangodb/collections/blogs";

interface SlugFormikProps {
  blog: BlogDocumentData;
  formik: FormikContextType<BlogSchemaType>;
}

const SlugOptions = {
  remove: /[*+~.()'"!?:@#]/g,
  replacement: "-",
  lower: true,
  locale: "en",
  trim: false,
};

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 12);

function createSlugFromTitle(title: string) {
  const rand = nanoid();
  const newTitle = `${title}-${rand}`;
  const slug = slugify(newTitle, SlugOptions);
  return slug;
}

const SlugComponent: FunctionComponent<SlugFormikProps> = ({ blog, formik }) => {
  const title = formik.values.title || "";
  const slug = formik.values.slug || "";
  const disabled = blog.published || false;

  const autofill = useCallback(() => {
    const newSlug = createSlugFromTitle(title);
    formik.setFieldValue("slug", newSlug, true);
  }, [formik]);

  const handleSlugChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.currentTarget.value;
      formik.setFieldValue("slug", slugify(text, SlugOptions));
    },
    [formik]
  );

  return (
    <>
      <h2 className="ms-1">SEO Slug</h2>
      <div className="mb-2 mt-1">
        <Button variant="outline-dark" onClick={autofill} disabled={disabled}>
          Auto Fill
        </Button>
      </div>
      <div className="mb-2">
        <small>
          <b>Preview: </b>
          <span>{getWebsiteUrl("/blog/", slug)}</span>
        </small>
      </div>
      <FormGroup>
        <FloatingLabel label="Slug">
          <FormControl
            type="text"
            placeholder="Slug"
            name="slug"
            value={slug}
            onChange={handleSlugChange}
            isValid={formik.touched.slug && !formik.errors.slug}
            isInvalid={!!formik.errors.slug}
            disabled={disabled}
          />
        </FloatingLabel>
        <div className="text-muted ms-2">
          <small>The Slug is important for SEO especially when dealing with how the url will be read by search engines</small>
        </div>
      </FormGroup>
    </>
  );
};

export default React.memo(SlugComponent);
