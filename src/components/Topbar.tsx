import React from "react";

import { LibraryPreview } from "../types";
import { ImportButton } from "./Import";
import "../css/Topbar.css";

interface Props {
  library: LibraryPreview;
  albumName?: string;
}

export function Topbar(props: Props) {
  const topbarText = `${props.library.id} - ${props.albumName ?? "All Media"}`;

  return (
    <div className="topbar">
      <div className="title">{topbarText}</div>
      <ImportButton libraryId={props.library.id} />
    </div>
  );
}
