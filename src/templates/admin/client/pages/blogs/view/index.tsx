//node_modules
import React, { useCallback, useState } from "react";
import { NextComponentType } from "next";
import { useUpdateEffect } from "react-use";

//modifier
import createModifierComponent from "src/components/admin-components/modifier-component";

//components
import PagingComponent from "./router-component";

//api
import deleteBlog from "src/templates/api/admin/db/blog/delete/client";

//props
import type { PageProps } from "src/templates/admin/server/paths/blogs/view";
import { BlogDocumentData } from "libs/arangodb/collections/blogs";

const ModifierComponent = createModifierComponent<BlogDocumentData>();

function getHref(blog: BlogDocumentData) {
  return `/admin/blogs/create/${blog._key}/`;
}

function getHeader(blog: BlogDocumentData) {
  return `${blog._key} - ${blog.title}`;
}

const AdminBlogsPage: NextComponentType<any, any, PageProps> = (props) => {
  const [blogs, setBlogs] = useState(props.blogs);

  const onDelete = useCallback(
    async (target: BlogDocumentData) => {
      if (window.confirm(`Are you sure you want to delete Blog: ${target.title}?`)) {
        const response = await deleteBlog(target);
        if (response.ok) {
          setBlogs((data) => data.filter((value) => value._key !== target._key));
        } else {
          window.alert(response.message);
        }
      }
    },
    [setBlogs]
  );

  useUpdateEffect(() => {
    setBlogs(props.blogs);
  }, [props]);

  return (
    <>
      <ModifierComponent
        name="blog"
        title="List of all Blogs"
        subtitle="You can use this menu in order to modify/delete Blogs"
        values={blogs}
        getHeader={getHeader}
        getHref={getHref}
        onDelete={onDelete}
      />
      <div className="my-auto" />
      <PagingComponent page={props.page} total={props.total} />
    </>
  );
};

export default AdminBlogsPage;
