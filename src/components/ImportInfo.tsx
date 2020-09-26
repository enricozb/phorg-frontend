import React, { useState } from "react";

import axios from "axios";
import useSWR from "swr";

import { Modal } from "./modals/Modal";
import { fetcher } from "../api/requests";
import { ImportStatus } from "../types";
import { multiselectPathsDialog } from "../utils/electron";
import { ReactComponent as WarningSVG } from "../img/warning.svg";
import "../css/ImportInfo.css";

export function ImportButton() {
  const [showingErrors, setShowingErrors] = useState(false);
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

  const hasErrors = status.errors.length > 0;

  if (hasErrors || status.ongoing) {
    return (
      <>
        {showingErrors && (
          <ErrorModal
            errors={status.errors}
            onRequestHide={() => setShowingErrors(false)}
          />
        )}
        <div className={`progress ${hasErrors ? "error" : ""}`}>
          {hasErrors && (
            <div className="warning" onClick={() => setShowingErrors(true)}>
              <WarningSVG  />
              <span>Import Errors</span>
            </div>
          )}
          {!hasErrors && status.message && (
            <div className="status">
              {status.message}
            </div>
          )}
          <div className={`bar ${hasErrors ? "error" : ""}`}>
            <div
              className="value"
              style={{ width: `${status.percentage * 100}%` }}
            ></div>
          </div>
        </div>
      </>
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

interface ErrorModalProps {
  errors: string[];
  onRequestHide: () => void;
}

function ErrorModal(props: ErrorModalProps) {
  return (
    <Modal title="Errors" onRequestHide={props.onRequestHide}>
      {props.errors.map((error, i) => (
        <li key={i}>{error}</li>
      ))}
    </Modal>
  );
}
