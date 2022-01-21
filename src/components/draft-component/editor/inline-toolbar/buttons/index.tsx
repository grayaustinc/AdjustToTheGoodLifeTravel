import React, { FunctionComponent } from "react";
import { faBold, faItalic, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

import InlineButtonComponent from "./inline-button-component";
import BlockButtonComponent from "./block-button-component";
import SeperatorComponent from "./seperator-component";
import LinkButtonComponent from "./link-button-component";

const InlineToolbar: FunctionComponent = () => {
  return (
    <div style={{ backgroundColor: "#212529" }}>
      <InlineButtonComponent name="Bold" style="BOLD" icon={faBold} />
      <InlineButtonComponent name="Italic" style="ITALIC" icon={faItalic} />
      <LinkButtonComponent />
      <SeperatorComponent />
      <BlockButtonComponent name="Header 1" style="header-one" icon="H1" />
      <BlockButtonComponent name="Header 2" style="header-two" icon="H2" />
      <BlockButtonComponent name="Blockquote" style="blockquote" icon={faQuoteLeft} />
    </div>
  );
};

export default React.memo(InlineToolbar);
