import React, { useContext, FunctionComponent, useCallback, useRef, useEffect } from "react";
import { Alert } from "react-bootstrap";
import isString from "lodash/isString";

import context from "../alert-context";

const AlertComponent: FunctionComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, dispatch] = useContext(context);

  const onClose = useCallback(() => dispatch({ type: "clear" }), [dispatch]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  });

  if (value) {
    return (
      <Alert variant="danger" ref={ref} show={isString(value)} onClose={onClose} dismissible>
        {value}
      </Alert>
    );
  } else {
    return null;
  }
};

export default React.memo(AlertComponent);
