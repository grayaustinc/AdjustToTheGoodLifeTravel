//import node_modules
import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Pagination } from "react-bootstrap";

interface PrevProps {
  page: number;
  generateHref: (page: number) => string;
}

const PrevComponent: FunctionComponent<PrevProps> = ({ page, generateHref }) => {
  const disabled = page === 1;

  if (disabled) {
    return <Pagination.Prev disabled={true} />;
  }

  return (
    <Link href={generateHref(page - 1)} passHref>
      <Pagination.Prev />
    </Link>
  );
};

export default React.memo(PrevComponent);
