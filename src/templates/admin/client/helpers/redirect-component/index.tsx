import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect } from "react";

import LoadingComponent from "../loading-component";

interface PropsType {
  path: string;
}

const RedirectComponent: FunctionComponent<PropsType> = ({ path }) => {
  const router = useRouter();
  useEffect(() => {
    router.replace(path);
  }, []);
  return <LoadingComponent />;
};

export default React.memo(RedirectComponent);
