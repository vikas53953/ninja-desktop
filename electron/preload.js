const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ninja", {
  getState: () => ipcRenderer.invoke("ninja:get-state"),
  setMode: (mode) => ipcRenderer.invoke("ninja:set-mode", { mode }),
  sendMessage: (message) => ipcRenderer.invoke("ninja:send-message", { message }),
  transcribeAudio: (audioBuffer, mimeType) =>
    ipcRenderer.invoke("ninja:transcribe-audio", { audioBuffer, mimeType }),
  speak: (text) => ipcRenderer.invoke("ninja:speak", { text }),
  runTool: (toolName, params, confirmation) =>
    ipcRenderer.invoke("ninja:tool", { toolName, params, confirmation }),
  onModeChanged: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on("ninja:mode-changed", listener);
    return () => ipcRenderer.removeListener("ninja:mode-changed", listener);
  },
  onDeepWorkDemo: (callback) => {
    const listener = () => callback();
    ipcRenderer.on("ninja:deep-work-demo", listener);
    return () => ipcRenderer.removeListener("ninja:deep-work-demo", listener);
  }
});

