import { createContext } from "react";

import type { ReducerType } from "../alert-reducer";

const context = createContext<ReducerType>([] as any);

export const Provider = context.Provider;

export default context;
