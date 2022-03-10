import React, { FunctionComponent, useEffect, useState } from "react";
import ReactGA from "react-ga4";

//components
import AdminHeaderComponent from "./components/header-component";
import AdminMainComponent from "./components/main-component";

//styles
import styles from "src/styles/admin-layout/index.module.scss";
import "src/styles/global/pro-sidebar/index.scss";

const AdminLayout: FunctionComponent = ({ children }) => {
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    ReactGA.reset();
  });

  return (
    <div className={styles.app}>
      <AdminHeaderComponent toggle={toggle} onToggle={setToggle} />
      <AdminMainComponent toggle={toggle} onToggle={setToggle}>
        {children}
      </AdminMainComponent>
    </div>
  );
};

export default AdminLayout;
