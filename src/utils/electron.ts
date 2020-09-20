import { OpenDialogReturnValue } from "electron";

declare global {
  interface Window {
    electron: {
      openPathDialog: () => Promise<OpenDialogReturnValue>
    };
  }
}

export function openPathDialog() {
  return window.electron.openPathDialog();
}
