//import node_modules
import React, { FunctionComponent, useMemo } from "react";
import Link from "next/link";
import { PageItemProps, Pagination } from "react-bootstrap";

//libs
import getPagingRange from "libs/helper/get-page-range";

//local components
import First from "./first-component";
import Prev from "./prev-component";
import Next from "./next-component";
import Last from "./last-component";

interface PagingProps {
  page: number;
  total: number;
  totalPerPage: number;
  maxButtons: number;
  generateHref: (page: number) => string;
}

const PagingComponent: FunctionComponent<PagingProps> = ({ page, total, totalPerPage, maxButtons, generateHref }) => {
  const totalPages = useMemo(() => Math.ceil(total / totalPerPage), [totalPerPage, total]);
  const pages = useMemo(() => getPagingRange(page, totalPages, maxButtons), [page, totalPages, maxButtons]);

  return (
    <Pagination className="justify-content-center">
      <First page={page} generateHref={generateHref} />
      <Prev page={page} generateHref={generateHref} />
      {pages[0] !== 1 && <Pagination.Ellipsis disabled={true} />}
      {pages.map((i) => {
        return (
          <Link key={i} href={generateHref(i)} passHref>
            <Pagination.Item active={page === i}>{i}</Pagination.Item>
          </Link>
        );
      })}
      {pages[pages.length - 1] !== totalPages && <Pagination.Ellipsis disabled={true} />}
      <Next page={page} totalPages={totalPages} generateHref={generateHref} />
      <Last page={page} totalPages={totalPages} generateHref={generateHref} />
    </Pagination>
  );
};

export default React.memo(PagingComponent);
