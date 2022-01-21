import { ContentBlock } from "draft-js";

import styles from "./styles.module.scss";

function handleTypes(block: ContentBlock, value: string[] = []): string[] {
  value.push(styles["ff"]);
  switch (block.getType()) {
    case "atomic":
      value.push(styles["atom"]);
      break;
    case "blockquote":
      value.push(styles["bl"]);
      value.push("blockquote");
      value.push(styles["blockquote"]);
      break;
    case "header-one":
      value.push(styles["bl"]);
      value.push(styles["h1"]);
      break;
    case "header-two":
      value.push(styles["bl"]);
      value.push(styles["h2"]);
      break;
    case "unordered-list-item":
      value.push(styles["ul"]);
      break;
    case "ordered-list-item":
      value.push(styles["ol"]);
      break;
    default:
      value.push(styles["bl"]);
      break;
  }
  return value;
}

function getBlockStyle(block: ContentBlock): string {
  const classNames: string[] = [];

  handleTypes(block, classNames);

  return classNames.join(" ");
}

export default getBlockStyle;
