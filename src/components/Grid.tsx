import React from "react";

import { Thumbnail } from "./Thumbnail";
import { guid, LibraryMedia } from "../types";
import "../css/Grid.css";

interface Props {
  libraryId: guid;
  media: LibraryMedia;
}

export function Grid(props: Props) {
  if (Object.keys(props.media.items).length === 0) {
    return (
      <div className="grid empty">
        There doesn't seem to be anything here...
      </div>
    );
  }

  return (
    <div className="grid">
      {Object.entries(props.media.items).map(([id, mediaEntry], i) => (
        <Thumbnail key={i} libraryId={props.libraryId} mediaId={id} />
      ))}
    </div>
  );
}
