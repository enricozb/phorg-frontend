import { OpenDialogReturnValue } from "electron";
import { ImportStatus } from "../types";

declare global {
  interface Window {
    electron: {
      openPathDialog: () => Promise<OpenDialogReturnValue>;
      multiselectPathsDialog: () => Promise<OpenDialogReturnValue>;
      onImportStatusUpdate: (
        socketPath: string,
        onData: (status: ImportStatus) => void
      ) => void;
    };
  }
}

export function openPathDialog() {
  return window.electron.openPathDialog();
}

export function multiselectPathsDialog() {
  return window.electron.multiselectPathsDialog();
}

export function onImportStatusUpdate(
  socketPath: string,
  onData: (status: ImportStatus) => void
) {
  return window.electron.onImportStatusUpdate(socketPath, onData);
}
