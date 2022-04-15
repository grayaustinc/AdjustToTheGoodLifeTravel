//import node_modules
import React, { FunctionComponent } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNowStrict";
import format from "date-fns/format";

//types
import type { readingTime } from "reading-time-estimator";

interface PublishedProps {
  published_time: number;
  read_time: ReturnType<typeof readingTime>;
}

const PublishedComponent: FunctionComponent<PublishedProps> = ({ published_time, read_time }) => {
  return (
    <div>
      <small>
        <span>Published </span>
        <span>
          {format(published_time, "PPP")} ({formatDistanceToNow(published_time, { addSuffix: true })})
        </span>
        <span> • </span>
        <span>{read_time.text}</span>
      </small>
    </div>
  );
};

export default React.memo(PublishedComponent);
