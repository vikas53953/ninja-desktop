const { Menu, Tray, nativeImage } = require("electron");

function createTray({ onActive, onAmbient, onDeepWork, onToggleStartup, getStartupEnabled, onQuit }) {
  const svg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <rect width="32" height="32" rx="8" fill="#08110F"/>
      <circle cx="16" cy="16" r="10" fill="#1D9E75"/>
      <circle cx="12" cy="14" r="2" fill="#08110F"/>
      <circle cx="20" cy="14" r="2" fill="#08110F"/>
      <rect x="11" y="20" width="10" height="3" rx="1.5" fill="#08110F"/>
    </svg>
  `);
  const image = nativeImage.createFromDataURL(`data:image/svg+xml;charset=utf-8,${svg}`);
  const tray = new Tray(image.resize({ width: 16, height: 16 }));

  tray.setToolTip("NINJA");
  const buildMenu = () =>
    Menu.buildFromTemplate([
      { label: "Open NINJA", click: onActive },
      { label: "Ambient Mode", click: onAmbient },
      { label: "Deep Work Demo", click: onDeepWork },
      {
        label: getStartupEnabled && getStartupEnabled() ? "Disable startup" : "Enable startup",
        click: () => {
          if (onToggleStartup) onToggleStartup();
          tray.setContextMenu(buildMenu());
        }
      },
      { type: "separator" },
      { label: "Quit", click: onQuit }
    ]);

  tray.setContextMenu(buildMenu());
  tray.on("click", onActive);
  return tray;
}

module.exports = { createTray };
