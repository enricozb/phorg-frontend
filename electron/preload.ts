import { remote } from "electron";

declare global {
  interface Window {
    electron: any;
  }
}

window.electron = {
  openPathDialog() {
    return remote.dialog.showOpenDialog({ properties: ["openDirectory"] });
  },
};
