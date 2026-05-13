const { app, BrowserWindow, globalShortcut, ipcMain, screen, Notification, dialog } = require("electron");
const path = require("path");
const dotenv = require("dotenv");
const { createTray } = require("./tray");
const { askBrain } = require("../services/brain");
const { transcribeAudio, synthesizeSpeech } = require("../services/voice");
const { executeTool } = require("../services/tools");
const { ensureMemoryFiles } = require("../services/memory");
const { startWakeWord } = require("../services/wakeword");
const { startAutonomousLoop } = require("../services/autonomousLoop");

dotenv.config({ path: path.join(process.cwd(), ".env") });

let mainWindow;
let tray;
let mode = "ambient";
let wakewordStatus = "disabled";
let autonomousLoop;
let startupStatus = "not_checked";
let wakewordController;

function providerStatus() {
  return {
    openai: process.env.OPENAI_API_KEY ? "configured" : "missing_key",
    elevenLabs:
      process.env.ELEVEN_LABS_API_KEY && process.env.ELEVEN_LABS_VOICE_ID ? "configured" : "missing_key",
    wakeword: wakewordStatus,
    startup: startupStatus
  };
}

function getBounds(nextMode) {
  const display = screen.getPrimaryDisplay();
  const { width, height, x, y } = display.workArea;

  if (nextMode === "active") {
    return { x: x + width - 392, y, width: 392, height };
  }

  if (nextMode === "deep-work") {
    return { x, y, width, height: 64 };
  }

  return { x: x + width - 132, y: y + height - 152, width: 112, height: 132 };
}

function applyMode(nextMode) {
  mode = nextMode;
  if (!mainWindow) return;
  mainWindow.setBounds(getBounds(nextMode), true);
  mainWindow.setAlwaysOnTop(true, "screen-saver");
  mainWindow.webContents.send("ninja:mode-changed", { mode, providerStatus: providerStatus() });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    ...getBounds("ambient"),
    frame: false,
    transparent: true,
    resizable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  const rendererUrl = process.env.ELECTRON_RENDERER_URL;
  if (rendererUrl) {
    mainWindow.loadURL(rendererUrl);
  } else {
    mainWindow.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function registerIpc() {
  ipcMain.handle("ninja:get-state", async () => ({ mode, providerStatus: providerStatus() }));

  ipcMain.handle("ninja:set-mode", async (_event, payload) => {
    const nextMode = payload && payload.mode;
    if (!["ambient", "active", "deep-work"].includes(nextMode)) {
      return { ok: false, error: "Invalid NINJA mode." };
    }
    applyMode(nextMode);
    return { ok: true, mode };
  });

  ipcMain.handle("ninja:send-message", async (_event, payload) => {
    const message = String((payload && payload.message) || "").trim();
    if (!message) return { ok: false, error: "Message is required." };
    return askBrain(message);
  });

  ipcMain.handle("ninja:transcribe-audio", async (_event, payload) => {
    if (!payload || !payload.audioBuffer) {
      return { ok: false, error: "Audio payload is required." };
    }
    return transcribeAudio(Buffer.from(payload.audioBuffer), payload.mimeType || "audio/webm");
  });

  ipcMain.handle("ninja:speak", async (_event, payload) => {
    const text = String((payload && payload.text) || "").trim();
    if (!text) return { ok: false, error: "Text is required." };
    return synthesizeSpeech(text);
  });

  ipcMain.handle("ninja:tool", async (_event, payload) => {
    return executeTool(payload && payload.toolName, payload && payload.params, {
      confirmation: payload && payload.confirmation,
      notify: (title, body) => {
        if (Notification.isSupported()) new Notification({ title, body }).show();
      },
      confirm: async (message) => {
        const result = await dialog.showMessageBox(mainWindow, {
          type: "warning",
          buttons: ["Allow", "Block"],
          defaultId: 1,
          cancelId: 1,
          message: "NINJA confirmation required",
          detail: message
        });
        return result.response === 0;
      }
    });
  });
}

function configureStartup() {
  if (process.platform !== "win32") return "not_windows";
  try {
    app.setLoginItemSettings({
      openAtLogin: true,
      path: process.execPath,
      args: app.isPackaged ? [] : [process.argv[1]].filter(Boolean)
    });
    return app.getLoginItemSettings().openAtLogin ? "enabled" : "disabled";
  } catch (_error) {
    return "failed";
  }
}

app.whenReady().then(async () => {
  ensureMemoryFiles();
  startupStatus = configureStartup();
  createWindow();
  registerIpc();

  tray = createTray({
    onActive: () => applyMode("active"),
    onAmbient: () => applyMode("ambient"),
    onDeepWork: () => {
      applyMode("deep-work");
      if (mainWindow) mainWindow.webContents.send("ninja:deep-work-demo");
    },
    onQuit: () => app.quit()
  });

  globalShortcut.register("Alt+N", () => {
    applyMode(mode === "active" ? "ambient" : "active");
  });

  wakewordController = await startWakeWord(() => applyMode("active"));
  wakewordStatus = wakewordController.status;
  autonomousLoop = startAutonomousLoop({
    notify: (title, body) => {
      if (Notification.isSupported()) new Notification({ title, body }).show();
    }
  });
});

app.on("window-all-closed", (event) => {
  event.preventDefault();
});

app.on("before-quit", () => {
  globalShortcut.unregisterAll();
  if (autonomousLoop && autonomousLoop.stop) autonomousLoop.stop();
  if (wakewordController && wakewordController.stop) wakewordController.stop();
  if (tray) tray.destroy();
});
