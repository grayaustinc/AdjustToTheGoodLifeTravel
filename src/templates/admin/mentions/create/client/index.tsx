//node_modules
import React, { useState } from "react";
import { NextComponentType } from "next";

//layout
import AdminLayout from "src/layouts/admin-layout";

//components
import MentionModifierComponent from "src/components/admin-components/mention-modifier-component";

//alert
import AlertProvider from "src/contexts/error-alert/alert-provider";

//types
import type { MentionDocumentData } from "libs/arangodb/collections/mentions";
import type { PageProps } from "../types";

const AdminLocationCreatePage: NextComponentType<any, any, PageProps> = (_) => {
  const [mention, setMention] = useState<MentionDocumentData>();

  return (
    <AdminLayout>
      <AlertProvider>
        <MentionModifierComponent mention={mention} setMention={setMention} />;
      </AlertProvider>
    </AdminLayout>
  );
};

export default AdminLocationCreatePage;
