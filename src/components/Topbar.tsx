import React from "react";

import { Album, Library } from "../types";

import "../css/Topbar.css";

interface Props {
  library: Library;
  album: Album;
};

export function Topbar(props: Props) {
  const topbarText = props.album ? props.album.name : "Pics";
  return <div className="topbar">{topbarText}</div>;
}
