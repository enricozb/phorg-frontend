import { app, BrowserWindow } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "interop.js"),
      nodeIntegration: false,

      // took me a whole morning to find this stupid setting
      // from: https://stackoverflow.com/a/63612780/6101419
      enableRemoteModule: true,
    },
  });

  mainWindow.setMenu(null);
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL(process.env.ELECTRON_START_URL!);
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
