import React from "react";

import "../css/Topbar.css";

interface Props {
  libraryName: string;
  albumName?: string;
}

export function Topbar(props: Props) {
  const topbarText = `${props.libraryName} - ${props.albumName ?? "All Media"}`;
  return (
    <div className="topbar">
      <button className="click-blue" style={{ visibility: "hidden" }}>
        <p>Import Media</p>
      </button>
      <div>{topbarText}</div>
      <button className="click-blue">
        <p>Import Media</p>
      </button>
    </div>
  );
}
