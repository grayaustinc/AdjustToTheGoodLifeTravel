//import node_modules
import React, { FunctionComponent } from "react";

//libs
import { TOTAL_MENTIONS_PER_PAGE } from "src/templates/admin/mentions/view/[page]/types";

//components
import PagingComponent from "src/components/paging-component";

interface RouterProps {
  page: number;
  total: number;
}

function generateHref(page: number) {
  return `/admin/mentions/view/${page}`;
}

const RouterComponent: FunctionComponent<RouterProps> = ({ page, total }) => {
  return <PagingComponent page={page} totalPerPage={TOTAL_MENTIONS_PER_PAGE} total={total} maxButtons={5} generateHref={generateHref} />;
};

export default React.memo(RouterComponent);
