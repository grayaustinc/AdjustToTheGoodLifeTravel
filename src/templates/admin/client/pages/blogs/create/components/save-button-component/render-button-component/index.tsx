//node_modules
import React, { FunctionComponent } from "react";
import { ButtonGroup, Button, Spinner } from "react-bootstrap";

//relative
import AutosaveToggleComponent from "./autosave-toggle-component";
import HardsaveComponent from "./hardsave-component";

export enum SaveState {
  None = 0,
  Saving = 1,
  Saved = 2,
}

interface SaveButtonProps {
  saveState: SaveState;
  onSave: () => void;
  onHardSave: () => void;
  offState: boolean;
  toggleOffState: () => void;
}

const RenderSaveButtonComponent: FunctionComponent<SaveButtonProps> = ({ saveState, onSave, onHardSave, offState, toggleOffState }) => {
  switch (saveState) {
    case SaveState.Saving:
      return (
        <ButtonGroup className="mx-2 my-1">
          <Button variant="secondary">
            <Spinner animation="border" role="status" size="sm" />
            <span className="ms-2">Saving...</span>
          </Button>
          <HardsaveComponent onHardSave={onHardSave} />
          <AutosaveToggleComponent offState={offState} toggleOffState={toggleOffState} />
        </ButtonGroup>
      );
    case SaveState.Saved:
      return (
        <ButtonGroup className="mx-2 my-1">
          <Button variant="secondary" disabled={true}>
            <span>Saved</span>
          </Button>
          <HardsaveComponent onHardSave={onHardSave} />
          <AutosaveToggleComponent offState={offState} toggleOffState={toggleOffState} />
        </ButtonGroup>
      );
    default:
    case SaveState.None:
      return (
        <ButtonGroup className="mx-2 my-1">
          <Button variant="secondary" onClick={onSave}>
            <span>Save</span>
          </Button>
          <HardsaveComponent onHardSave={onHardSave} />
          <AutosaveToggleComponent offState={offState} toggleOffState={toggleOffState} />
        </ButtonGroup>
      );
  }
};

export default React.memo(RenderSaveButtonComponent);
