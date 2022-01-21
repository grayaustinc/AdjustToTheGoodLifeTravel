import React, { FunctionComponent } from "react";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

interface SaveButtonProps {
  onHardSave: () => void;
}

const HardSaveComponent: FunctionComponent<SaveButtonProps> = ({ onHardSave }) => {
  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip>Creates a new save state in the history dropdown</Tooltip>}>
      <Button variant="secondary" className="flex-grow-0" onClick={onHardSave}>
        <FontAwesomeIcon icon={faSave} fixedWidth />
      </Button>
    </OverlayTrigger>
  );
};

export default React.memo(HardSaveComponent);
