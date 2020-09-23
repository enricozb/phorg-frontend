import React from "react";

import axios from "axios";
import useSWR from "swr";

import "../css/Topbar.css";
import { fetcher } from "../api/requests";
import { ImportStatus } from "../types";
import { multiselectPathsDialog } from "../utils/electron";

interface Props {
  libraryName: string;
  albumName?: string;
}

export function Topbar(props: Props) {
  const topbarText = `${props.libraryName} - ${props.albumName ?? "All Media"}`;

  const { data, error } = useSWR("/api/import/status", fetcher);
  const status = data as ImportStatus;

  const importButton = error ? (
    <div className="error">{error.message}</div>
  ) : (
    <button
      className="click-blue"
      onClick={async () => {
        const { canceled, filePaths } = await multiselectPathsDialog();
        if (!canceled) {
          await axios.post("/api/import", { paths: filePaths });
        }
      }}
    >
      <p>Import Media</p>
    </button>
  );

  return (
    <div className="topbar">
      {React.cloneElement(importButton, { style: { visibility: "hidden" } })}
      <div>{topbarText}</div>
      {importButton}
    </div>
  );
}
