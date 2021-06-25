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
  //打开调试工具
  // mainWindow.maximize()
  const wc = mainWindow.webContents
  wc.openDevTools()
  
  let mainsession = wc.session
  //加载本地html
  mainWindow.loadFile('index.html')



  const secondWindow = new  BrowserWindow({
    width: 600,
    height:600,
    webPreferences: {
      contextIsolation: true
    }
  })

  secondWindow.webContents.openDevTools()
  secondWindow.loadFile('index.html')

  //获取session的两种方式，一个是通过webContents获取，还可以通过导入session获取defaultSession来得到
  // let secondSession = wc.session  //实现了session共享
  let secondSession = session.defaultSession //实现了session共享


  console.log(Object.is(mainsession, secondSession)) //true 




}

app.whenReady().then(createWindow)