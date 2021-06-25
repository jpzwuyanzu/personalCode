const { app, BrowserWindow, webContents } = require('electron')
// 创建和控制浏览器窗口
function createWindow () {
  // 主窗口
  const mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 660,
    webPreferences: {
      // devTools: true,  //没有打开开发者工具
      contextIsolation: true,
      // images: true
    }
  })

  //打开调试工具
  const wc = mainWindow.webContents
  wc.openDevTools()

  // 实例事件
  
  // wc.on('dom-ready', () => {
  //   console.log('DOM Ready')
  // })

  // wc.on('did-finish-load', () => {
  //   console.log('Conent fully loaded')
  // })

  // new-window

  wc.on('new-window', (e, url) => {
    e.preventDefault() //加上这个阻止默认事件，不会打开新窗口了
    console.log('DOM Ready')
  })

  //context-menu : 右键上下文信息，可以用来做粘贴复制操作
  wc.on('context-menu', (e, params) => {
    console.log(params)
    console.log(`Context menu opened on: ${params.mediaType} at x:${params.x}, y:${params.y}`)
  })
  
  wc.on('context-menu', (e, params) => {
    console.log(`User seleted text: ${params.selectionText}`)
    console.log(`Selection can be copied: ${params.editFlags.canCopy}`)
  })



  



  //返回 WebContents[] - 所有 WebContents 实例的数组
  // console.log(webContents.getAllWebContents())

  //加载本地html
  mainWindow.loadFile('index.html')
}

app.whenReady().then(createWindow)