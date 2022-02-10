//node_modules
import React, { FunctionComponent, useMemo } from "react";
import { Button, InputGroup, FormControl, FormGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faMinus } from "@fortawesome/free-solid-svg-icons";
import isString from "lodash/isString";

//locals
import useArrayModifiers from "src/hooks/useFormArrayModifiers";

interface AuthorsFormikProps {
  value: string[];
  errors?: string | string[];
  onChange: (e: React.ChangeEvent<any>) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => any;
}

const AuthorsComponent: FunctionComponent<AuthorsFormikProps> = ({ value, errors, onChange, setFieldValue }) => {
  const modifier = useArrayModifiers("authors", value, setFieldValue);

  const previewString = useMemo(() => {
    const authors = value;
    if (authors.length === 0) return "";
    if (authors.length === 1) return authors[0];
    const firsts = authors.slice(0, authors.length - 1);
    const last = authors[authors.length - 1];
    return `${firsts.join(", ")}, and ${last}`;
  }, [value]);

  return (
    <>
      <h2 className="ms-1">SEO Authors</h2>
      <FormGroup>
        <div className="mb-1">
          <small>
            <b>Preview:</b> Written by {previewString}
          </small>
        </div>
        {value.map((value, index) => {
          return (
            <div key={index} className="mb-3">
              <InputGroup>
                <FormControl placeholder="Author Name" name={`authors.${index}`} value={value} aria-label="Author Name" onChange={onChange} isInvalid={!!errors?.[index]} />
                <Button variant="outline-dark" onClick={() => modifier.moveItemUp(index)} disabled={modifier.moveItemUpDisabled(index)}>
                  <FontAwesomeIcon icon={faChevronUp} fixedWidth />
                </Button>
                <Button variant="outline-dark" onClick={() => modifier.moveItemDown(index)} disabled={modifier.moveItemDownDisabled(index)}>
                  <FontAwesomeIcon icon={faChevronDown} fixedWidth />
                </Button>
                <Button variant="outline-danger" onClick={() => modifier.removeItem(index)}>
                  <FontAwesomeIcon icon={faMinus} fixedWidth />
                </Button>
              </InputGroup>
              {errors?.[index] && <div className="text-danger ms-3">{errors[index]}</div>}
            </div>
          );
        })}
        <div className="text-danger">{isString(errors) ? errors : undefined}</div>
        <Button variant="dark" onClick={modifier.addItem}>
          Add Author
        </Button>
      </FormGroup>
    </>
  );
};

export default React.memo(AuthorsComponent);
