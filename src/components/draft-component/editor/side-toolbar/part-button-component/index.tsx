import { ContentBlock, genKey, ContentState, EditorState } from "draft-js";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent, useContext, useState } from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { Map } from "immutable";

import context from "src/components/draft-component/shared/context";

import { preventBubbling, replaceBlockAtSelection } from "src/components/draft-component/editor/helper";

const PartButtonComponent: FunctionComponent = () => {
  const { editorState, setEditorState } = useContext(context);

  function onClick() {
    const newBlock = new ContentBlock({
      key: genKey(),
      type: "atomic",
      text: "",
      data: Map({ type: "PART" }),
    });

    const contentStateModifier_0 = replaceBlockAtSelection(editorState, newBlock);

    const newEditorState = EditorState.push(editorState, contentStateModifier_0, "insert-fragment");
    setEditorState(newEditorState);
  }

  return (
    <OverlayTrigger placement="right" overlay={<Tooltip>Add an new Part</Tooltip>}>
      <Button variant="dark" onMouseDown={preventBubbling} onClick={onClick}>
        <FontAwesomeIcon fixedWidth icon={faEllipsisH} />
      </Button>
    </OverlayTrigger>
  );
};

export default React.memo(PartButtonComponent);
