const { app, BrowserWindow, dialog, globalShortcut } = require('electron')
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

  function creatSendWidow () {
    const secondWindow = new BrowserWindow ({
      width:300,
      height: 300,
      webPreferences: {
        contextIsolation: true
      }
    }) 
    secondWindow.loadURL('https:www.baidu.com')
  }

  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()

  // 定义快捷键，组合按键
  globalShortcut.register('CommandOrControl+N', () => {
    creatSendWidow()
  })

  //失去焦点的时候注销组合按键，这个必须要加上
  mainWindow.on('blur', () => {
    globalShortcut.unregister('CommandOrControl+N')
  })



  //打开一个对话框, 属性配置可以打开文件夹，，创建文件夹， 选中多个文件夹
  // mainWindow.webContents.on('did-finish-load', () => {
  //   dialog.showOpenDialog(mainWindow, {
  //     // buttonLabel: '选择',
  //     defaultPath: app.getPath('desktop'), //对话框的默认展示路径
  //     properties: ['openFile', 'openDirectory', 'createDirectory', 'multiSelections']
  //   }).then(result => {
  //     console.log(result.canceled)
  //     console.log(result.filePaths)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // })

  //打开一个messageBox
  const answers = ['Yes', 'No', 'Maybe'] //定义按钮组

  // dialog.showMessageBox({
  //   title: 'Message Box',
  //   message: 'Please select an option',
  //   detail: 'Message details.',
  //   buttons: answers
  // }).then(({response}) => {
  //   console.log(`User selected: ${answers[response]}`)
  // })


}
app.whenReady().then(createWindow)