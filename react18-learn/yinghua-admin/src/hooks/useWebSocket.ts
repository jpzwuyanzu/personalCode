/**
 * @name useWebSocket
 * @export
 * @param {url} -（必需）ws/wss地址
 * @param {info} -（不必需）socket运行过程中的一些参数，进房参数joinParams，心跳参数heartParams
 * @returns
 * {ws} -socket对象
 * {wsData} -接收的socket消息
 */
import { useEffect, useState, useRef } from 'react'
let lockReconnect = false // 避免重复连接
const heartCheckSecond = 30 * 1000 // 心跳检测间隔时长

const useWebSocket = (url: string, info: any) =>  {
  const [wsData, setWsData] = useState({}) // 接收的消息
  const timeoutObjRef: any = useRef(null)
  const serverTimeoutObjRef: any = useRef(null)
  const wsRef: any = useRef(null)
  const { joinParams, heartParams } = info??{}

  // 创建socket连接
  const createWebSocket = () => { 
    wsRef.current = new WebSocket(url)
    initWebSocket()
  }

  // 创建连接，lockReconnect使当前项目只会存在一个socket
  const reconnect = () => { 
    if (lockReconnect) return
    lockReconnect = true
    // 没连接上会一直重连，设置延迟避免请求过多
    setTimeout(() => { 
      createWebSocket()
      lockReconnect = false
    }, 2000)
  }

  // 心跳检测
  const resetTimer = () => {
    clearTimeout(timeoutObjRef.current)
    clearTimeout(serverTimeoutObjRef.current)
  }
  const startTimer = () => {
    timeoutObjRef.current = setTimeout(function() {
        // 这里发送一个心跳，后端收到后，返回一个心跳消息，
        wsRef.current.send(heartParams)
        serverTimeoutObjRef.current = setTimeout(function() { // 如果超过一定时间还没重置，说明后端主动断开了
          wsRef.current.close()
        }, heartCheckSecond)
      }, heartCheckSecond)
  }

  //初始化websocket
  const initWebSocket = () => { // 初始化socket
    wsRef.current.onclose = (evt: any) => { // 关闭
      console.log('断开连接code:' + evt.code)
      reconnect()
    }
    //连接失败
    wsRef.current.onerror = (evt: any) =>  { // 连接错误
      console.log('连接失败code:' + evt.code)
      reconnect()
    }
    //连接成功
    wsRef.current.onopen = () => {
      var dt = new Date()
      var str = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
      console.log('连接成功:' + str)
      
      wsRef.current.readyState === 1 &&  wsRef.current.send(joinParams) // 发起c.jr进房操作
      if(heartParams) {
        resetTimer() 
        startTimer()
      }
    }
    //接收消息
    wsRef.current.onmessage = function (evt: any) {
      var data = JSON.parse(evt.data) // 接收消息string=>json
      setWsData(data)
      if(heartParams) {
        resetTimer() 
        startTimer()
      }
    }
  }

  useEffect(() => {
    if (!url) return
    console.log('0-0-0-0-')
    createWebSocket()
    
  }, [url])

  return [wsRef.current, wsData]
}

export default useWebSocket