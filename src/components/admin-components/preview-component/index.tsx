//node_modules
import React, { FunctionComponent } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import type { DocumentMetadata } from "arangojs/documents";

interface ModifierProps<Value extends DocumentMetadata> {
  name: string;
  values: Value[];
  title: string;
  subtitle: string;
  getHref: (value: Value) => string;
  getHeader: (value: Value) => string;
  onDelete?: (value: Value) => void;
}

function loading() {
  return (
    <div className="text-center">
      <Spinner animation="grow" variant="secondary" />
    </div>
  );
}

const ReactJsonComponent = dynamic(() => import("react-json-view"), {
  ssr: false,
  loading: loading,
});

function PreviewComponent<DocumentType extends DocumentMetadata>(props: ModifierProps<DocumentType>) {
  return (
    <Container className="my-3">
      <h1 className="text-center">{props.title}</h1>
      <h2 className="text-center">{props.subtitle}</h2>
      <Row>
        {props.values.map((value) => (
          <Col xs={12} lg={6} xxl={4} key={value._key} className="py-3">
            <Card className="mx-auto h-100" style={{ maxWidth: "456px" }}>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{props.getHeader(value)}</Card.Title>
                <ReactJsonComponent
                  name={props.name}
                  src={value}
                  style={{ wordBreak: "break-word" }}
                  sortKeys={true}
                  collapsed={1}
                  quotesOnKeys={false}
                  enableClipboard={false}
                  displayObjectSize={false}
                  displayDataTypes={false}
                  collapseStringsAfterLength={false}
                />
                <div className="my-auto" />
                <Row className="mt-3">
                  <Col className="text-center d-grid gap-2">
                    <Link href={props.getHref(value)} passHref>
                      <Button className="py-2" variant="primary">
                        Edit
                      </Button>
                    </Link>
                  </Col>
                  <Col className="ext-center d-grid gap-2">
                    <Button className="py-2" variant="danger" onClick={() => props.onDelete?.(value)} disabled={!props.onDelete}>
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PreviewComponent;
