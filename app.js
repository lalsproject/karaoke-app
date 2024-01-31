const { app, BrowserWindow } = require('electron');

let mainWindow;
let playWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 784, height: 830,autoHideMenuBar: true,transparent:true});
  mainWindow.loadURL('http://localhost:3000');

  playWindow = new BrowserWindow({ width: 1366, height: 768,visibleOnFullScreen: true,frame: false,webPreferences: {
            nodeIntegration: true
        }});
  // playWindow.setIgnoreMouseEvents(true);
  playWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  playWindow.setAlwaysOnTop(true, 'screen-saver', 1);
  playWindow.setMenu(null);

  playWindow.loadURL('http://localhost:3000/play');

  mainWindow.setMenu(null);
  mainWindow.on('closed', () => {
    try{
      playWindow.close();
    }catch{
      console.log('exit program');
    }
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
