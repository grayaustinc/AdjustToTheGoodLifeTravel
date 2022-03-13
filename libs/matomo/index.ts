import { createInstance } from "@datapunt/matomo-tracker-react";

const instance = createInstance({
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
