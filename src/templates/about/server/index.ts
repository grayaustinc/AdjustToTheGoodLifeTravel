//libs
import crateGetStaticHandler from "libs/get-static-props";
import ErrorWrapperMiddleware from "libs/middleware/ssg/error-wrapper";

//helpers
import getLocations from "./get-locations";
import type { PageProps } from "../types";

const handler = crateGetStaticHandler<PageProps>();

handler.use(ErrorWrapperMiddleware);

export const getStaticProps = handler.run(async (context) => {
  const locations = await getLocations();
  return {
    props: {
      locations: locations,
    },
    revalidate: 300,
  };
});

export default getStaticProps;
