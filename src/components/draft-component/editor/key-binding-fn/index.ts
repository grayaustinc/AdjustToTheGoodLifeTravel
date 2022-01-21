import React from "react";
import { DraftEditorCommand, Modifier, EditorState, SelectionState, RichUtils, getDefaultKeyBinding } from "draft-js";
import { addBlockBeforeSelection, addBlockAfterSelection, createEmptyBlock, selectBlock, removeBlock, createAtomicPart, replaceBlockAtSelection } from "../helper";

type SetEditorState = (editorState: EditorState) => void;

function addTabToEditorState(editorState: EditorState, setEditorState: SetEditorState) {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();

  const contentState_0 = Modifier.replaceText(contentState, selection, "\t");
  const editorState_0 = EditorState.push(editorState, contentState_0, "insert-characters");
  const editorState_1 = EditorState.forceSelection(editorState_0, contentState_0.getSelectionAfter());
  setEditorState(editorState_1);
}

function addOrderedListToEditorState(editorState: EditorState, setEditorState: SetEditorState) {
  const selection = editorState.getSelection();
  const blockKey = selection.getStartKey();

  const editorState_0 = RichUtils.toggleBlockType(editorState, "ordered-list-item");
  const contentState_0 = editorState_0.getCurrentContent();

  const blockSelection = new SelectionState({
    anchorKey: blockKey,
    anchorOffset: 0,
    focusKey: blockKey,
    focusOffset: 2,
  });

  const contentState_1 = Modifier.replaceText(contentState_0, blockSelection, "");
  const editorState_1 = EditorState.push(editorState_0, contentState_1, "insert-characters");
  const editorState_2 = EditorState.forceSelection(editorState_1, contentState_1.getSelectionAfter());
  setEditorState(editorState_2);
}

function addUnorderedListToEditorState(editorState: EditorState, setEditorState: SetEditorState) {
  const selection = editorState.getSelection();
  const blockKey = selection.getStartKey();

  const editorState_0 = RichUtils.toggleBlockType(editorState, "unordered-list-item");
  const contentState_0 = editorState_0.getCurrentContent();

  const blockSelection = new SelectionState({
    anchorKey: blockKey,
    anchorOffset: 0,
    focusKey: blockKey,
    focusOffset: 1,
  });

  const contentState_1 = Modifier.replaceText(contentState_0, blockSelection, "");
  const editorState_1 = EditorState.push(editorState_0, contentState_1, "insert-characters");
  const editorState_2 = EditorState.forceSelection(editorState_1, contentState_1.getSelectionAfter());
  setEditorState(editorState_2);
}

function getKeyBindingFn(editorState: EditorState, setEditorState: SetEditorState) {
  function keyBindingFn(e: React.KeyboardEvent<{}>): DraftEditorCommand | null {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const blockKey = selectionState.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    if (e.ctrlKey && e.key === "b") {
      const newEditorState = RichUtils.toggleInlineStyle(editorState, "BOLD");
      setEditorState(newEditorState);
      return null;
    }
    if (e.ctrlKey && e.key === "i") {
      const newEditorState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
      setEditorState(newEditorState);
      return null;
    }
    if (e.ctrlKey && e.key === "Enter") {
      const contentState_0 = replaceBlockAtSelection(editorState, createAtomicPart());
      const editorState_0 = EditorState.push(editorState, contentState_0, "insert-fragment");
      setEditorState(editorState_0);
      return null;
    }
    if (e.ctrlKey && e.altKey && e.key === "1") {
      const newEditorState = RichUtils.toggleBlockType(editorState, "header-one");
      setEditorState(newEditorState);
      return null;
    }
    if (e.ctrlKey && e.altKey && e.key === "2") {
      const newEditorState = RichUtils.toggleBlockType(editorState, "header-two");
      setEditorState(newEditorState);
      return null;
    }
    if (e.ctrlKey && e.altKey && e.key === "5") {
      const newEditorState = RichUtils.toggleBlockType(editorState, "blockquote");
      setEditorState(newEditorState);
      return null;
    }
    if (e.key === "Enter") {
      const offset = selectionState.getFocusOffset();
      const textLength = block.getLength();
      if (block.getType() === "atomic") {
        //create a new empty unstyled block before atomic
        const newBlock = createEmptyBlock();
        const newSelection = selectBlock(newBlock);
        const contentState_0 = addBlockBeforeSelection(editorState, newBlock);
        const editorState_0 = EditorState.push(editorState, contentState_0, "insert-fragment");
        const editorState_1 = EditorState.forceSelection(editorState_0, newSelection);
        setEditorState(editorState_1);
        e.preventDefault();
        return null;
      }
      if (offset === 0) {
        //not sure
      }
      if (offset === textLength) {
        if (block.getType() === "ordered-list-item" || block.getType() === "unordered-list-item") {
          return getDefaultKeyBinding(e);
        }
        //create new empty unstyled block after selection
        const newBlock = createEmptyBlock();
        const newSelection = selectBlock(newBlock);
        const contentState_0 = addBlockAfterSelection(editorState, newBlock);
        const editorState_0 = EditorState.push(editorState, contentState_0, "insert-fragment");
        const editorState_1 = EditorState.forceSelection(editorState_0, newSelection);
        setEditorState(editorState_1);
        e.preventDefault();
        return null;
      }
      return getDefaultKeyBinding(e);
    }
    if (e.key === "Backspace") {
      const offset = selectionState.getFocusOffset();
      if (block.getType() === "atomic") {
        const contentState_0 = removeBlock(editorState, block);
        const editorState_0 = EditorState.push(editorState, contentState_0, "remove-range");
        setEditorState(editorState_0);
        e.preventDefault();
        return null;
      }
      if (offset === 0 && selectionState.isCollapsed()) {
        if (block.getLength() === 0 && contentState.getBlockMap().size > 1) {
          //remove empty block from existence
          const contentState_0 = removeBlock(editorState, block);
          const editorState_0 = EditorState.push(editorState, contentState_0, "remove-range");
          setEditorState(editorState_0);
          e.preventDefault();
          return null;
        }
        const before = contentState.getBlockBefore(blockKey);
        if (before?.getType() === "atomic") {
          //block before is atomic
          const contentState_0 = removeBlock(editorState, before);
          const editorState_0 = EditorState.push(editorState, contentState_0, "remove-range");
          setEditorState(editorState_0);
          e.preventDefault();
          return null;
        }
      }
      return getDefaultKeyBinding(e);
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (block.getType() === "atomic") {
        const newBlock = createEmptyBlock();
        const newSelection = selectBlock(newBlock);
        const contentState_0 = addBlockAfterSelection(editorState, newBlock);
        const editorState_0 = EditorState.push(editorState, contentState_0, "insert-fragment");
        const editorState_1 = EditorState.forceSelection(editorState_0, newSelection);
        setEditorState(editorState_1);
        e.preventDefault();
        return null;
      }
      addTabToEditorState(editorState, setEditorState);
      e.preventDefault();
      return null;
    }
    if (e.key === " ") {
      if (block.getType() === "unstyled" && block.getText().startsWith("1.")) {
        addOrderedListToEditorState(editorState, setEditorState);
        e.preventDefault();
        return null;
      }
      if (block.getType() === "unstyled" && (block.getText().startsWith("-") || block.getText().startsWith("*"))) {
        addUnorderedListToEditorState(editorState, setEditorState);
        e.preventDefault();
        return null;
      }
    }
    return getDefaultKeyBinding(e);
  }
  return keyBindingFn;
}

export default getKeyBindingFn;
