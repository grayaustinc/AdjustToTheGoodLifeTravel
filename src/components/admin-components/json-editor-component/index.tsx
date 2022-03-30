//node_modules
import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import dynamic from "next/dynamic";

//dynamic
const ReactJsonComponent = dynamic(() => import("react-json-view"), { ssr: false });

interface JsonEditorProps {
  name: string;
  json: any;
  href: string;
  onDelete?: (value: any) => void;
}

const JsonEditorComponent: FunctionComponent<JsonEditorProps> = ({ name, json, href, onDelete }) => {
  return (
    <Card.Body>
      <ReactJsonComponent
        name={name}
        src={json}
        style={{ wordBreak: "break-all" }}
        sortKeys={true}
        collapsed={1}
        quotesOnKeys={false}
        enableClipboard={false}
        displayObjectSize={false}
        displayDataTypes={false}
        collapseStringsAfterLength={false}
      />
      {/* <JsonComponent json={json} /> */}
      <ButtonGroup className="d-flex justify-content-center justify-content-lg-start mt-3">
        <Link href={href} passHref>
          <Button className="flex-grow-0 px-4" variant="warning">
            Edit
          </Button>
        </Link>
        <Button className="flex-grow-0 px-3" variant="danger" onClick={() => onDelete?.(json)} disabled={!onDelete}>
          Delete
        </Button>
      </ButtonGroup>
    </Card.Body>
  );
};

export default React.memo(JsonEditorComponent);
