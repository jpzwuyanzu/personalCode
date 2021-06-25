const { app, BrowserWindow } = require('electron')
// 创建和控制浏览器窗口
function createWindow () {
  // 主窗口
  const mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 660,
    // frame: false, // 设置窗口无边框
    backgroundColor: '#f66',
    titleBarStyle: 'hidden', // 显示🚥
    webPreferences: {
      contextIsolation: true
    }
  })
  
  // 加载本地html代码
  // mainWindow.loadURL('https://www.baidu.com')
  mainWindow.loadFile('index.html')

  // const secondWindow = new BrowserWindow({
  //   parent: mainWindow, // 声明当前窗口的父级， 移动父级子级窗口也跟着改变，子级窗口可以自由拖动
  //   modal: true, // 锁定在主窗口 --- 没有 关闭 最小化 最大化 --- 不可以拖动
  //   // movable: false, // 限制了 子级窗口不可以拖动
  //   width: 300,
  //   height: 300,
  //   show: false,
  //   webPreferences: {
  //     contextIsolation: true
  //   }
  // })

  // secondWindow.loadFile('index.html')
  // secondWindow.show()
  // setTimeout(() => {
  //   secondWindow.hide()
  // }, 2000)
}

app.whenReady().then(createWindow)