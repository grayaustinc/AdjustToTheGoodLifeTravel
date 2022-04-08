//node_modules
import React, { useCallback, useState } from "react";
import { NextComponentType } from "next";
import { useUpdateEffect } from "react-use";

//components
import PreviewComponent from "src/components/admin-components/preview-component";
import PagingComponent from "src/components/paging-component";

//libs
import { TOTAL_DOCUMENTS_PER_PAGE } from "src/templates/admin/server/paths/blogs/view/constant";

//api
import deleteBlog from "src/templates/api/admin/db/blog/delete/client";

//props
import type { PageProps } from "src/templates/admin/server/paths/blogs/view";
import { BlogDocumentData } from "libs/arangodb/collections/blogs";

function getHref(blog: BlogDocumentData) {
  return `/admin/blogs/create/${blog._key}/`;
}

function generateHref(page: number) {
  return `/admin/blogs/view/${page}`;
}

function getHeader(blog: BlogDocumentData) {
  return blog.title;
}

const AdminBlogsPage: NextComponentType<any, any, PageProps> = (props) => {
  const [blogs, setBlogs] = useState(props.blogs);

  const onDelete = useCallback(
    async (target: BlogDocumentData) => {
      if (window.confirm(`Are you sure you want to delete Blog: "${target.title}"?`) && window.confirm(`Are you ABSOLUTELY sure you want to delete Blog: "${target.title}"?`)) {
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
      <PreviewComponent
        name="blog"
        title="List of all Blogs"
        subtitle="You can use this menu in order to modify/delete Blogs"
        values={blogs}
        getHeader={getHeader}
        getHref={getHref}
        onDelete={onDelete}
      />
      <div className="my-auto" />
      <PagingComponent page={props.page} totalPerPage={TOTAL_DOCUMENTS_PER_PAGE} total={props.total} maxButtons={5} generateHref={generateHref} />
    </>
  );
};

export default AdminBlogsPage;
