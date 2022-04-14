//node_modules
import React, { FunctionComponent, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Router } from "next/router";

//components
import AdminOffCanvasComponent from "./components/pro-sidebar-component";
import AdminMainComponent from "./components/main-component";

//styles
import "src/styles/global/pro-sidebar/index.scss";

const AdminLayout: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const closeAside = useCallback(() => setToggle(false), [setToggle]);

  useEffect(() => {
    Router.events.on("routeChangeComplete", closeAside);
    return () => {
      Router.events.off("routeChangeComplete", closeAside);
    };
  }, [closeAside]);

  return (
    <React.Fragment>
      <AdminOffCanvasComponent toggle={toggle} onToggle={setToggle} />
      <AdminMainComponent toggle={toggle} onToggle={setToggle}>
        {children}
      </AdminMainComponent>
    </React.Fragment>
  );
};

export default AdminLayout;
