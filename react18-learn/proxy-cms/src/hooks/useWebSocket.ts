import { useEffect, useState, useRef } from 'react'
import 'google-protobuf'
import proto from './../proto/proto_pb.js'
console.log(proto)
//避免重复连接
let lockReconnect = false
//心跳检测间隔时长
const heartCheckSecond = 30 * 1000

const useWebSocket = (url: string, info: any) => {
    //接收的消息
    const [wsData, setWsData] = useState({})
    //客户端定时器
    const timeoutObjRef: any = useRef(null)
    //服务端定时器
    const serverTimeoutObjRef: any = useRef(null)
    //websocket
    const wsRef: any = useRef(null)

    // 创建socket连接
    const createWebSocket = () => {
        wsRef.current = new WebSocket(url)
        wsRef.current.binaryType = 'arraybuffer'
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
        timeoutObjRef.current = setTimeout(function () {
            // 这里发送一个心跳，后端收到后，返回一个心跳消息，
            //wsRef.current.send(heartParams)
            serverTimeoutObjRef.current = setTimeout(function () { // 如果超过一定时间还没重置，说明后端主动断开了
                wsRef.current.close()
            }, heartCheckSecond)
        }, heartCheckSecond)
    }

    //初始化websocket
    const initWebSocket = () => {
        //关闭
        wsRef.current.onclose = (evt: any) => {
            console.log('断开连接code:' + evt.code)
            reconnect()
        }
        //连接失败
        wsRef.current.onerror = (evt: any) => { // 连接错误
            console.log('连接失败code:' + evt.code)
            reconnect()
        }
        //连接开启
        wsRef.current.onopen = () => {
            let dt = new Date()
            let str = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
            console.log('连接成功:' + str)
            //用户类型 userType 1:客服 2:玩家，3:游客
            //type  1-心跳，2-鉴权,3-发送给指定用户
            //msgType 1:文字，2：图片
            //wsRef.current.send(joinParams) // 发起c.jr进房操作
            wsRef.current.readyState === 1 && wsRef.current.send(
                (proto as any).CIMReqProtocol('1')
                // JSON.stringify({
                //     // 连接成功将token传给服务端
                //     "type": "2",
                //     "message": { "token": "a8b7cb40-785e-496d-99b9-6d08c9612759", "userType": "1" }
                // })
            )
            resetTimer()
            startTimer()
        }
        //接收消息
        wsRef.current.onmessage = function (evt: any) {
            // let data = JSON.parse(evt.data) // 接收消息string=>json
            handleRecive(evt)
            let test = '{"code":1, "type":"AUTH_RESPONSE", "content":"认证失败，未知用户"}'
            let data = JSON.parse(test)
            setWsData(data)
            resetTimer()
            startTimer()
        }
    }

    //处理得到的数据
    const handleRecive = (data) => {
         // 这里对接收到的二进制消息进行解码
        //  var rep = (proto as any).ChatResponse.deserializeBinary(data)
        //  // 可以获取data和code
        //  console.log(rep)
    }
    useEffect(() => {
        if (!url) return
        console.log('0-0-0-0-')
        createWebSocket()

    }, [url])

    return [wsRef.current, wsData]
}

export default useWebSocket