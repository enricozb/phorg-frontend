import { remote, OpenDialogReturnValue } from "electron";
import * as net from "net";

declare global {
  interface Window {
    electron: any;
  }
}

window.electron = {
  openPathDialog(): Promise<OpenDialogReturnValue> {
    return remote.dialog.showOpenDialog({ properties: ["openDirectory"] });
  },

  multiselectPathsDialog(): Promise<OpenDialogReturnValue> {
    return remote.dialog.showOpenDialog({
      properties: ["openFile", "multiSelections"],
    });
  },

  onImportStatusUpdate(
    socketPath: string,
    onData: (importStatus: any) => void
  ) {
    const server = net.createServer((client: any) => {
      console.log("client connected");
      client.setEncoding("utf8");
      client.on("end", () => {
        console.log("client disconnected");
      });

      const chunks = [] as string[];
      client.on("data", (chunk: string) => {
        if (chunk.includes("\n")) {
          const [lastchunk, ...rest] = chunk.split("\n");
          onData(JSON.parse([...chunks, lastchunk].join("")));

          // clear array and send remaining chunks
          chunks.length = 0;
          while (rest.length > 1) {
            const missed = rest.shift();
            onData(JSON.parse(missed));
          }

          // the very last chunk isn't the last message
          if (rest.length == 1) {
            chunks.push(rest[0]);
          }
        } else {
          chunks.push(chunk);
        }
      });
    });

    server.on("listening", () => {
      console.log(`Server listening`);
    });
    server.listen(socketPath);
  },
};
