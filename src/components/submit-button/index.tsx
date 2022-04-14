//node_modules
import React, { FunctionComponent, PropsWithChildren } from "react";
import { Button, Spinner } from "react-bootstrap";

interface Props {
  submitting: boolean;
  className?: string;
  size?: "sm" | "lg";
  variant?: string;
  onClick?: () => void;
}

const SubmitButton: FunctionComponent<PropsWithChildren<Props>> = ({ submitting, className, variant, size, onClick, children }) => {
  if (submitting) {
    return (
      <Button size={size} className={className} variant={variant} disabled>
        <Spinner as="span" className="mx-4" animation="border" size="sm" role="status" aria-hidden="true" />
      </Button>
    );
  } else {
    return (
      <Button type="submit" className={className} size={size} variant={variant} onClick={onClick}>
        {children}
      </Button>
    );
  }
};

export default SubmitButton;
