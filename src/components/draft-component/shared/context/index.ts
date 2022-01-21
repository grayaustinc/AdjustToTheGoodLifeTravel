import { EditorState } from "draft-js";
import { createContext } from "react";

export interface DraftContext {
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
}

const context = createContext<DraftContext>({} as any);

export const DraftProvider = context.Provider;

export default context;
