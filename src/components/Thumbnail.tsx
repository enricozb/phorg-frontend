import React from "react";

import { scrollToCenter } from "../utils/scroll";
import { guid } from "../types";
import "../css/Thumbnail.css";

interface Props {
  cursor: boolean;
  selected: boolean;
  mediaId: guid;
  libraryId: guid;
}

export function Thumbnail(props: Props) {
  return (
    <div
      ref={(ref) => {
        if (ref && props.cursor) {
          scrollToCenter(ref);
        }
      }}
      className={`thumbnail ${props.selected ? "selected" : ""} ${
        props.cursor ? "cursor" : ""
      }`}
    >
      <img
        alt={`Media identified by the following guid: ${props.mediaId}`}
        src={`/api/thumb/${props.libraryId}/${props.mediaId}`}
      />
    </div>
  );
}
