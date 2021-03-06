const { app, BrowserWindow, ipcMain } = require('electron');
var fs = require('fs');


let mainWindow,
    backgroundWindow;

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function createWindow (code) {
  mainWindow = new BrowserWindow({width: 800, height: 600, minWidth: 600, minHeight: 600});
  backgroundWindow = createBackgroundWindow();
  mainWindow.loadURL(`file:// ${__dirname}/index.html`);

  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.webContents.send('api-code', code);
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  return mainWindow;
}

function createBackgroundWindow() {
  let win = new BrowserWindow({
    show: true
  });

  win.loadURL(`file://${__dirname}/background.html`);
  return win;
}

function createAuthWindow () {

  /* Code for taking screenshots below! */
  // let screenShotWindow = new BrowserWindow({width:1320, height:600, show: true, frame: false});

  // screenShotWindow.webContents.on('did-finish-load', () => {
  //   screenShotWindow.capturePage((img)=>{
  //     fs.writeFile(app.getPath('userData') + '/test.jpeg', img.toJpeg(100), (err) => {
  //         if(err) {
  //             return console.log(err);
  //         }

  //         screenShotWindow.webContents.executeJavaScript(`window.scrollTo(0,600)`);
  //         setTimeout(() => {
  //           screenShotWindow.capturePage((img)=>{
  //             fs.writeFile(app.getPath('userData') + '/test1.jpeg', img.toJpeg(100), (err) => {
  //               if(err) {
  //                 return console.log(err);
  //               }
  //               screenShotWindow.webContents.executeJavaScript(`window.scrollTo(0,1200)`);
  //               setTimeout(() => {
  //                 screenShotWindow.capturePage((img)=>{
  //                   fs.writeFile(app.getPath('userData') + '/test2.jpeg', img.toJpeg(100), (err) => {
  //                     if(err) {
  //                       return console.log(err);
  //                     }
  //                   })
  //                 })  
  //               }, 100)
  //             })
  //           })  
  //         }, 100)

          
          
  //     }); 
  //   })
  // })

  // screenShotWindow.loadURL('http://www.manners.nl/')
  let authWindow = new BrowserWindow({ width: 800, height: 600, show: true });
  
  authWindow.webContents.on('will-navigate', (e, url) => {
    let code = getParameterByName('code', url);
    backgroundWindow = createBackgroundWindow();
    mainWindow = createWindow(code);
  })

  authWindow.loadURL('https://api.pinterest.com/oauth/?response_type=code&client_id=4839736519480585228&state=valid&scope=read_public,write_public&redirect_uri=https://localhost:3000/test.html');
}

app.on('ready', createWindow);


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('load-records', (event, payload) => backgroundWindow.webContents.send('load-records', payload));
ipcMain.on('load-records-done', (event, payload) => mainWindow.webContents.send('load-records-done', payload));
ipcMain.on('filter-records', (event, payload) => backgroundWindow.webContents.send('filter-records', payload));
ipcMain.on('filter-records-done', (event, payload) => mainWindow.webContents.send('filter-records-done', payload));
ipcMain.on('create-record', (event, payload) => backgroundWindow.webContents.send('create-record', payload));
ipcMain.on('update-record', (event, payload) => backgroundWindow.webContents.send('update-record', payload));
ipcMain.on('fuzzy-search-records', (event, payload) => backgroundWindow.webContents.send('fuzzy-search-records', payload));
ipcMain.on('fuzzy-search-records-done', (event, payload) => mainWindow.webContents.send('fuzzy-search-records-done', payload));
ipcMain.on('watch-directory', (event, payload) => backgroundWindow.webContents.send('watch-directory', payload));
ipcMain.on('watch-directory-done', (event, payload) => mainWindow.webContents.send('watch-directory-done', payload));