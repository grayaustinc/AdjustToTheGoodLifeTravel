import React, { FunctionComponent, useContext, useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faItalic, faLink, faListOl, faListUl, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { EditorState, ContentState, RichUtils, Modifier, DraftEntityMutability } from "draft-js";
import { Button, OverlayTrigger, Tooltip, FormControl } from "react-bootstrap";

//libs
import { modalContext } from "src/components/draft-component/editor/modal-context";
import context from "src/components/draft-component/shared/context";
import { preventBubbling, isEntityActive } from "src/components/draft-component/editor/helper";
import type { LinkDataType } from "src/components/draft-component/shared/validation/link";
//local
import { activeVariant } from "../helper";

const LinkButtonComponent: FunctionComponent = () => {
  const { linkDispatch } = useContext(modalContext);
  const { editorState, setEditorState } = useContext(context);

  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  const active = isEntityActive(editorState, "LINK");

  function onSubmit(values: LinkDataType) {
    const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", values);
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const contentStateWithLink = Modifier.applyEntity(contentStateWithEntity, selectionState, entityKey);
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithLink,
    });
    setEditorState(newEditorState);
    linkDispatch({ type: "hide" });
  }

  const handleShow = () => linkDispatch({ type: "show", onSubmit });

  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip>Add Link</Tooltip>}>
      <Button variant="dark" className={activeVariant(active)} onMouseDown={preventBubbling} onClick={handleShow}>
        <FontAwesomeIcon icon={faLink} />
      </Button>
    </OverlayTrigger>
  );
};

export default React.memo(LinkButtonComponent);
