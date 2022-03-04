import context from "../alert-context";

import { useContext, useCallback } from "react";

function useMakeAlert() {
  const [_, dispatch] = useContext(context);
  const callback = useCallback((message?: string) => dispatch({ type: "set", message: message }), [dispatch]);

  return callback;
}

export default useMakeAlert;
