import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { autoUpdater } from "electron-updater";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1200,
    height: 800,
  });

  // mainWindow.setMenuBarVisibility(false);

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    // mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

// ----------------------------------------------------------

autoUpdater.on("checking-for-update", () => {
  sendStatusToWindow("Checking for update...");
});

autoUpdater.on("update-available", (_info) => {
  sendStatusToWindow("Update available.");
});

autoUpdater.on("update-not-available", (_info) => {
  sendStatusToWindow("Update not available.");
});

autoUpdater.on("error", (_err) => {
  sendStatusToWindow("Error in auto-updater.");
});

autoUpdater.on("download-progress", (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message =
    log_message + " - Downloaded " + parseInt(`${progressObj.percent}`) + "%";
  log_message =
    log_message +
    " (" +
    progressObj.transferred +
    "/" +
    progressObj.total +
    ")";
  sendStatusToWindow(log_message);
});

autoUpdater.on("update-downloaded", function (_info) {
  sendStatusToWindow("Update downloaded; will install in 1 seconds");
});

autoUpdater.on("update-downloaded", function (_info) {
  setTimeout(function () {
    autoUpdater.quitAndInstall();
  }, 1000);
});

function sendStatusToWindow(message) {
  console.log(message);
  logs.info(message);
}
