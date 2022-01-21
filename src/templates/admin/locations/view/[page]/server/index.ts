//libs
import createServerSideHandler from "libs/get-server-side-props";
import LoginRedirectMiddleware from "libs/middleware/ssr/login-redirect";
import getPageNumber from "libs/helper/get-page-number";

//local
import getLocations from "./get-locations";
import getTotal from "./get-total";

//types
import { PageProps } from "../types";

const handler = createServerSideHandler<PageProps>();

handler.use(LoginRedirectMiddleware);

const getServerSideProps = handler.run(async (context) => {
  const page = getPageNumber(context.params?.page);
  const [locations, total] = await Promise.all([getLocations(page), getTotal()]);
  return {
    props: {
      locations: locations,
      page: page,
      total: total,
    },
  };
});

export default getServerSideProps;
