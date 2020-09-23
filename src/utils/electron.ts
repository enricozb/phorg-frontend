import { OpenDialogReturnValue } from "electron";

declare global {
  interface Window {
    electron: {
      openPathDialog: () => Promise<OpenDialogReturnValue>
      multiselectPathsDialog: () => Promise<OpenDialogReturnValue>
    };
  }
}

export function openPathDialog() {
  return window.electron.openPathDialog();
}

export function multiselectPathsDialog() {
  return window.electron.multiselectPathsDialog();
}
