import React, { useEffect, useState } from "react";

import axios from "axios";
import useSWR, { mutate } from "swr";
import { Button, Text } from "rebass";

import { Modal } from "./modals/Modal";
import { guid, ImportStatus, Socket } from "../types";
import {
  multiselectPathsDialog,
  onImportStatusUpdate,
} from "../utils/electron";
import { fetcher } from "../api/requests";
import { ReactComponent as WarningSVG } from "../img/warning.svg";
import "../css/Import.css";

export function ImportButton(props: { libraryId: guid }) {
  const [showingErrors, setShowingErrors] = useState(false);
  const [importStatus, setImportStatus] = useState({
    ongoing: false,
    complete: false,
    percentage: 0,
    message: "",
    errors: [],
    media: {},
  } as ImportStatus);

  const { data: socket, error } = useSWR<Socket>("/api/connect", fetcher);

  useEffect(() => {
    if (socket) {
      onImportStatusUpdate(socket.path, async (status: ImportStatus) => {
        if (status.complete) {
          setImportStatus({ ...status, ongoing: true });

          // delay the final message by a second so the progress bar shows completion
          setTimeout(() => setImportStatus(status), 1000);

          await axios.post("/api/media", {
            libraryId: props.libraryId,
            media: status.media,
          });

          mutate(`/api/libraries/${props.libraryId}`);
        } else {
          setImportStatus(status);
        }
      });
    }
  }, [props.libraryId, socket]);

  if (error) {
    return null;
  }

  const hasErrors = importStatus.errors.length > 0;

  if (hasErrors || importStatus.ongoing) {
    return (
      <>
        {showingErrors && (
          <ErrorModal
            errors={importStatus.errors}
            onRequestHide={() => setShowingErrors(false)}
          />
        )}
        <div className={`progress ${hasErrors ? "error" : ""}`}>
          {hasErrors && (
            <div className="warning" onClick={() => setShowingErrors(true)}>
              <WarningSVG />
              <span>Import Errors</span>
            </div>
          )}
          {!hasErrors && importStatus.message && (
            <div className="message">{importStatus.message}</div>
          )}
          <div className={`bar ${hasErrors ? "error" : ""}`}>
            <div
              className="value"
              style={{ width: `${importStatus.percentage * 100}%` }}
            ></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <button
      className="click-blue"
      tabIndex={-1}
      onClick={async () => {
        const { canceled, filePaths } = await multiselectPathsDialog();
        if (!canceled) {
          await axios.post("/api/import", {
            libraryId: props.libraryId,
            paths: filePaths,
          });
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
    <Modal onRequestHide={props.onRequestHide}>
      {props.errors.map((error, i) => (
        <li key={i}>{error}</li>
      ))}
    </Modal>
  );
}
