import React, { useEffect, useState } from "react";

import { connect, ConnectedProps } from "react-redux";
import axios from "axios";

import { Modal } from "./modals/Modal";
import { ImportStatus, State } from "../types";
import {
  multiselectPathsDialog,
  onImportStatusUpdate,
} from "../utils/electron";
import { ReactComponent as WarningSVG } from "../img/warning.svg";
import "../css/ImportInfo.css";

const mapState = ({ library }: State) => ({
  library,
});
const mapDispatch = {};

const connector = connect(mapState, mapDispatch);
type Props = ConnectedProps<typeof connector>;

function ImportButtonImpl(props: Props) {
  const [showingErrors, setShowingErrors] = useState(false);
  const [importStatus, setImportStatus] = useState({
    ongoing: false,
    percentage: 0,
    message: "",
    errors: [],
    media: [],
  } as ImportStatus);

  useEffect(() => {
    onImportStatusUpdate("/tmp/phorg_import.sock", (status: ImportStatus) => {
      console.log('updating status', status);
      setImportStatus(status);
    });
  }, []);

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
      onClick={async () => {
        const { canceled, filePaths } = await multiselectPathsDialog();
        if (!canceled) {
          await axios.post("/api/import", {
            libraryId: props.library!.id,
            paths: filePaths,
          });
        }
      }}
    >
      <p>Import Media</p>
    </button>
  );
}

export const ImportButton = connector(ImportButtonImpl);

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
