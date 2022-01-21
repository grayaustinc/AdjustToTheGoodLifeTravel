import React, { FunctionComponent, useReducer } from "react";

import reducer from "../alert-reducer";
import { Provider } from "../alert-context";

const AlertProvider: FunctionComponent = ({ children }) => {
  const value = useReducer(reducer, null);
  return <Provider value={value}>{children}</Provider>;
};

export default AlertProvider;
