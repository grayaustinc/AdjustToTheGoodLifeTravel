//import node_modules
import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Pagination } from "react-bootstrap";

interface PrevProps {
  page: number;
  totalPages: number;
  generateHref: (page: number) => string;
}

const LastComponent: FunctionComponent<PrevProps> = ({ page, totalPages, generateHref }) => {
  const disabled = page === totalPages;

  if (disabled) {
    return <Pagination.Last disabled={true} />;
  }

  return (
    <Link href={generateHref(totalPages)} passHref>
      <Pagination.Last />
    </Link>
  );
};

export default React.memo(LastComponent);
