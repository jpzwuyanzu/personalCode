const { app, BrowserWindow } = require('electron')
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
  
  // 加载本地html代码
  mainWindow.loadURL('https://www.baidu.com')
  // mainWindow.loadFile('index.html')

  const secondWindow = new BrowserWindow({
    parent: mainWindow, // 声明当前窗口的父级， 移动父级子级窗口也跟着改变，子级窗口可以自由拖动
    // modal: true, // 锁定在主窗口 --- 没有 关闭 最小化 最大化 --- 不可以拖动
    // movable: false, // 限制了 子级窗口不可以拖动
    width: 300,
    height: 300,
    webPreferences: {
      contextIsolation: true
    }
  })

  secondWindow.loadFile('index.html')

  mainWindow.on('focus', () => {
    console.log('父级获取焦点')
  })

  secondWindow.on('focus', () => {
    console.log('子级获取焦点')
  })
  secondWindow.on('blur', () => {
    console.log('子级失去焦点')
  })


  //静态方法getAllWindows
  let allWindows = BrowserWindow.getAllWindows()
   console.log(allWindows)

   //窗口id
   console.log(mainWindow.id)
   console.log(secondWindow.id)

   // maximize()
   //关闭子窗口，父级窗口最大化
  secondWindow.on('closed', () => {
    mainWindow.maximize() //自定义窗口最大化
  })


}



app.whenReady().then(createWindow)

app.on('browser-window-focus', () => {
  console.log('获取焦点')
})

app.on('browser-window-blur', () => {
  console.log('失去焦点')
})