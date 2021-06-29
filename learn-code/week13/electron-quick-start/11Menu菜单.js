const { app, BrowserWindow, Menu, MenuItem } = require('electron')

const mainMenu = Menu.buildFromTemplate(require('./mainMenu')) // 从配置中中构建菜单模版


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

  //添加menu菜单
  Menu.setApplicationMenu(mainMenu)

  


}
app.whenReady().then(createWindow)