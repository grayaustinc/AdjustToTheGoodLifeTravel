//node_modules
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { FunctionComponent, useCallback } from "react";
import { Button } from "react-bootstrap";

//config
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

//types
import type { BlogDocumentData } from "libs/arangodb/collections/blogs";

interface ViewButtonProps {
  blog: BlogDocumentData;
}

const ViewButtonComponent: FunctionComponent<ViewButtonProps> = ({ blog }) => {
  const disabled = !blog.published;

  return (
    <Link href={`/blog/${blog.slug}/`} passHref>
      <Button variant="light" className="mx-2 my-1" target="_blank" disabled={disabled}>
        <FontAwesomeIcon icon={faEye} />
        <span className="ms-2">View</span>
      </Button>
    </Link>
  );
};

export default React.memo(ViewButtonComponent);
