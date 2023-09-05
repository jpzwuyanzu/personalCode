import { useEffect, useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks'
import { switchUnreadNum } from '@/store/slices/message.slice'
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
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector((state: any) => state.user.userInfo);

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
            // dispatch(switchUnreadNum({ 'ac': 'equal', 'num': 0 } as any))
            //用户类型 userType 1:客服 2:玩家，3:游客
            //handType  1-心跳，2-鉴权,3-发送给指定用户 6:拉消息记录
            //msgType 0:文字，1：图片
            //wsRef.current.send(joinParams) // 发起c.jr进房操作
            //代理 agent_userId
            // 加藤 jt_userId
            // 挖洞 wd_userId
            //orderType: 1: 游戏充值 2:会员充值 3:金币充值
            //type: 1: 客服消息 2:用户消息 3:官方欢迎消息 4:充值方式消息 5:充值链接类型
            wsRef.current.readyState === 1 && wsRef.current.send(
                JSON.stringify({
                    "handType": "2",
                    "message": {
                        "fromUserId": `AGENT_${userInfo.id}`,
                        "fromUserName": userInfo.username,
                        "toUserName": "",
                        "toUserId": "",
                        "icon": userInfo.fastUrl+userInfo.headImage,
                        "content": "",
                        "msgType": 0,
                        "type": 1,
                        "time": new Date().getTime(),
                        "orderNumber": '',
                        "orderAmount": '',
                        "orderType": '',
                        "createOrder": 0,
                        "msgId": uuidv4(),
                        "token": userInfo.tokenInfo.tokenValue
                    }
                })
            )
            resetTimer()
            startTimer()
        }
        //接收消息
        wsRef.current.onmessage = function (evt: any) {
            // let data = JSON.parse(evt.data) // 接收消息string=>json
             if(evt.data.indexOf('HEARTBEAT_RESPONSE') === -1 && evt.data.indexOf('CHAT_SEND_RESPONSE') === -1 && evt.data.indexOf('加藤代理欢迎你') === -1) {
                let data = JSON.parse(evt.data)
                setWsData(data)
                if(location.hash.indexOf('/cusroom') === -1) {
                    if(((data && data.msgId && data.type) || (data.code && data.code === 2))){
                        dispatch(switchUnreadNum({ 'ac': 'add', 'num': 1 } as any))
                    }
                }
            }
            resetTimer()
            startTimer()
        }
    }

    useEffect(() => {
        if (!url) return
        console.log('0-0-0-0-')
        if(userInfo.userType === 1) createWebSocket()
    }, [url])

    return [createWebSocket, wsRef.current, wsData]
}

export default useWebSocket