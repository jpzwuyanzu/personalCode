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
  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()

  //下载文件,显示进度条效果
  let ses = session.defaultSession

  ses.downloadURL('http://placehold.it/2000X2000') // 图片的下载地址
  ses.on('will-download', (e, downloadItem, webContents) => {

    let fileName = downloadItem.getFilename()
    let fileSize = downloadItem.getTotalBytes()

    // Save to desktop
    downloadItem.setSavePath(app.getPath('desktop') + `/${fileName}`)

    downloadItem.on('updated', (e, state) => {

      let received = downloadItem.getReceivedBytes()

      if (state === 'progressing' && received) {
        let progress = Math.round((received/fileSize)*100)
        mainWindow.webContents.executeJavaScript(`window.progress.value = ${progress}`)
      }
    })
  })


}
app.whenReady().then(createWindow)