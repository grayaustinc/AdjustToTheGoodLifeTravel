//node_modules
import React, { FunctionComponent, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { RichUtils } from "draft-js";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import isString from "lodash/isString";
//libs
import context from "src/components/draft-component/shared/context";
import { preventBubbling } from "src/components/draft-component/editor/helper";
//local
import { activeVariant } from "../helper";

interface BlockProps {
  name: string;
  style: string;
  icon: IconDefinition | string;
}

const BlockButtonComponent: FunctionComponent<BlockProps> = ({ name, style, icon }) => {
  const { editorState, setEditorState } = useContext(context);

  function onClick() {
    const newEditorState = RichUtils.toggleBlockType(editorState, style);
    setEditorState(newEditorState);
  }

  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const blockKey = selection.getStartKey();
  const block = contentState.getBlockForKey(blockKey);

  const active = block.getType() === style;

  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip>{name}</Tooltip>}>
      <Button variant="dark" className={activeVariant(active)} onMouseDown={preventBubbling} onClick={onClick}>
        {isString(icon) ? icon : <FontAwesomeIcon icon={icon} />}
      </Button>
    </OverlayTrigger>
  );
};

export default React.memo(BlockButtonComponent);
