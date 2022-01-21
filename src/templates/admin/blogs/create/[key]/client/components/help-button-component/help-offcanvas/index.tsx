import React, { FunctionComponent, useCallback, useRef } from "react";
import { Carousel, Modal, Offcanvas, Button, Row, Col } from "react-bootstrap";

import style from "./help.module.scss";

interface HelpProps {
  show: boolean;
  setShow(value: boolean): void;
}

const HelpOffcanvasComponent: FunctionComponent<HelpProps> = ({ show, setShow }) => {
  const handleHide = useCallback(() => setShow(false), [setShow]);

  return (
    <Offcanvas placement="bottom" show={show} onHide={handleHide} scroll={true} backdrop={false}>
      <Offcanvas.Header className={style["head"]} closeButton>
        <Offcanvas.Title />
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Carousel controls={true} indicators={false} interval={null} variant="dark">
          <Carousel.Item className={style["item"]}>
            <h3 className={style["h"]}>Add Styling</h3>
            <p className={style["p"]}>Select text to change formatting, add headers, or create links.</p>
          </Carousel.Item>
          <Carousel.Item className={style["item"]}>
            <h3 className={style["h"]}>Adding Images/Media</h3>
            <p className={style["p"]}>Add images and other media by starting a new line and clicking the popup below the caret</p>
          </Carousel.Item>
          <Carousel.Item className={style["item"]}>
            <h3 className={style["h"]}>Adding a Subtitle</h3>
            <p className={style["p"]}>By putting an H2 right after an H1, it will automatically be formatted as a Subtitle</p>
          </Carousel.Item>
          <Carousel.Item className={style["item"]}>
            <h3 className={style["h"]}>Adding a Blockquote Source (Citation)</h3>
            <p className={style["p"]}>By putting another blockquote right after the first blockquote, it will automatically be formatted as a citation</p>
          </Carousel.Item>
          <Carousel.Item className={style["item"]}>
            <h3 className={style["h"]}>Adding a Caption</h3>
            <p className={style["p"]}>
              By putting a blockquote right after a non-text block such as an image, video, or seperator; it will automatically be formatted as a caption
            </p>
          </Carousel.Item>
          <Carousel.Item className={style["item"]}>
            <h3 className={style["h"]}>Adding new Blocks</h3>
            <p className={style["p"]}>
              Pressing "Tab" on a non-text block such as an image, video, or seperator; will add a line after it and pressing "Enter" will add a line before it
            </p>
          </Carousel.Item>
          <Carousel.Item className={style["item"]}>
            <h3 className={style["h"]}>Handling SEO</h3>
            <p className={style["p"]}>To customize how your story is distributed and presented to readers, click "settings" in the menu.</p>
          </Carousel.Item>
          <Carousel.Item className={style["item"]}>
            <h3 className={style["h"]}>Keyboard Shortcuts</h3>
            <table className={style["draw_table"]}>
              <tbody>
                <tr>
                  <td className={style["draw_cell"]}>
                    <span className={style["keyboard_key"]}>Ctrl</span>
                    <span> + </span>
                    <span className={style["keyboard_key"]}>Alt</span>
                    <span> + </span>
                    <span className={style["keyboard_key"]}>1</span>
                  </td>
                  <td className={style["draw_cell"]}>Bigger header or title</td>
                </tr>
                <tr>
                  <td className={style["draw_cell"]}>
                    <span className={style["keyboard_key"]}>Ctrl</span>
                    <span> + </span>
                    <span className={style["keyboard_key"]}>Alt</span>
                    <span> + </span>
                    <span className={style["keyboard_key"]}>2</span>
                  </td>
                  <td className={style["draw_cell"]}>Smaller header or subtitle</td>
                  <td className={style["draw_cell"]}>
                    <span className={style["keyboard_key"]}>Ctrl</span>
                    <span> + </span>
                    <span className={style["keyboard_key"]}>B</span>
                  </td>
                  <td className={style["draw_cell"]}>Bold</td>
                </tr>
                <tr>
                  <td className={style["draw_cell"]}>
                    <span className={style["keyboard_key"]}>Ctrl</span>
                    <span> + </span>
                    <span className={style["keyboard_key"]}>Alt</span>
                    <span> + </span>
                    <span className={style["keyboard_key"]}>5</span>
                  </td>
                  <td className={style["draw_cell"]}>Blockquote</td>
                  <td className={style["draw_cell"]}>
                    <span className={style["keyboard_key"]}>Ctrl</span>
                    <span> + </span>
                    <span className={style["keyboard_key"]}>I</span>
                  </td>
                  <td className={style["draw_cell"]}>Italic</td>
                </tr>
                <tr>
                  <td className={style["draw_cell"]}>
                    <span className={style["keyboard_key"]}>*</span>
                    <span> + </span>
                    <span className={style["keyboard_key"]}>Space</span>
                  </td>
                  <td className={style["draw_cell"]}>Bulleted List</td>
                  <td className={style["draw_cell"]}>
                    <span className={style["keyboard_key"]}>Ctrl</span>
                    <span> + </span>
                    <span className={style["keyboard_key"]}>Enter</span>
                  </td>
                  <td className={style["draw_cell"]}>Insert a Seperator</td>
                </tr>
                <tr>
                  <td className={style["draw_cell"]}>
                    <span className={style["keyboard_key"]}>1</span>
                    <span> + </span>
                    <span className={style["keyboard_key"]}>.</span>
                    <span> + </span>
                    <span className={style["keyboard_key"]}>Space</span>
                  </td>
                  <td className={style["draw_cell"]}>Ordered List</td>
                </tr>
              </tbody>
            </table>
          </Carousel.Item>
          <Carousel.Item className={style["item"]}>
            <h3 className={style["h"]}>Final Regards</h3>
            <p className={style["p"]}>If you need any more help, you know who to contact!</p>
          </Carousel.Item>
        </Carousel>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default React.memo(HelpOffcanvasComponent);
