//node_modules
import React, { FunctionComponent, useCallback, useContext, useState } from "react";
import { convertToRaw, ContentState } from "draft-js";
import { useUpdateEffect } from "react-use";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";

//api
import updateDraftDocument from "src/templates/api/admin/db/draft/update/client";
import createDraftDocument from "src/templates/api/admin/db/draft/create/client";

//alert
import useMakeAlert from "src/contexts/error-alert/useMakeAlert";

//libs
import type { DraftDocumentData } from "libs/arangodb/collections/drafts";

//local
import RenderButtonComponent, { SaveState } from "./render-button-component";

type SetDraftType = (draft: DraftDocumentData) => void;

type SaveType = (state: SaveState) => void;

interface SaveButtonProps {
  invalidator: number;
  draft: DraftDocumentData;
  setDraft: SetDraftType;
  contentState: ContentState;
}

async function saveStart(draft: DraftDocumentData, setDraft: SetDraftType, contentState: ContentState, onSave: SaveType, setAlert: (message: string) => void) {
  onSave(SaveState.Saving);
  const content = convertToRaw(contentState);
  try {
    const response = await updateDraftDocument({
      ...draft,
      modified_time: Date.now(),
      content: content,
    });
    if (response.ok) {
      setDraft(response.draft);
      onSave(SaveState.Saved);
    } else {
      setAlert(`Failed to save draft: ${response.message}`);
      onSave(SaveState.None);
    }
  } catch (error) {
    setAlert(`Failed to save draft: ${error}`);
    onSave(SaveState.None);
  }
}

async function hardSaveStart(draft: DraftDocumentData, setDraft: SetDraftType, contentState: ContentState, onSave: SaveType, setAlert: (message: string) => void) {
  onSave(SaveState.Saving);
  const content = convertToRaw(contentState);
  try {
    const response = await createDraftDocument({
      ...draft,
      modified_time: Date.now(),
      content: content,
    });
    if (response.ok) {
      setDraft(response.draft);
      onSave(SaveState.Saved);
    } else {
      setAlert(`Failed to create draft: ${response.message}`);
      onSave(SaveState.None);
    }
  } catch (error) {
    setAlert(`Failed to create draft: ${error}`);
    onSave(SaveState.None);
  }
}

const SaveButtonComponent: FunctionComponent<SaveButtonProps> = ({ draft, setDraft, contentState, invalidator }) => {
  const [saveState, setSaveState] = useState<SaveState>(SaveState.Saved);
  const [offState, setOffState] = useState(false);
  const makeAlert = useMakeAlert();

  const quickSaver = useCallback(debounce(saveStart, 1000, { leading: false }), []);
  const hardSaver = useCallback(throttle(hardSaveStart, 1800000, { leading: false }), []);

  const onSave = useCallback(setSaveState, []);

  const onSaveClick = useCallback(() => saveStart(draft, setDraft, contentState, onSave, makeAlert), [draft, setDraft, contentState, onSave, makeAlert]);
  const onHardSaveClick = useCallback(() => hardSaveStart(draft, setDraft, contentState, onSave, makeAlert), [draft, setDraft, contentState, onSave, makeAlert]);

  const toggleOffState = useCallback(() => setOffState((off) => !off), [setOffState]);

  useUpdateEffect(() => {
    if (offState === false) {
      quickSaver(draft, setDraft, contentState, onSave, makeAlert);
      hardSaver(draft, setDraft, contentState, onSave, makeAlert);
    }
    return () => {
      quickSaver.cancel();
      setSaveState(SaveState.None);
    };
  }, [invalidator]);

  return <RenderButtonComponent saveState={saveState} offState={offState} onSave={onSaveClick} onHardSave={onHardSaveClick} toggleOffState={toggleOffState} />;
};

export default React.memo(SaveButtonComponent);
