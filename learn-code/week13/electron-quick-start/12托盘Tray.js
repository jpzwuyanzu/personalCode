const { app, BrowserWindow, Menu, MenuItem, Tray } = require('electron')

const mainMenu = Menu.buildFromTemplate(require('./mainMenu')) // 从配置中中构建菜单模版
const contextMenu  = Menu.buildFromTemplate([
  {
    label: '测试'
  },
  {
    label: '检查',
    role: 'toggleDevTools'

  }
])

const trayMenu = Menu.buildFromTemplate([
  {
    label: '关于'
  },
  {
    label: '选项'
  },
  {
    label: '退出', role: 'quit'
  }
])

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

  //生成托盘图标
  const tray = new Tray('tray.png') //简易图片大小16*16
  // tray.setTitle('electron tray') 
  tray.setToolTip('electron tray')

  //实现按住shift键点击托盘图标应用自动退出，否则就是应用的显示和隐藏
  tray.on('click', e => {
    if(e.shiftKey) {
      console.log('按住了shift键点击了图标')
      app.quit()
    } else {
      console.log('点击了图标')
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    }
  })


  mainWindow.loadFile('index.html')

  //添加menu菜单
  Menu.setApplicationMenu(mainMenu) 

  //右键点击菜单项
  mainWindow.webContents.on('context-menu', () => {
    contextMenu.popup()
  })

  //添加托盘的菜单项
  tray.setContextMenu(trayMenu)


}
app.whenReady().then(createWindow)