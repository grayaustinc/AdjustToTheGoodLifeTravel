import { NextPage } from "next";
import { ErrorProps } from "next/error";

//layout
import SiteLayout from "src/layouts/site-layout";

//TODO make this better?
const NotFoundPage: NextPage<ErrorProps> = (p) => {
  return (
    <SiteLayout>
      <div className="my-auto">
        <h1 className="display-1 text-center font-weight-bold">{p.statusCode || 500}</h1>
        <h4 className="text-center">{p.title || "An unknown error occurred!"}</h4>
      </div>
    </SiteLayout>
  );
};

export default NotFoundPage;
