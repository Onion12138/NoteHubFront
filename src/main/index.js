import { app, BrowserWindow, ipcMain, globalShortcut } from "electron";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\");
}

let mainWindow;

const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  //应用内主界面
  mainWindow = new BrowserWindow({
    height: 800,
    width: 600,
    title: "notehub",
    useContentSize: true,
    autoHideMenuBar: true,
    // frame: false, //无边框
    resizable: true,
    webPreferences: {
      // devTools: false,
      webSecurity: false,
    },
  });

  mainWindow.setMenu(null);
  mainWindow.loadURL(winURL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  if (process.platform === "darwin") {
    let contents = mainWindow.webContents;
    globalShortcut.register("CommandOrControl+C", () => {
      contents.copy();
    });
    globalShortcut.register("CommandOrControl+V", () => {
      contents.paste();
    });
    globalShortcut.register("CommandOrControl+Z", () => {
      contents.undo();
    });
    globalShortcut.register("CommandOrControl+X", () => {
      contents.cut();
    });
  }
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("login", () => {
  console.log("login");
  mainWindow.setSize(1000, 650);
});

ipcMain.on("logout", () => {
  console.log("logout");
  mainWindow.setSize(600, 800);
});
