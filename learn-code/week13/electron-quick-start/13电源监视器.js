const { app, BrowserWindow, powerMonitor} = require('electron')
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
  mainWindow.loadFile('index.html')

  powerMonitor.on('on-battery', () => {
    console.log('您正在使用电池，请注意电量的续航')
  })

  powerMonitor.on('resume', e => {
    console.log('系统恢复了')
    if(!mainWindow) createWindow()
  })

  powerMonitor.on('suspend', e => {
    console.log('系统挂起了----')
  })


}
app.whenReady().then(createWindow)