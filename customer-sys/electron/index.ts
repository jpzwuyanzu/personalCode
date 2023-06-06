//app 控制应用程序的事件生命周期。
//BrowserWindow 创建并控制浏览器窗口。
import { app, BrowserWindow } from 'electron'
import path from 'path'

//定义全局变量获取 窗口实例
let win: BrowserWindow | null

const createWindow = () => {
  win = new BrowserWindow({
    // 是否隐藏菜单，默认 false
    width: 1000,
    height: 650,
    // autoHideMenuBar: true,
    //允许html页面上的javascipt代码访问nodejs 环境api代码的能力（与node集成的意思）
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      contextIsolation:true,
      preload: path.join(__dirname, './preload.js')  
    }
  })
  win.loadFile(path.join(__dirname, '../dist/index.html'))
  win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}`)

  // 打开开发者工具
  win.webContents.openDevTools()
}

//在Electron完成初始化时被触发
app.whenReady().then(createWindow)