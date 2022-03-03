//import node_modules
import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Pagination } from "react-bootstrap";

interface PrevProps {
  page: number;
  generateHref: (page: number) => string;
}

const FirstComponent: FunctionComponent<PrevProps> = ({ page, generateHref }) => {
  const disabled = page === 1;

  if (disabled) {
    return <Pagination.First disabled={true} />;
  }

  return (
    <Link href={generateHref(1)} passHref>
      <Pagination.First />
    </Link>
  );
};

export default React.memo(FirstComponent);
