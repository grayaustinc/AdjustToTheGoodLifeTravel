//import node_modules
import React, { FunctionComponent } from "react";
import { Container, Row } from "react-bootstrap";

//types
import type { ModifiedBlogDocumentData } from "src/templates/blogs/[page]/types";

//components
import ImageComponent from "./image-component";
import InformationComponent from "./information-component";

//styles
import style from "./blog.module.scss";

interface BlogsProps {
  blogs: ModifiedBlogDocumentData[];
}

const BlogsComponent: FunctionComponent<BlogsProps> = ({ blogs }) => {
  return (
    <Container className="my-3">
      <h1 className={style["header"]}>Adjust To The Good Life Travel Blog</h1>
      <hr className="my-4" />
      {blogs.map((blog, i) => (
        <Row key={blog.slug} className={`${style["post"]} justify-content-center g-0`}>
          {i % 2 === 0 ? (
            <>
              <ImageComponent order={1} blog={blog} index={i} />
              <InformationComponent order={2} blog={blog} />
            </>
          ) : (
            <>
              <InformationComponent order={1} blog={blog} />
              <ImageComponent order={2} blog={blog} index={i} />
            </>
          )}
        </Row>
      ))}
    </Container>
  );
};

export default React.memo(BlogsComponent);
