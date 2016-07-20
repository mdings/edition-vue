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
  let win = new BrowserWindow({width: 800, height: 600, minWidth: 600, minHeight: 700, titleBarStyle: 'hidden'});
  win.loadURL(`file:// ${__dirname}/index.html`);

  win.webContents.on('dom-ready', () => {
    win.webContents.send('api-code', code);
  });

  win.on('closed', function() {
    win = null;
  });

  return win;
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

app.on('ready', createAuthWindow);

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

ipcMain.on('sync-done', (event, payload) => mainWindow.webContents.send('sync-done', payload));
ipcMain.on('sync-start', (event, payload) => backgroundWindow.webContents.send('sync-start', payload));
