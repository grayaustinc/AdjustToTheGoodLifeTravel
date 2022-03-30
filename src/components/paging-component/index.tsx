//import node_modules
import React, { FunctionComponent, useMemo } from "react";
import { Pagination } from "react-bootstrap";

//libs
import getPagingRange from "libs/helper/get-page-range";

//local components
import PageItem from "./item-component";
import PageFirst from "./first-component";
import PagePrev from "./prev-component";
import PageNext from "./next-component";
import PageLast from "./last-component";

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
      <PageFirst page={page} generateHref={generateHref} />
      <PagePrev page={page} generateHref={generateHref} />
      {pages[0] !== 1 && <Pagination.Ellipsis disabled={true} />}
      {pages.map((i) => (
        <PageItem key={i} page={page} index={i} generateHref={generateHref} />
      ))}
      {pages[pages.length - 1] !== totalPages && <Pagination.Ellipsis disabled={true} />}
      <PageNext page={page} totalPages={totalPages} generateHref={generateHref} />
      <PageLast page={page} totalPages={totalPages} generateHref={generateHref} />
    </Pagination>
  );
};

export default React.memo(PagingComponent);
