import React, { FunctionComponent } from "react";
import YouTube from "react-youtube";

import type { YoutubeDataType } from "src/components/draft-component/shared/validation/youtube";

import styles from "./youtube.module.scss";

interface YoutubeProps {
  data: YoutubeDataType;
}

const YoutubeComponent: FunctionComponent<YoutubeProps> = ({ data }) => {
  return (
    <YouTube
      videoId={data.videoId}
      className={styles["responsive-iframe"]}
      containerClassName={styles["container"]}
      opts={{
        playerVars: {
          color: "red",
          autoplay: 0,
          modestbranding: undefined,
          rel: 0,
        },
      }}
    />
  );
};

export default React.memo(YoutubeComponent);
