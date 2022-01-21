import { ContentBlock, genKey, ContentState, EditorState } from "draft-js";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent, useContext, useState } from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import Immutable from "immutable";

import { modalContext } from "src/components/draft-component/editor/modal-context";
import { ImageDataType } from "src/modals/image/validation";

import context from "src/components/draft-component/shared/context";

import { preventBubbling, replaceBlockAtSelection } from "src/components/draft-component/editor/helper";

const ImageButtonComponent: FunctionComponent = () => {
  const { imageDispatch } = useContext(modalContext);
  const { editorState, setEditorState } = useContext(context);

  function onSubmit(values: ImageDataType) {
    const newBlock = new ContentBlock({
      key: genKey(),
      type: "atomic",
      text: "",
      data: Immutable.Map({ type: "IMAGE", ...values }),
    });

    const contentStateModifier_0 = replaceBlockAtSelection(editorState, newBlock);
    const newEditorState = EditorState.push(editorState, contentStateModifier_0, "insert-fragment");
    setEditorState(newEditorState);
    imageDispatch({ type: "hide" });
  }

  const handleShow = () => imageDispatch({ type: "show", onSubmit: onSubmit });

  return (
    <OverlayTrigger placement="right" overlay={<Tooltip>Add an Image</Tooltip>}>
      <Button variant="dark" onMouseDown={preventBubbling} onClick={handleShow}>
        <FontAwesomeIcon fixedWidth icon={faImage} />
      </Button>
    </OverlayTrigger>
  );
};

export default React.memo(ImageButtonComponent);
