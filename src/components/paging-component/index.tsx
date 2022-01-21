//import node_modules
import React, { FunctionComponent, useMemo } from "react";
import Link from "next/link";
import { PageItemProps, Pagination } from "react-bootstrap";

//libs
import getPagingRange from "libs/helper/get-page-range";

const LinkWrapper = (Component: FunctionComponent) =>
  React.forwardRef<any, PageItemProps>((props, ref) => {
    return (
      <span ref={ref}>
        <Component {...props} />
      </span>
    );
  });

const First = LinkWrapper(Pagination.First);
const Prev = LinkWrapper(Pagination.Prev);
const Next = LinkWrapper(Pagination.Next);
const Last = LinkWrapper(Pagination.Last);

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
      <Link href={generateHref(1)} passHref>
        <First disabled={page === 1} />
      </Link>
      <Link href={generateHref(page - 1)} passHref>
        <Prev disabled={page === 1} />
      </Link>
      {pages[0] !== 1 && <Pagination.Ellipsis disabled={true} />}
      {pages.map((i) => {
        return (
          <Link key={i} href={generateHref(i)} passHref>
            <Pagination.Item active={page === i}>{i}</Pagination.Item>
          </Link>
        );
      })}
      {pages[pages.length - 1] !== totalPages && <Pagination.Ellipsis disabled={true} />}
      <Link href={generateHref(page + 1)} passHref>
        <Next disabled={page === totalPages} />
      </Link>
      <Link href={generateHref(totalPages)} passHref>
        <Last disabled={page === totalPages} />
      </Link>
    </Pagination>
  );
};

export default React.memo(PagingComponent);
