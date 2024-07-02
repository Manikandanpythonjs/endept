const { app, BrowserWindow, safeStorage } = require('electron');
const path = require('path');
// const isDev = require('electron-is-dev')
const isDev = process.env.NODE_ENV !== 'development';
function createWindow() {
    const window = new BrowserWindow({
        width: 1000,
        height: 700,
        roundedCorners: true,
        // resizable: false,

        center: true,
        title: "Endept file vault",
        // autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, './preload/preload.js'),
            nodeIntegration: true,
            contextIsolation: true
        }
    });

    if (isDev) {
        window.webContents.loadURL("http://localhost:8100/");
    } else {
        window.loadFile(path.join(__dirname, "../index.html"));
    }

    if (safeStorage.isEncryptionAvailable()) {



    } else {
        console.error('Encryption is not available');
    }


    // window.removeMenu(); // Uncomment this if you want to remove the menu
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
