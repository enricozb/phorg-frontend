import React from "react";

import { LibraryMedia } from "../types";
import "../css/Grid.css";

interface Props {
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

  return <div className="grid">Grid</div>;
}
