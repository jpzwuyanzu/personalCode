// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// const  remote  = require('electron').remote
//在当前的版本中。引入 screen 为undefined
//无需引入 可以直接使用


const { shell } = require('electron')

// shell.openExternal('https://www.baidu.com')






















// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }

//   for (const type of ['chrome', 'node', 'electron']) {
//     replaceText(`${type}-version`, process.versions[type])
//   }
// })

