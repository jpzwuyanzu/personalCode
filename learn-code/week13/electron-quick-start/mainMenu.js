module.exports = [
    {
      label: 'Electron',
      submenu: [
        { label: 'Item 1', //label: 代表自定义功能
          click: () => {
              console.log('点击了Item1')
          }
        },
        { type: 'separator' }, //type: 代表分割线 
        { label: 'Item 2', submenu: [ { label: 'Sub Item 1'} ]},
        { label: 'Item 3'},
      ]
    },
    {
      label: '编辑',
      submenu: [
        {label: '撤销', role: 'undo'}, //撤销   // role: 代表系统的功能
        { label: '撤销', role: 'redo'}, //
        { label: '复制', role: 'copy'}, //复制
        { label: '粘贴', role: 'paste'}, //粘贴
      ]
    },
    {
      label: '操作',
      submenu: [
        {
          label: '开发者工具',
          role: 'toggleDevTools'
        },
        {
          label: '全屏',
          role: 'toggleFullScreen'
        },
        {
          label: '问候',
          click: () => { console.log('Hello from Main Menu') },
          accelerator: 'Shift+Alt+G' //自定义快捷按键
        }
      ]
    }
  ]