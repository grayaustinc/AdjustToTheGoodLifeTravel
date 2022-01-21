import "next/config";
declare module "next/config" {
  import("./runtime-config");
  import { ServerRuntimeConfig, PublicRuntimeConfig } from "./runtime-config";

  export interface ConfigType {
    serverRuntimeConfig: ServerRuntimeConfig;
    publicRuntimeConfig: PublicRuntimeConfig;
  }

  function getConfig(): ConfigType;

  export = getConfig;
}
