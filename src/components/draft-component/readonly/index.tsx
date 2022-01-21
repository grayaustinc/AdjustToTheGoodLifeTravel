import { Editor, ContentState, EditorState } from "draft-js";
import React, { FunctionComponent } from "react";

//shared
import { DraftProvider } from "src/components/draft-component/shared/context";
import getBlockStyle from "src/components/draft-component/shared/block-style-fn";
//readonly
import blockRendererFn from "src/components/draft-component/readonly/block-renderer-fn";
import decorators from "src/components/draft-component/readonly/decorators";

import "draft-js/dist/Draft.css";

interface EditorProps {
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
}

export function createReadonlyState(contentState: ContentState) {
  return EditorState.createWithContent(contentState, decorators);
}

const DraftJsReadonlyComponent: FunctionComponent<EditorProps> = ({ editorState, setEditorState }) => {
  return (
    <DraftProvider value={{ editorState, setEditorState }}>
      <Editor editorKey="editor" readOnly={true} editorState={editorState} onChange={setEditorState} blockRendererFn={blockRendererFn} blockStyleFn={getBlockStyle} />
    </DraftProvider>
  );
};

export default React.memo(DraftJsReadonlyComponent);
