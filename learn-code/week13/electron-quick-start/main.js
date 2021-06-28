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

  //设置cookie
  const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
  session.defaultSession.cookies.set(cookie)
    .then(() => {
      // success
      console.log('111')
    }, (error) => {
      console.error(error)
    })

    // 查询所有 cookies。
  session.defaultSession.cookies.get({})
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

  //参考地址： https://www.electronjs.org/docs/api/cookies#cookiessetdetails


}

app.whenReady().then(createWindow)