import React, { FunctionComponent, useState } from "react";

import styles from "./styles/admin.module.scss";
import AdminHeaderComponent from "./components/header-component";
import AdminMainComponent from "./components/main-component";

const AdminLayout: FunctionComponent = ({ children }) => {
  const [toggle, setToggle] = useState<boolean>(false);

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
