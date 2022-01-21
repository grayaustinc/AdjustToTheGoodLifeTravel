import { NextComponentType } from "next";
import { ErrorProps } from "next/error";

//components
import HeaderComponent from "src/components/header-component";
import FooterComponent from "src/components/footer-component";

//TODO make this better?
const NotFoundPage: NextComponentType<any, any, ErrorProps> = (p) => {
  return (
    <>
      <HeaderComponent />
      <div className="my-auto">
        <h1 className="display-1 text-center font-weight-bold">{p.statusCode || 500}</h1>
        <h4 className="text-center">{p.title || "An unknown error occurred!"}</h4>
      </div>
      <FooterComponent />
    </>
  );
};

export default NotFoundPage;
