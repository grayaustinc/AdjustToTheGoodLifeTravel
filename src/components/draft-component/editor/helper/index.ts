import { ContentBlock, ContentState, EditorState, SelectionState, genKey } from "draft-js";
import { Map } from "immutable";

export function createEntitySelection(blockKey: string, start: number, end: number) {
  return new SelectionState({
    anchorKey: blockKey,
    focusKey: blockKey,
    focusOffset: end,
    anchorOffset: start,
    hasFocus: true,
  });
}

export function isCurrentInsideTarget(current: SelectionState, target: SelectionState) {
  if (current.getAnchorKey() !== target.getAnchorKey()) return false;
  const current_start = current.getAnchorOffset();
  const current_end = current.getFocusOffset();
  const target_start = target.getAnchorOffset();
  const target_end = target.getFocusOffset();
  return current_start >= target_start && current_end <= target_end;
}

export function isEntityActive(editorState: EditorState, entityType?: string) {
  const content = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  let count = 0;
  content.getBlocksAsArray().forEach((block) => {
    block.findEntityRanges(
      (character) => {
        if (character.getEntity() !== null) {
          const entity = content.getEntity(character.getEntity());
          if (!entityType || (entityType && entity.getType() === entityType)) {
            return true;
          }
        }
        return false;
      },
      (start, end) => {
        if (start <= selection.getStartOffset() && end >= selection.getEndOffset()) {
          return count++;
        }
      }
    );
  });
  return count > 0;
}

function getBlock(editorState: EditorState, offset: number) {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const blockArray = contentState.getBlocksAsArray();
  const index = blockArray.findIndex((value) => value.getKey() === selectionState.getAnchorKey());
  if (index + offset < 0 || index + offset >= blockArray.length) {
    return null;
  }
  return blockArray[index + offset];
}

export function getBlockBeforeSelected(editorState: EditorState) {
  return getBlock(editorState, -1);
}

export function getBlockAfterSelected(editorState: EditorState) {
  return getBlock(editorState, 1);
}

function replaceBlock(editorState: EditorState, newBlock: ContentBlock, offset: number) {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const blockArray = contentState.getBlocksAsArray();
  const index = blockArray.findIndex((value) => value.getKey() === selectionState.getAnchorKey());
  if (index + offset >= 0) {
    blockArray[index + offset] = newBlock;
  } else {
    blockArray.push(newBlock);
  }
  return ContentState.createFromBlockArray(blockArray, contentState.getEntityMap());
}

export function replaceBlockBeforeSelection(editorState: EditorState, newBlock: ContentBlock) {
  return replaceBlock(editorState, newBlock, -1);
}

export function replaceBlockAfterSelection(editorState: EditorState, newBlock: ContentBlock) {
  return replaceBlock(editorState, newBlock, 1);
}

export function replaceBlockAtSelection(editorState: EditorState, newBlock: ContentBlock) {
  return replaceBlock(editorState, newBlock, 0);
}

function addBlock(editorState: EditorState, newBlock: ContentBlock, offset: number) {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const blockArray = contentState.getBlocksAsArray();
  const index = blockArray.findIndex((value) => value.getKey() === selectionState.getAnchorKey());
  if (index + offset >= 0) {
    blockArray.splice(index + offset, 0, newBlock);
  } else {
    blockArray.push(newBlock);
  }
  return ContentState.createFromBlockArray(blockArray, contentState.getEntityMap());
}

export function addBlockBeforeSelection(editorState: EditorState, newBlock: ContentBlock) {
  return addBlock(editorState, newBlock, 0);
}

export function addBlockAfterSelection(editorState: EditorState, newBlock: ContentBlock) {
  return addBlock(editorState, newBlock, 1);
}

export function removeBlock(editorState: EditorState, block: ContentBlock) {
  const contentState = editorState.getCurrentContent();
  const blockArray = contentState.getBlocksAsArray();
  const index = blockArray.findIndex((value) => value.getKey() === block.getKey());
  if (index >= 0 && index < blockArray.length) {
    blockArray.splice(index, 1);
  }
  return ContentState.createFromBlockArray(blockArray, contentState.getEntityMap());
}

export function createEmptyBlock() {
  const block = new ContentBlock({
    key: genKey(),
    type: "unstyled",
    text: "",
  });
  return block;
}

export function createAtomicPart() {
  const block = new ContentBlock({
    key: genKey(),
    type: "atomic",
    text: "",
    data: Map({ type: "PART" }),
  });
  return block;
}

export function selectBlock(block: ContentBlock) {
  const selection = new SelectionState({
    anchorKey: block.getKey(),
    anchorOffset: 0,
    focusKey: block.getKey(),
    focusOffset: block.getLength(),
    hasFocus: true,
    isBackward: false,
  });
  return selection;
}

export const preventBubbling: React.MouseEventHandler = (event) => event.preventDefault();
