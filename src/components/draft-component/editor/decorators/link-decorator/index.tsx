import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditorState, DraftDecorator, Modifier } from "draft-js";
import React, { FunctionComponent, useContext } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { DecoratorProps } from "src/components/draft-component/shared/decorators";

import { modalContext } from "src/components/draft-component/editor/modal-context";
import context from "src/components/draft-component/shared/context";
import type { LinkDataType } from "src/components/draft-component/shared/validation/link";

import LinkComponent from "src/components/draft-component/shared/components/link-component";

import { createEntitySelection, isCurrentInsideTarget } from "../../helper";

const LinkDecoratorComponent: FunctionComponent<DecoratorProps> = ({ entityKey, blockKey, start, end, children }) => {
  const { modalIsShowing, linkDispatch } = useContext(modalContext);
  const { editorState, setEditorState } = useContext(context);

  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  const selection = createEntitySelection(blockKey, start, end);

  const isSelected = isCurrentInsideTarget(selectionState, selection) && selectionState.isCollapsed();

  const data: LinkDataType = contentState.getEntity(entityKey).getData();

  function onSubmit(values: LinkDataType) {
    const contentStateModify_0 = contentState.mergeEntityData(entityKey, values);
    const editorStateModify_0 = EditorState.push(editorState, contentStateModify_0, "apply-entity");
    setEditorState(editorStateModify_0);
    linkDispatch({ type: "hide" });
  }

  function destroyEntity() {
    const newContentState = Modifier.applyEntity(contentState, selection, null);
    const newEditorState = EditorState.push(editorState, newContentState, "apply-entity");
    setEditorState(newEditorState);
  }

  const handleShow = () => linkDispatch({ type: "show", data, onSubmit });

  return (
    <OverlayTrigger
      trigger="click"
      show={!modalIsShowing && isSelected}
      placement="top"
      overlay={
        <Popover>
          <div style={{ backgroundColor: "#212529" }}>
            <Button variant="dark" onClick={handleShow}>
              {data.href.substr(0, 18) + "\u2026"}
            </Button>
            <Button variant="danger" onClick={destroyEntity}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </div>
        </Popover>
      }
    >
      <span>
        <LinkComponent href={data.href}>{children}</LinkComponent>
      </span>
    </OverlayTrigger>
  );
};

export default LinkDecoratorComponent;
