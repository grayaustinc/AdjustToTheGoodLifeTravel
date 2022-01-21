import "next-session/lib/session";
declare module "next-session/lib/session" {
  import("libs/arangodb/collections/users");
  import("next-session/lib/types");
  import type { UserDocumentData } from "libs/arangodb/collections/users";
  import type { Session, Options } from "next-session/lib/types";

  export default function session(options?: Options): (
    req: any,
    res: any
  ) => Promise<
    Session & {
      user?: UserDocumentData;
    }
  >;
}
