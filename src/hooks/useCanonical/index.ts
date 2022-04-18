//node_modules
import { useRouter } from "next/router";
import urlJoin from "proper-url-join";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { WEBSITE_DOMAIN } = publicRuntimeConfig;

function useCanonical(queries: string[] = []) {
  const router = useRouter();
  const url = new URL(urlJoin(router.asPath, { trailingSlash: true }), WEBSITE_DOMAIN);
  for (const [param, _] of url.searchParams.entries()) {
    if (!queries.includes(param)) {
      url.searchParams.delete(param);
    }
  }
  return url.href;
}

export default useCanonical;
