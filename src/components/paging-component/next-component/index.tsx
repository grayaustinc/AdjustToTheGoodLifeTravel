//import node_modules
import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Pagination } from "react-bootstrap";

interface PrevProps {
  page: number;
  totalPages: number;
  generateHref: (page: number) => string;
}

const NextComponent: FunctionComponent<PrevProps> = ({ page, totalPages, generateHref }) => {
  const disabled = page === totalPages;

  if (disabled) {
    return <Pagination.Next disabled={true} />;
  }

  return (
    <Link href={generateHref(page + 1)} passHref>
      <Pagination.Next />
    </Link>
  );
};

export default React.memo(NextComponent);
