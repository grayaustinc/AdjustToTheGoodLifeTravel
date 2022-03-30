//import node_modules
import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Pagination } from "react-bootstrap";

interface PrevProps {
  page: number;
  index: number;
  generateHref: (page: number) => string;
}

const FirstComponent: FunctionComponent<PrevProps> = ({ page, index, generateHref }) => {
  const active = page === index;

  if (active) {
    return <Pagination.Item active={true}>{index}</Pagination.Item>;
  }

  return (
    <Link href={generateHref(index)} passHref>
      <Pagination.Item>{index}</Pagination.Item>
    </Link>
  );
};

export default React.memo(FirstComponent);
