参考文章：
 https://juejin.cn/post/6844903919789801486
 https://segmentfault.com/a/1190000012220307

浏览器本身是多进程， 其中渲染进程包含多个子线程：
1，GUI渲染线程： 
  . 负责渲染页面，布局和绘制
  

  宏任务： 主代码块， 定时器， 延时器
  微任务： promise  process.nextTick
  
  
