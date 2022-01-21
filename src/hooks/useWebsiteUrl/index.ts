//node_modules
import { useRouter } from "next/router";

//helpers
import getWebsiteUrl from "libs/helper/get-website-url";

function useWebsiteUrl() {
  const router = useRouter();
  return getWebsiteUrl(router.asPath);
}

export default useWebsiteUrl;
