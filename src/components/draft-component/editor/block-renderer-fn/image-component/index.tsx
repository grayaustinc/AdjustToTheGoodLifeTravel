import { EditorState, Modifier, SelectionState } from "draft-js";
import React, { FunctionComponent, PropsWithChildren, useContext } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { Map } from "immutable";

import context from "src/components/draft-component/shared/context";
import { modalContext } from "src/components/draft-component/editor/modal-context";
import { RendererProps } from "src/components/draft-component/shared/block-renderer-fn";
import type { ImageDataType } from "src/modals/image/validation";
import { selectBlock } from "src/components/draft-component/editor/helper";

import NextImageComponent from "src/components/next-image-component";

import selectStyle from "src/components/draft-component/editor/styles/selector.module.scss";

const ImageRenderComponent: FunctionComponent<PropsWithChildren<RendererProps>> = ({ contentState, block, children }) => {
  const { modalIsShowing, imageDispatch } = useContext(modalContext);
  const { editorState, setEditorState } = useContext(context);

  const selectionState = editorState.getSelection();
  const isBlockSelected = selectionState.getAnchorKey() === block.getKey();

  function onImageSelect() {
    const blockSelection = selectBlock(block);
    const editorState_0 = EditorState.forceSelection(editorState, blockSelection);
    setEditorState(editorState_0);
  }

  const data: ImageDataType = block.getData().toObject() as any;

  function onSubmit(values: ImageDataType) {
    const selection = SelectionState.createEmpty(block.getKey());
    const blockData = Map({ type: "IMAGE", ...values });
    const contentStateModify_0 = Modifier.mergeBlockData(contentState, selection, blockData);

    const newEditorState = EditorState.push(editorState, contentStateModify_0, "change-block-data");
    setEditorState(newEditorState);
    imageDispatch({ type: "hide" });
  }

  const handleShow = () => imageDispatch({ type: "show", data, onSubmit });

  return (
    <OverlayTrigger
      trigger="click"
      placement="top"
      show={!modalIsShowing && isBlockSelected}
      overlay={
        <Popover>
          <div style={{ backgroundColor: "#212529" }}>
            <Button variant="dark" onClick={handleShow}>
              Edit Image
            </Button>
          </div>
        </Popover>
      }
    >
      <a className={isBlockSelected ? selectStyle["selection-renderer-active"] : selectStyle["selection-renderer"]}>
        <NextImageComponent data={data} onClick={onImageSelect} />
      </a>
    </OverlayTrigger>
  );
};

export default React.memo(ImageRenderComponent);
