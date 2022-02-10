//node_modules
import React, { FunctionComponent, useCallback, useState } from "react";
import { useUpdateEffect } from "react-use";

//modifier
import createModifierComponent from "src/components/admin-components/modifier-component";

//components
import PagingComponent from "./router-component";

//api
import deleteMention from "src/templates/api/admin/db/mention/delete/client";

//types
import type { PageProps } from "src/templates/admin/server/paths/mentions/view";
import type { MentionDocumentData } from "libs/arangodb/collections/mentions";

const ModifierComponent = createModifierComponent<MentionDocumentData>();

function getHref(mention: MentionDocumentData) {
  return `/admin/mentions/create/${mention._key}/`;
}

function getHeader(mention: MentionDocumentData) {
  return `${mention._key} - ${mention.title}`;
}

const AdminTestimonialsPage: FunctionComponent<PageProps> = (props) => {
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
    <>
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
    </>
  );
};

export default React.memo(AdminTestimonialsPage);
