import React, { FunctionComponent } from "react";
import { faBell, faBellSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

interface SaveButtonProps {
  offState: boolean;
  toggleOffState: () => void;
}

const AutosaveToggleComponent: FunctionComponent<SaveButtonProps> = ({ offState, toggleOffState }) => {
  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip>Turn {offState ? "On" : "Off"} Autosave</Tooltip>}>
      <Button variant="secondary" className="flex-grow-0" onClick={toggleOffState}>
        <FontAwesomeIcon icon={offState ? faBellSlash : faBell} fixedWidth />
      </Button>
    </OverlayTrigger>
  );
};

export default React.memo(AutosaveToggleComponent);
