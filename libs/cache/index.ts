import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 * 30, checkperiod: 600, useClones: true, deleteOnExpire: true, enableLegacyCallbacks: false, maxKeys: -1 });

export default cache;
