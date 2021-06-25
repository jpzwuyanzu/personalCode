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


  //自定义session
  // 关闭所有窗口，发现创建的localstorage又消失了，因为此时的session存储在内存里，
  //重新启动应用又消失了。可以加前缀persist，使其变为永久存储：
  let customSession = session.fromPartition('persist:part1')
  const secondWindow = new  BrowserWindow({
    width: 600,
    height:600,
    webPreferences: {
      contextIsolation: true,
      session: customSession //不同子窗口实现session自定义
      // partition: 'persist:part1' //或者可以单独通过这个也能实现自定义存储永久存储效果

    }
  })

  customSession.clearStorageData() //清除指定窗口的存储的storage数据

  secondWindow.webContents.openDevTools()
  secondWindow.loadFile('index.html')



}

app.whenReady().then(createWindow)