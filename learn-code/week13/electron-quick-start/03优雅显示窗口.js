const {app, BrowserWindow} = require('electron')

//BrowserWindow创建窗口和控制窗口行为
function createWindow() {
  console.log(`4app is ready ? --- ${app.isReady()}`) // true
  const mainWidow = new BrowserWindow({
    width: 800,
    height: 650,
    backgroundColor: '#f66',
    show: false, //默认不显示窗口
    webPreferences: {
      contextIsolation: true
    }
  })

  //加载远程链接
  // mainWidow.loadURL('https://zh.nuxtjs.org/')

  //加载本地html
  mainWidow.loadFile('./index.html')

  //优雅的显示窗口
  //这里主动显示，此时url页面已经加载完成，可以避免页面白屏，但是等待时间加长了
  mainWidow.once('ready-to-show', () => {
    mainWidow.show() 
  })
}

app.whenReady().then(createWindow)
