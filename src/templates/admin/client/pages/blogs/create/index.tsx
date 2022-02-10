//node_modules
import React, { FunctionComponent, useCallback, useReducer } from "react";
import { EditorState } from "draft-js";
import { NextComponentType } from "next";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useUpdateEffect } from "react-use";

//editable
import dynamic from "next/dynamic";
const EditableComponent = dynamic(() => import("./components/editable-component"), { ssr: false });

//alert
import AlertProvider from "src/contexts/error-alert/alert-provider";
import AlertComponent from "src/contexts/error-alert/alert-component";

//types
import type { PageProps } from "src/templates/admin/server/paths/blogs/create";
import type { DraftDocumentData } from "libs/arangodb/collections/drafts";
import type { BlogDocumentData } from "libs/arangodb/collections/blogs";

//buttons
import PublisherButtonComponent from "./components/publisher-button-component";
import PreviewButtonComponent from "./components/preview-button-component";
import SaveButtonComponent from "./components/save-button-component";
import HelpButtonComponent from "./components/help-button-component";
import HistoryButtonComponent from "./components/history-button-component";
import ViewButtonComponent from "./components/view-button-component";

//state reducer
import reducer, { ReducerActionEnum, createDefaultState } from "./reducer";

const AdminBlogsCreateEditPage: FunctionComponent<PageProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, createDefaultState(props.blog, props.draft));

  useUpdateEffect(() => {
    dispatch({
      type: ReducerActionEnum.SetAll,
      data: createDefaultState(props.blog, props.draft),
    });
  }, [props]);

  const setEditorState = useCallback(
    (editorState: EditorState) =>
      dispatch({
        type: ReducerActionEnum.InvalidateEditorState,
        editorState: editorState,
      }),
    [dispatch]
  );

  const setHistory = useCallback(
    (draft: DraftDocumentData) =>
      dispatch({
        type: ReducerActionEnum.SetHistoryDraft,
        draft: draft,
      }),
    [dispatch]
  );

  const saveDraft = useCallback(
    (draft: DraftDocumentData) =>
      dispatch({
        type: ReducerActionEnum.SaveDraftData,
        draft: draft,
      }),
    [dispatch]
  );

  const setBlog = useCallback((blog: BlogDocumentData) => dispatch({ type: ReducerActionEnum.UpdateBlogDocument, blog: blog }), [dispatch]);

  const togglePreview = useCallback(() => dispatch({ type: ReducerActionEnum.TogglePreview }), [dispatch]);

  const { preview, editorState, blog, draft, invalidator } = state;
  const contentState = editorState.getCurrentContent();

  return (
    <>
      <AlertProvider>
        <Navbar bg="dark" variant="dark" expand="xl" collapseOnSelect>
          <Navbar.Brand className="ms-2">Blog Editor</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <PublisherButtonComponent blog={blog} draft={draft} setBlog={setBlog} />
              <PreviewButtonComponent preview={preview} togglePreview={togglePreview} />
              <SaveButtonComponent draft={draft} setDraft={saveDraft} contentState={contentState} invalidator={invalidator} />
            </Nav>
            <Nav className="ms-auto">
              <ViewButtonComponent blog={blog} />
              <HistoryButtonComponent blog={blog} draft={draft} setDraft={setHistory} />
              <HelpButtonComponent />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AlertComponent />
      </AlertProvider>
      <EditableComponent preview={preview} editorState={editorState} setEditorState={setEditorState} />
    </>
  );
};

export default React.memo(AdminBlogsCreateEditPage);
