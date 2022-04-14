//node_modules
import React from "react";
import Link from "next/link";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import type { DocumentMetadata } from "arangojs/documents";
import { JSONTree } from "react-json-tree";

interface ModifierProps<Value extends DocumentMetadata> {
  values: Value[];
  title: string;
  subtitle: string;
  getHref: (value: Value) => string;
  getHeader: (value: Value) => string;
  onDelete?: (value: Value) => void;
}

const theme = {
  scheme: "bright",
  author: "chris kempson (http://chriskempson.com)",
  base00: "#000000",
  base01: "#303030",
  base02: "#505050",
  base03: "#b0b0b0",
  base04: "#d0d0d0",
  base05: "#e0e0e0",
  base06: "#f5f5f5",
  base07: "#ffffff",
  base08: "#fb0120",
  base09: "#fc6d24",
  base0A: "#fda331",
  base0B: "#a1c659",
  base0C: "#76c7b7",
  base0D: "#6fb3d2",
  base0E: "#d381c3",
  base0F: "#be643c",
};

function shouldExpandNode(keyPath: (string | number)[], data: any, level: number): boolean {
  if (level > 1) {
    return false;
  }
  return true;
}

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
                <JSONTree data={value} theme={theme} invertTheme={true} hideRoot={true} sortObjectKeys={true} shouldExpandNode={shouldExpandNode} />
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
