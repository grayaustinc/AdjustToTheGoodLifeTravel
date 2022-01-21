import { Editor, ContentState, EditorState } from "draft-js";
import React, { FunctionComponent, useCallback } from "react";

import InlineToolbar from "./inline-toolbar";
import SideToolbar from "./side-toolbar";

import decorators from "src/components/draft-component/editor/decorators";

import { DraftProvider } from "src/components/draft-component/shared/context";
import ModalProviderComponent from "src/components/draft-component/editor/modal-context";
import blockRendererFn from "src/components/draft-component/editor/block-renderer-fn";
import getBlockStyle from "src/components/draft-component/shared/block-style-fn";
import getKeyBindingFn from "src/components/draft-component/editor/key-binding-fn";

import "draft-js/dist/Draft.css";

interface EditorProps {
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
}

export function createEditorState(contentState: ContentState): EditorState {
  return EditorState.createWithContent(contentState, decorators);
}

const DraftJsEditableComponent: FunctionComponent<EditorProps> = ({ editorState, setEditorState }) => {
  const keyBindingFn = useCallback(getKeyBindingFn(editorState, setEditorState), [editorState, setEditorState]);

  return (
    <DraftProvider value={{ editorState, setEditorState }}>
      <ModalProviderComponent>
        <Editor
          editorKey="editor"
          readOnly={false}
          editorState={editorState}
          onChange={setEditorState}
          blockRendererFn={blockRendererFn}
          blockStyleFn={getBlockStyle}
          keyBindingFn={keyBindingFn}
          spellCheck={true}
        />
        <InlineToolbar />
        <SideToolbar />
      </ModalProviderComponent>
    </DraftProvider>
  );
};

export default DraftJsEditableComponent;
