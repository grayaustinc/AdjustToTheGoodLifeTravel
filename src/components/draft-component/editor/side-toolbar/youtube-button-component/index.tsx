import { ContentBlock, genKey, ContentState, EditorState } from "draft-js";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent, useContext, useState } from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import Immutable from "immutable";

import { modalContext } from "src/components/draft-component/editor/modal-context";
import { YoutubeDataType } from "src/components/draft-component/shared/validation/youtube";

import context from "src/components/draft-component/shared/context";

import { preventBubbling, replaceBlockAtSelection } from "src/components/draft-component/editor/helper";

const YoutubeButtonComponent: FunctionComponent = () => {
  const { youtubeDispatch } = useContext(modalContext);
  const { editorState, setEditorState } = useContext(context);

  function onSubmit(values: YoutubeDataType) {
    const newBlock = new ContentBlock({
      key: genKey(),
      type: "atomic",
      text: "",
      data: Immutable.Map({ type: "YOUTUBE", ...values }),
    });

    const contentStateModifier_0 = replaceBlockAtSelection(editorState, newBlock);

    const newEditorState = EditorState.push(editorState, contentStateModifier_0, "insert-fragment");
    setEditorState(newEditorState);
    youtubeDispatch({ type: "hide" });
  }

  const handleShow = () => youtubeDispatch({ type: "show", onSubmit: onSubmit });

  return (
    <OverlayTrigger placement="right" overlay={<Tooltip>Add a Youtube Video</Tooltip>}>
      <Button variant="dark" onMouseDown={preventBubbling} onClick={handleShow}>
        <FontAwesomeIcon fixedWidth icon={faYoutube} />
      </Button>
    </OverlayTrigger>
  );
};

export default React.memo(YoutubeButtonComponent);
