import MatomoTracker from "./tracker";

declare global {
  interface Window {
    _paq: [string, ...any[]][];
  }
}

const instance = new MatomoTracker({
  urlBase: "https://matomo.adjusttothegoodlifetravel.com/",
  siteId: 1,
  disabled: false,
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
