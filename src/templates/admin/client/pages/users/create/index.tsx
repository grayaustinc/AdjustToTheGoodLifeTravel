//node_modules
import React, { FunctionComponent, useState } from "react";
import { useUpdateEffect } from "react-use";

//alert
import AlertProvider from "src/contexts/error-alert/alert-provider";

//components
import UserModifierComponent from "./user-component";

//types
import type { PageProps } from "src/templates/admin/server/paths/users/create";

const AdminUserCreateEditPage: FunctionComponent<PageProps> = (props) => {
  const [user, setUser] = useState(props.user);

  useUpdateEffect(() => {
    setUser(props.user);
  }, [props]);

  return (
    <AlertProvider>
      <UserModifierComponent user={user} setUser={setUser} />
    </AlertProvider>
  );
};

export default React.memo(AdminUserCreateEditPage);
