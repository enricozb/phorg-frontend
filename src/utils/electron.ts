declare global {
  interface Window {
    electron: {
      openPathDialog: () => string
    };
  }
}

export function openPathDialog(): string {
  return window.electron.openPathDialog();
}
