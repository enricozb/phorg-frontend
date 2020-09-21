import { remote, OpenDialogReturnValue } from "electron";

declare global {
  interface Window {
    electron: any;
  }
}

window.electron = {
  openPathDialog(): Promise<OpenDialogReturnValue> {
    return remote.dialog.showOpenDialog({ properties: ["openDirectory"] });
  },
};