//node_modules
import React, { useCallback, useState } from "react";
import { NextComponentType } from "next";
import { useUpdateEffect } from "react-use";

//layout
import AdminLayout from "src/layouts/admin-layout";

//modifier
import createModifierComponent from "src/components/admin-components/modifier-component";

//components
import PagingComponent from "./router-component";

//api
import deleteMention from "src/templates/api/admin/db/mention/delete/client";

//types
import type { PageProps } from "../types";
import type { MentionDocumentData } from "libs/arangodb/collections/mentions";

const ModifierComponent = createModifierComponent<MentionDocumentData>();

function getHref(mention: MentionDocumentData) {
  return `/admin/mentions/create/${mention._key}/`;
}

function getHeader(mention: MentionDocumentData) {
  return `${mention._key} - ${mention.title}`;
}

const AdminTestimonialsPage: NextComponentType<any, any, PageProps> = (props) => {
  const [mention, setMention] = useState(props.mentions);

  const onDelete = useCallback(
    async (target: MentionDocumentData) => {
      if (window.confirm(`Are you sure you want to delete Mention: ${target._key}?`)) {
        const response = await deleteMention(target);
        if (response.ok) {
          setMention((data) => data.filter((value) => value._key !== target._key));
        } else {
          window.alert(response.message);
        }
      }
    },
    [setMention]
  );

  useUpdateEffect(() => {
    setMention(props.mentions);
  }, [props]);

  return (
    <AdminLayout>
      <ModifierComponent
        name="mention"
        title="List of all Mentions"
        subtitle="You can use this menu in order to modify/delete Mentions"
        values={mention}
        getHeader={getHeader}
        getHref={getHref}
        onDelete={onDelete}
      />
      <div className="my-auto" />
      <PagingComponent page={props.page} total={props.total} />
    </AdminLayout>
  );
};

export default AdminTestimonialsPage;
