//node_modules
import React, { FunctionComponent, useState } from "react";
import { useUpdateEffect } from "react-use";

//alert
import AlertProvider from "src/contexts/error-alert/alert-provider";

//components
import MentionComponent from "./mention-component";

//types
import type { PageProps } from "src/templates/admin/server/paths/mentions/create";

const AdminLocationCreateEditPage: FunctionComponent<PageProps> = (props) => {
  const [mention, setMention] = useState(props.mention);

  useUpdateEffect(() => {
    setMention(props.mention);
  }, [props]);

  return (
    <AlertProvider>
      <MentionComponent mention={mention} setMention={setMention} />
    </AlertProvider>
  );
};

export default React.memo(AdminLocationCreateEditPage);
