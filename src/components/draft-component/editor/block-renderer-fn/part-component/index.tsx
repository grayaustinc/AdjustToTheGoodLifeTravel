import React, { FunctionComponent, useContext } from "react";
import { EditorState } from "draft-js";

import context from "src/components/draft-component/shared/context";
import { RendererProps } from "src/components/draft-component/shared/block-renderer-fn";
import { selectBlock } from "src/components/draft-component/editor/helper";

import PartComponent from "src/components/draft-component/shared/components/part-component";

import selectStyle from "src/components/draft-component/editor/styles/selector.module.scss";

const PartRenderComponent: FunctionComponent<RendererProps> = ({ block }) => {
  const { editorState, setEditorState } = useContext(context);

  const selectionState = editorState.getSelection();
  const isBlockSelected = selectionState.getAnchorKey() === block.getKey();

  function onSelect() {
    const blockSelection = selectBlock(block);
    const editorState_0 = EditorState.forceSelection(editorState, blockSelection);
    setEditorState(editorState_0);
  }

  return (
    <div className={isBlockSelected ? selectStyle["selection-renderer-active"] : selectStyle["selection-renderer"]} onClick={onSelect}>
      <PartComponent />
    </div>
  );
};

export default React.memo(PartRenderComponent);
