import React, { FunctionComponent, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { RichUtils } from "draft-js";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import context from "src/components/draft-component/shared/context";
import { preventBubbling } from "src/components/draft-component/editor/helper";

import { activeVariant } from "../helper";

interface InlineProps {
  name: string;
  style: string;
  icon: IconDefinition;
}

const InlineButtonComponent: FunctionComponent<InlineProps> = ({ name, style, icon }) => {
  const { editorState, setEditorState } = useContext(context);

  function onClick() {
    const newEditorState = RichUtils.toggleInlineStyle(editorState, style);
    setEditorState(newEditorState);
  }

  const active = editorState.getCurrentInlineStyle().has(style);

  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip>{name}</Tooltip>}>
      <Button variant="dark" className={activeVariant(active)} onMouseDown={preventBubbling} onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
      </Button>
    </OverlayTrigger>
  );
};

export default React.memo(InlineButtonComponent);
