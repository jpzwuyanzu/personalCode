const electron = require('electron')
const { app, BrowserWindow , ipcMain} = require('electron')
const path = require('path')
// 创建和控制浏览器窗口
function createWindow () {
  let primaryDisplay = electron.screen.getPrimaryDisplay()
  console.log(primaryDisplay)
  // 主窗口
  const mainWindow = new BrowserWindow({
    // minWidth: 800,
    // minHeight: 660,
    x: primaryDisplay.bounds.x,
    y: primaryDisplay.bounds.y,
    width: primaryDisplay.bounds.width/2,
    height: primaryDisplay.bounds.height,


    //第一种解决方案把contextIsolation: false,  --旧版electron
    // webPreferences: {
    //   contextIsolation: false, //放置渲染器访问Electron内部的或者require功能， 为true就会隔断，为false就是允许
    //   nodeIntegration: true,
    //   enableRemoteModule: true
    // }

    //第二种解决方案就是把dom操作放在preload.js中 --- 新版本electron 
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, //放置渲染器访问Electron内部的或者require功能， 为true就会隔断，为false就是允许
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()

  //主窗口监听当页面加载完毕，主进程给渲染进程发送数据
 mainWindow.webContents.on('did-finish-load', () => {
  mainWindow.webContents.send('my-wevent', {a: 1, b: 2})
 })

  //接收渲染进程发送的数据
  ipcMain.on('renderer-data-main', (event, args) => {
    console.log(args)
    event.sender.send('main-data-renderer', '主进程接收到数据')
  })

  
// process（进程）， screen（屏幕）
// console.log(process.platform)




}
app.whenReady().then(createWindow)