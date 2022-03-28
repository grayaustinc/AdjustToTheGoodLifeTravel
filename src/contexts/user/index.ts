import { UserDocumentData } from "libs/arangodb/collections/users";
import { createContext, useContext } from "react";

const context = createContext<UserDocumentData | undefined>(undefined);

export const AuthProvider = context.Provider;

export function useAuthenticated() {
  const user = useContext(context);
  return user;
}
