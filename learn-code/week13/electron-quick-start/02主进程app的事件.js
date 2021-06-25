const {app, BrowserWindow} = require('electron')


// app.on('ready', () => {
//   console.log('ready')
// })

//创建窗口
function createWindow() {
  console.log(`4app is ready ? --- ${app.isReady()}`) // true
  const mainWidow = new BrowserWindow({
    width: 800,
    height: 650,
    webPreferences: {
      contextIsolation: true
    }
  })

  mainWidow.loadURL('https://www.baidu.com')
  console.log(`3app is ready ? --- ${app.isReady()}`) //true


  //getPath:  你可以通过这些名称请求下列路径： 应用： 可以在下载资源，指定下载目录地址， 上传， 读取一些本地文件信息指定目录
  console.log(app.getPath('desktop'))
  console.log(app.getPath('music'))
  console.log(app.getPath('temp'))
  console.log(app.getPath('userData'))
}


// app.on('ready', createWindow) //这个是以前的写法

console.log(`1app is ready ? --- ${app.isReady()}`) //false

app.whenReady().then(createWindow)

console.log(`2app is ready ? --- ${app.isReady()}`) //false

app.on('open-url', (e) => {
  console.log('打开url地址')
  e.preventDefault()
})


//监听退出
app.on('before-quit', () => {
  console.log('app quit')
})


//失去焦点
app.on('browser-window-blur', () => {
  console.log('失去焦点')
  // setTimeout(() => {
  //   app.quit() //失去焦点后，三秒退出应用
  // },3000)
})

//获取焦点
app.on('browser-window-focus', () => {
  console.log('获取焦点')

})


