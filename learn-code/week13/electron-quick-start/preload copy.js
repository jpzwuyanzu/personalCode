// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const  remote  = require('electron').remote
const { BrowserWindow } = remote
//在当前的版本中。引入 screen 为undefined
//无需引入 可以直接使用
const { webFrame, desktopCapturer, ipcRenderer } = require('electron')
const path = require('path')

//获取当前窗口,
let currentWindow; 
let fullscreen;
let zoomout;
let zoomin;
let zoomauto;
let capturer;
let capturerImg;
let renderToMain;

window.addEventListener('DOMContentLoaded', () => {
    currentWindow = remote.getCurrentWindow()
    fullscreen = document.querySelector('#fullscreen')
    zoomout = document.querySelector('#zoomout')
    zoomin = document.querySelector('#zoomin')
    zoomauto = document.querySelector('#zoomauto')
    capturer = document.querySelector('#capturer')
    capturerImg = document.querySelector('#capturerImg')
    renderToMain = document.querySelector('#render-to-main')
    // fullscreen.addEventListener('click', setFullScreen)
    fullscreen.addEventListener('click', setNewWindow)
    zoomout.addEventListener('click', setZoomOut)
    zoomin.addEventListener('click', setZoomIn)
    zoomauto.addEventListener('click', setZoomAuto)
    capturer.addEventListener('click', getCapturerImg)
    ipcRenderer.on('main-data-renderer', getDataFromMain)
    ipcRenderer.on('my-wevent', getDefaultDataFromMain)
    renderToMain.addEventListener('click', renderSendDataToMain)
})

function getDefaultDataFromMain(event, args) {
  console.log(args)
}

function getDataFromMain(e, args) {
  console.log(args)
}

function renderSendDataToMain () {
  console.log('发送数据给主进程')
  ipcRenderer.send('renderer-data-main', '发送数据给主进程')
}

function getCapturerImg () {
  desktopCapturer.getSources({ 
      types:['window'], 
      thumbnailSize: {
      width:1920, 
      height:1080
    } 
  }).then( ( sources) => {
    console.log(sources[0].thumbnail.toDataURL())
    capturerImg.src = sources[0].thumbnail.toDataURL()
  })
}

function setZoomOut () {
 webFrame.setZoomLevel( webFrame.getZoomLevel() - 1 )
}
function setZoomIn () {
  webFrame.setZoomLevel( webFrame.getZoomLevel()  + 1 )
}
function setZoomAuto () {
  webFrame.setZoomLevel(1)
}

function setFullScreen () {
  currentWindow.maximize()
}

function setNewWindow () {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, //放置渲染器访问Electron内部的或者require功能， 为true就会隔断，为false就是允许
      nodeIntegration: true,
      enableRemoteModule: true

    }
  })
  // win.loadURL('https://www.baidu.com')
  win.loadFile('index.html')
}


console.log(process.platform)
console.log(process.version)

console.log(screen)
























// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }

//   for (const type of ['chrome', 'node', 'electron']) {
//     replaceText(`${type}-version`, process.versions[type])
//   }
// })

