import React from "react";

import { Media } from "../types";
import "../css/Grid.css";

interface Props {
  media: Media[];
}

export function Grid(props: Props) {
  if (props.media.length === 0) {
    return (
      <div className="grid empty">
        There doesn't seem to be anything here...
      </div>
    );
  }

  return <div className="grid">Grid</div>;
}
