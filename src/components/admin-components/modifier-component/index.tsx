//node_modules
import React, { FunctionComponent } from "react";
import { Container, Card, Accordion } from "react-bootstrap";
import type { DocumentMetadata } from "arangojs/documents";

//components
import JsonEditorComponent from "src/components/admin-components/json-editor-component";

interface ModifierProps<Value extends DocumentMetadata> {
  name: string;
  values: Value[];
  title: string;
  subtitle: string;
  getHref: (value: Value) => string;
  getHeader: (value: Value) => string;
  onDelete?: (value: Value) => void;
}

function createModifierComponent<DocumentType extends DocumentMetadata>() {
  const ModifierComponent: FunctionComponent<ModifierProps<DocumentType>> = (props) => {
    return (
      <Container className="my-3">
        <Card>
          <Card.Header>
            <Card.Title>{props.title}</Card.Title>
            <Card.Subtitle>{props.subtitle}</Card.Subtitle>
          </Card.Header>
          <Accordion>
            {props.values.map((value) => (
              <Accordion.Item key={value._key} eventKey={value._key}>
                <Accordion.Header>{props.getHeader(value)}</Accordion.Header>
                <Accordion.Body>
                  <JsonEditorComponent name={props.name} json={value} href={props.getHref(value)} onDelete={props.onDelete} />
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card>
      </Container>
    );
  };

  return React.memo(ModifierComponent);
}

export default createModifierComponent;
