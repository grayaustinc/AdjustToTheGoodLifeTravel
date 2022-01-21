import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEllipsisH, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Button, Overlay, Popover, ButtonGroup, OverlayTrigger, Tooltip } from "react-bootstrap";

import context from "src/components/draft-component/shared/context";

import ImageButtonComponent from "./image-button-component";
import YoutubeButtonComponent from "./youtube-button-component";
import PartButtonComponent from "./part-button-component";

const preventBubbling: React.MouseEventHandler = (event) => event.preventDefault();

const SideToolbarComponent: FunctionComponent = () => {
  const { editorState } = useContext(context);
  const [show, setShow] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(false);
    const selection = editorState.getSelection();
    if (!selection.getHasFocus()) {
      setShow(false);
      return;
    }

    const contentState = editorState.getCurrentContent();

    const block = contentState.getBlockForKey(selection.getStartKey());

    if (block.getType() === "atomic") {
      setShow(false);
      return;
    }

    if (block.getText().length > 0) {
      setShow(false);
      return;
    }

    const nodes = document.querySelectorAll<HTMLDivElement>(`[data-offset-key="${block.getKey()}-0-0"]`);

    if (nodes.length === 0) {
      setShow(false);
      return;
    }

    setReferenceElement(nodes[nodes.length - 1]);
    setShow(true);
  }, [editorState]);

  const toggleDisplay = () => setDisplay((display) => !display);

  return (
    <>
      <Overlay target={referenceElement} show={show} placement="bottom-start">
        {(props) => (
          <Popover {...props}>
            <ButtonGroup>
              <Button variant="dark" onClick={toggleDisplay} onMouseDown={preventBubbling}>
                <FontAwesomeIcon fixedWidth icon={display ? faTimes : faPlus} />
              </Button>
              {display && (
                <>
                  <ImageButtonComponent />
                  <YoutubeButtonComponent />
                  <PartButtonComponent />
                </>
              )}
            </ButtonGroup>
          </Popover>
        )}
      </Overlay>
    </>
  );
};

export default SideToolbarComponent;
