import React, { FunctionComponent, useCallback, useEffect, useRef } from "react";
import { Router } from "next/router";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

const ProgressBarComponent: FunctionComponent = () => {
  const ref = useRef<LoadingBarRef>(null);

  const setStart = useCallback(() => ref.current?.continuousStart(0, 1000), [ref.current]);
  const setEnd = useCallback(() => ref.current?.complete(), [ref.current]);

  useEffect(() => {
    Router.events.on("routeChangeStart", setStart);
    Router.events.on("routeChangeComplete", setEnd);
    Router.events.on("routeChangeError", setEnd);
    return () => {
      Router.events.off("routeChangeStart", setStart);
      Router.events.off("routeChangeComplete", setEnd);
      Router.events.off("routeChangeError", setEnd);
    };
  }, [setStart, setEnd]);

  return <LoadingBar ref={ref} color="#0d6efd" height={3} />;
};

export default React.memo(ProgressBarComponent);
