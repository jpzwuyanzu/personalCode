const electron = require('electron')
const { app, BrowserWindow , ipcMain, shell, nativeImage, clipboard} = require('electron')
const path = require('path')
const fs = require('fs')
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
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, //放置渲染器访问Electron内部的或者require功能， 为true就会隔断，为false就是允许
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()

  //使用shell在用户的默认浏览器中打开 URL 的示例:
  //当在app中想打开网页，可以使用这个实现
  //shell.openExternal('https://www.baidu.com')

  const splashPath = `${__dirname}/tray.png`
  // shell.openPath(splashPath) //打开预览图片
  // shell.showItemInFolder(splashPath) //打开文件夹并且选中图片

 // shell.moveItemToTrash(splashPath) //删除图片到回收站

 //nativeImage  拿到本地一张图片地址
//  const nativeimgurl = nativeImage.createFromPath(`${__dirname}/tray.png`)

//  const img = nativeimgurl.toJPEG(100)
  // fs.writeFile(`${__dirname}/test.jpg`, img, () => {
  //   console.log(1111)
  // })

// 剪切板
// clipboard.writeText('测试剪切板的写入')
// console.log(clipboard.readText())


//通过加切板把复制一张图片保存到本地
// console.log(clipboard.readImage())
// var img = clipboard.readImage().toJPEG(100)
//  fs.writeFile(`${__dirname}/aaa.jpg`, img, () => {
//     console.log(222)
//   })

}
app.whenReady().then(createWindow)