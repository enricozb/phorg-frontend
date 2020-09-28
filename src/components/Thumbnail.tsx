import React from "react";

import { guid } from "../types";
import "../css/Thumbnail.css";

interface Props {
  mediaId: guid;
  libraryId: guid;
}

export function Thumbnail(props: Props) {
  return (
    <div className="thumbnail">
      <img src={`/api/thumb/${props.libraryId}/${props.mediaId}`} />
    </div>
  );
}
