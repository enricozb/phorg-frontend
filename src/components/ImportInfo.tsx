import React from "react";

import axios from "axios";
import useSWR from "swr";

import "../css/ImportInfo.css";

import { fetcher } from "../api/requests";
import { ImportStatus } from "../types";
import { multiselectPathsDialog } from "../utils/electron";

export function ImportButton() {
  const { data: status, error } = useSWR<ImportStatus>(
    "/api/import/status",
    fetcher,

    { refreshInterval: 1000 }
  );

  if (error) {
    return <div className="error">{error.message}</div>;
  }

  if (!status) {
    return <div />;
  }

  if (status.ongoing) {
    return (
      <div className="progress-bar">
        <div
          className="progress-value"
          style={{ width: `${status.percentage * 100}%` }}
        ></div>
      </div>
    );
  }

  return (
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
}
