

/**
 * <div class='app' id='appRoot'>
    <h1 class='title'>欢迎进入React的世界</h1>
    <p>
      React.js 是一个帮助你构建页面 UI 的库
    </p>
   </div>
 */


   /**
    * {
    *  
    * }
    */


   import React from 'react'
   import ReactDOM from 'react-dom'

   const App = () => React.createElement('h1', { className: 'title' }, 'hello react')

   ReactDOM.render (
     <App/>,
     document.getElementById('root')
   )
