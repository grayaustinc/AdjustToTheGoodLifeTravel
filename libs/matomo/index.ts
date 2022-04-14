//node_modules
import getConfig from "next/config";

import MatomoTracker from "./tracker";

declare global {
  interface Window {
    _paq: [string, ...any[]][];
  }
}

const { publicRuntimeConfig } = getConfig();
const { ANALYTICS_DISABLED, ANALYTICS_SITE_ID, WEBSITE_ANALYTICS_DOMAIN } = publicRuntimeConfig;

const instance = new MatomoTracker({
  urlBase: WEBSITE_ANALYTICS_DOMAIN,
  siteId: ANALYTICS_SITE_ID,
  disabled: ANALYTICS_DISABLED,
  heartBeat: {
    active: true,
    seconds: 15,
  },
  linkTracking: true,
  configurations: {
    disableCookies: true,
    setRequestMethod: "POST",
  },
});

export default instance;
