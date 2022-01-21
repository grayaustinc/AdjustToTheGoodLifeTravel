import { CSSProperties, FunctionComponent, useEffect, useRef, useState } from "react";
import { Button, Overlay, Tooltip, Popover, ButtonGroup } from "react-bootstrap";

import EditorButtons from "./buttons";

import styles from "./inline.module.scss";

const toolbarShowClassname = styles["inline-toolbar-show"];
const toolbarHideClassname = styles["inline-toolbar-hide"];

const InlineToolbarComponent: FunctionComponent = () => {
  const selection = window.getSelection() || undefined;

  const [show, setShow] = useState(false);
  const [toolbarClassName, setToolbarClassname] = useState(toolbarHideClassname);
  const [style, setStyle] = useState<CSSProperties>({});

  const tooltip = useRef<HTMLDivElement>(null);

  function onEntering() {
    setToolbarClassname(toolbarShowClassname);
  }

  function onExit() {
    setToolbarClassname(toolbarHideClassname);
  }

  useEffect(() => {
    if (tooltip.current && selection && !selection.isCollapsed) {
      const r = selection.getRangeAt(0).getBoundingClientRect();
      setStyle({
        top: r.top + window.scrollY,
        left: r.left + window.scrollX,
        width: r.width,
        height: r.height,
      });
      setShow(true);
    } else {
      setShow(false);
    }
  }, [selection?.isCollapsed, tooltip, setStyle]);

  return (
    <>
      <div ref={tooltip} className={toolbarClassName} style={style} />
      <Overlay target={tooltip.current} show={show} onEntering={onEntering} onExit={onExit} placement="top">
        {(props) => (
          <Popover {...props}>
            <EditorButtons />
          </Popover>
        )}
      </Overlay>
    </>
  );
};

export default InlineToolbarComponent;
