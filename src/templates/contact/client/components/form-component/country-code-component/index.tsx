import React, { FunctionComponent, ChangeEvent, useState, useMemo, useCallback } from "react";
import { Form, FloatingLabel, Row, Col, Button, Card } from "react-bootstrap";

import countryCodes from "./country-code-array";

interface CountryCodeProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const CountryCodeComponent: FunctionComponent<CountryCodeProps> = ({ value, onChange }) => {
  return (
    <FloatingLabel className="my-4" label="Country">
      <Form.Select name="contact" value={value} onChange={(e) => onChange(e.target.value)}>
        {countryCodes.map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
};

export default React.memo(CountryCodeComponent);
