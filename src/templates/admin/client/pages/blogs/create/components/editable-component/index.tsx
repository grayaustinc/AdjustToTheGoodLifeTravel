import React, { FunctionComponent } from "react";
import { EditorState } from "draft-js";

import EditorComponent from "src/components/draft-component/editor";
import ReadonlyComponent, { createReadonlyState } from "src/components/draft-component/readonly";

import BlogContainerComponent from "src/components/blog-container-component";

interface EditableProps {
  preview?: boolean;
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
}

const EditableComponent: FunctionComponent<EditableProps> = ({ preview, editorState, setEditorState }) => {
  if (preview) {
    const readonlyState = createReadonlyState(editorState.getCurrentContent());
    return (
      <BlogContainerComponent>
        <ReadonlyComponent editorState={readonlyState} setEditorState={setEditorState} />
      </BlogContainerComponent>
    );
  }
  return (
    <BlogContainerComponent>
      <EditorComponent editorState={editorState} setEditorState={setEditorState} />
    </BlogContainerComponent>
  );
};

export default EditableComponent;
