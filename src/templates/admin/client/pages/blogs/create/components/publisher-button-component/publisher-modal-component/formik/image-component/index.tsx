//node_modules
import React, { FunctionComponent, useCallback, useMemo } from "react";
import { FloatingLabel, FormSelect } from "react-bootstrap";

//libs
import { DraftDocumentData } from "libs/arangodb/collections/drafts";

//api
import { imageSchema, ImageSchemaType } from "src/templates/api/admin/db/blog/update/validation";

//locals
import PreviewComponent from "./preview-component";
import style from "./image.module.scss";

interface ImageFormikProps {
  value: ImageSchemaType | null;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => any;
  draft: DraftDocumentData;
}

const ImageFormikComponent: FunctionComponent<ImageFormikProps> = ({ value, setFieldValue, draft }) => {
  const images = useMemo(() => {
    return draft.content.blocks.reduce<ImageSchemaType[]>((images, value) => {
      if (value.type === "atomic" && value.data?.type === "IMAGE" && imageSchema.isValidSync(value.data)) {
        images.push({
          src: value.data.src,
          srcType: value.data.srcType,
        });
      }
      return images;
    }, []);
  }, [draft.content.blocks]);

  const getImageValue = useCallback(() => {
    return value?.src;
  }, [value]);

  const handleImageValue = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const src = e.currentTarget.value;
      const image = images.find((image) => image.src === src);
      setFieldValue("image", image || null, true);
    },
    [setFieldValue]
  );

  return (
    <>
      <h2 className="ms-1">SEO Image</h2>
      {value && (
        <div className={style["container"]}>
          <PreviewComponent src={value.src} srcType={value.srcType} />
        </div>
      )}
      <FloatingLabel label="SEO Image" className="mb-4">
        <FormSelect name="image" value={getImageValue()} onChange={handleImageValue}>
          <option value={undefined}>No Image</option>
          {images.map((image, index) => {
            return (
              <option key={image.src} value={image.src}>
                Image {index + 1}
              </option>
            );
          })}
        </FormSelect>
      </FloatingLabel>
    </>
  );
};

export default React.memo(ImageFormikComponent);
