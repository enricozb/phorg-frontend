import { spawn } from "child_process";

declare global {
  interface Window {
    interop: any;
  }
}

window.interop = { spawn };
