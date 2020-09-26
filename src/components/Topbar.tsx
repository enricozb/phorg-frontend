import React from "react";

import "../css/Topbar.css";
import { ImportButton } from "./Import";

interface Props {
  libraryName: string;
  albumName?: string;
}

export function Topbar(props: Props) {
  const topbarText = `${props.libraryName} - ${props.albumName ?? "All Media"}`;

  return (
    <div className="topbar">
      <div className="title">{topbarText}</div>
      <ImportButton/>
    </div>
  );
}
