import createWindow from "./create-window";
import { autoUpdater } from "electron-updater";

export { createWindow };

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
