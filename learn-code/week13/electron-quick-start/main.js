const { app, BrowserWindow, webContents, session } = require('electron')
// 创建和控制浏览器窗口
function createWindow () {
  // 主窗口
  const mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 660,
    webPreferences: {
      contextIsolation: true
    }
  })
  
  // mainWindow.maximize() //窗口最大化
  const wc = mainWindow.webContents
  wc.openDevTools() //打开调试工具
  let mainsession = wc.session  //通过webContens获取session
  mainWindow.loadFile('index.html') //加载本地html
}

app.whenReady().then(createWindow)