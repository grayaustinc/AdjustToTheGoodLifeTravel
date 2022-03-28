//node_modules
import getConfig from "next/config";

import MatomoTracker from "./tracker";

declare global {
  interface Window {
    _paq: [string, ...any[]][];
  }
}

const { publicRuntimeConfig } = getConfig();
const { ANALYTICS_DISABLED } = publicRuntimeConfig;

const instance = new MatomoTracker({
  urlBase: "https://matomo.adjusttothegoodlifetravel.com/",
  siteId: 1,
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
