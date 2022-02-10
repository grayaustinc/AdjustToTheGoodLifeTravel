import { Reducer } from "react";
import { convertFromRaw, EditorState } from "draft-js";

import type { DraftDocumentData } from "libs/arangodb/collections/drafts";
import type { BlogDocumentData } from "libs/arangodb/collections/blogs";

import { createEditorState } from "src/components/draft-component/editor";

interface ReducerState {
  invalidator: number;
  blog: BlogDocumentData;
  draft: DraftDocumentData;
  preview: boolean;
  editorState: EditorState;
}

export enum ReducerActionEnum {
  InvalidateEditorState = 1,
  TogglePreview = 5,
  UpdateBlogDocument = 12,
  SaveDraftData = 7,
  SetHistoryDraft = 9,
  SetAll = 23,
}

type InvalidateUpdate = {
  type: ReducerActionEnum.InvalidateEditorState;
  editorState: EditorState;
};

type TogglePreview = {
  type: ReducerActionEnum.TogglePreview;
};

type SaveDraftData = {
  type: ReducerActionEnum.SaveDraftData;
  draft: DraftDocumentData;
};

type SetHistoryDraft = {
  type: ReducerActionEnum.SetHistoryDraft;
  draft: DraftDocumentData;
};

type UpdateBlog = {
  type: ReducerActionEnum.UpdateBlogDocument;
  blog: BlogDocumentData;
};

type SetAll = {
  type: ReducerActionEnum.SetAll;
  data: ReducerState;
};

type ReducerAction = InvalidateUpdate | TogglePreview | SaveDraftData | UpdateBlog | SetHistoryDraft | SetAll;

function invalidateEditorState(state: ReducerState, action: InvalidateUpdate): ReducerState {
  const prevContentState = state.editorState.getCurrentContent();
  const newContentState = action.editorState.getCurrentContent();
  const equal = newContentState.equals(prevContentState);
  const invalidator = state.invalidator + (equal ? 0 : 1);
  return {
    ...state,
    invalidator: invalidator,
    editorState: action.editorState,
  };
}

function togglePreview(state: ReducerState, _: TogglePreview): ReducerState {
  const preview = !state.preview;
  return {
    ...state,
    preview: preview,
  };
}

function setHistoryDraft(state: ReducerState, action: SetHistoryDraft): ReducerState {
  const editorState = createEditorState(convertFromRaw(action.draft.content));
  return {
    ...state,
    draft: action.draft,
    editorState: editorState,
  };
}

function saveDraftData(state: ReducerState, action: SaveDraftData): ReducerState {
  return {
    ...state,
    draft: action.draft,
  };
}

function updateBlogDocument(state: ReducerState, action: UpdateBlog): ReducerState {
  return {
    ...state,
    blog: action.blog,
  };
}

function setAll(_: ReducerState, action: SetAll): ReducerState {
  return action.data;
}

export function createDefaultState(blog: BlogDocumentData, draft: DraftDocumentData): ReducerState {
  return {
    invalidator: 0,
    blog: blog,
    draft: draft,
    editorState: createEditorState(convertFromRaw(draft.content)),
    preview: false,
  };
}

const reducer: Reducer<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case ReducerActionEnum.InvalidateEditorState:
      return invalidateEditorState(state, action);
    case ReducerActionEnum.TogglePreview:
      return togglePreview(state, action);
    case ReducerActionEnum.SaveDraftData:
      return saveDraftData(state, action);
    case ReducerActionEnum.SetHistoryDraft:
      return setHistoryDraft(state, action);
    case ReducerActionEnum.UpdateBlogDocument:
      return updateBlogDocument(state, action);
    case ReducerActionEnum.SetAll:
      return setAll(state, action);
  }
};

export default reducer;
