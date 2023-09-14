/* eslint-disable */
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation,useParams } from "react-router-dom";
import { NavBar, List, Image, Dialog, Modal, Toast } from "antd-mobile";
import { useAppDispatch } from './../../hooks/redux-hook'
import styles from "./index.module.scss";
import { getOnlineAgent, getAgentNotice, loadCusOrderDetail, changeOrderStatus } from './../../api/index'
import { switchState } from './../../store/order.slice'
const proxyStatusMsg = {
  close: "该商家代理已停止营业，为了不影响您的充值体验，请换一个店铺",
  offLine: "该商家代理已离线，为了不影响您的充值体验，请换一个店铺",
  trading: "存在正在进行中的订单，请先完成!",
};

const ProxyIndex = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [noAgentVisiable, setNoAgentVisiable] = useState<boolean>(false)
  const [noticeContent, setNoticeContent] = useState('');
  const [proxUserList, setProUserList] = useState([]);
  const [headFastUrl,setHeadFastUrl] = useState('');
  const [onLineStatus, setOnLineStatus] = useState<any>(1);
  const { pathname, search } = useLocation()
  const searchParams = new URLSearchParams(search);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const factUser = useMemo(() => {
    let temp: any = [];
    proxUserList.forEach((itm: any, inx) => {
      temp.push({
        id: itm.id,
        avatar: headFastUrl + itm.headImage,
        name: (
          <>
            <span className={styles.proxy_name}>{itm.name}</span>
            <span className={styles.socketStatus}>
              <span className={styles.proxy_flex}>
                <span className={ Number(onLineStatus) === 1 ?  styles.status_point : styles.statusOffLine}></span>
                <span className={styles.proxy_status}>{Number(onLineStatus) === 1 ? '在线' : '离线'}</span>
              </span>
            </span>
          </>
        ),
        description: (
          <>
            <span className={styles.descript_container}>
              <span className={styles.proxy_store}>店铺</span>
              <span className={styles.proxy_num}>已累计充值{Number(itm.realOrderCount) + Number(itm.fakeOrderCount)}单</span>
            </span>
          </>
        ),
        status: 1, //状态为1代表开启
        proxyName: itm.name
      });
    });
    return temp
  }, [proxUserList])

  //跳转到代理通道
  const linkProxy = (proxyId: number,proxyName: string) => {
    navigate(`/chat/chatroom?toUserId=AGENT_${proxyId}&toUserName=${proxyName}&orderNumber=${searchParams.get('orderNumber')}&orderAmount=${searchParams.get('orderAmount')}&orderType=${searchParams.get('orderType')}&fromUserId=${searchParams.get('fromUserId')}&fromUserName=${searchParams.get('fromUserName')}`);
  };
  //打开弹框
  const openDialog = (type: string) => {
    Dialog.alert({
      confirmText: "知道了",
      content: (proxyStatusMsg as any)[String(type)],
      onConfirm: () => {
        console.log("Confirmed");
      },
    })
  }
  //根据代理状态，处理逻辑
  const handleChooseProxy = (proxyInfo: any) => {
      if(proxyInfo['status']) {
        linkProxy(proxyInfo['id'], proxyInfo['proxyName'])
      } else {
        openDialog('close')
      }
  }
//加载在线代理列表
const loadProxyList = async () => {
  //["userName='%E5%BC%A0%E4%B8%89'", 'userId=12222222', 'orderNumber=11111111', 'orderAmount=100000', 'orderType=1']
  //orderType: 1:游戏充值 3:金币充值 2:会员充值
  let res: any = await getOnlineAgent({ orderNumber:searchParams.get('orderNumber'), orderAmount: searchParams.get('orderAmount'), orderType: searchParams.get('orderType'), fromUserId: searchParams.get('fromUserId')})
  if(res.code === 200) {
    dispatch(switchState({ status: true }))
    setProUserList(res.data ? res.data.agent : [])
    setHeadFastUrl(res.data ? res.data.fastUrl : '')
    setOnLineStatus(res.data.isOnline)
  } else {
    // Toast.show({
    //   icon: 'fail',
    //   content: res.msg
    // })
  }
}

//获取代理公告
const loadProxynotice = async () => {
  let res: any = await getAgentNotice({})
  if(res.code === 200 && res.data) {
    setNoticeContent(res.data.notice ? res.data.notice : '')
    res.data.notice && !noAgentVisiable && setVisible(true)
  }
}

const handleback = () => {
  if ((window as any).WebLocalBridge) {
    (window as any).WebLocalBridge.rechargeBack();
  } else if ((window as any).webkit?.messageHandlers) {
    (window as any).webkit.messageHandlers.JsToOc.postMessage('rechargeBack');
  }
}

//查询当前订单是否匹配过代理
const regOrderDetail = async() => {
  const resp:any = await loadCusOrderDetail({orderNumber: searchParams.get('orderNumber')})
  const res: any = await getOnlineAgent({ orderNumber:searchParams.get('orderNumber'), orderAmount: searchParams.get('orderAmount'), orderType: searchParams.get('orderType'), fromUserId: searchParams.get('fromUserId')})
  let tempArr: any = [];
  if(resp && resp.code === 200 && resp.data.order) {
    //在这里比对代理列表
    if(res && res.code === 200 && res.data && res.data.agent && res.data.agent.length) {
      res.data.agent.forEach((itm: any, inx: any) => {
        tempArr.push(Number(itm.id))
      })
    }
    if(tempArr.indexOf(Number(resp.data.order['agentId'])) !== -1) {
      navigate(`/chat/chatroom?toUserId=AGENT_${Number(resp.data.order['agentId'])}&toUserName=${resp.data.order['agentName']}&orderNumber=${searchParams.get('orderNumber')}&orderAmount=${searchParams.get('orderAmount')}&orderType=${searchParams.get('orderType')}&fromUserId=${searchParams.get('fromUserId')}&fromUserName=${searchParams.get('fromUserName')}`);
    } else {
      setNoAgentVisiable(true)
    }
  } else {
    if(!(res && res.code === 200 && res.data && res.data.agent && res.data.agent.length)) setNoAgentVisiable(true)
  }
  loadProxynotice()
}

//关闭当前待支付订单
const cancelOrder = async() => {
  await changeOrderStatus({merchantOrderId: searchParams.get('orderNumber'), payStatus: 4})
  setVisible(false)
  setNoAgentVisiable(false);
  handleback()
}


  useEffect(() => {
    regOrderDetail()
    // loadProxynotice()
    loadProxyList()
  }, []);


  return (
    <div className={styles.proxy_container}>
      <div className={styles.top_nav_bar}>
        <NavBar onBack={() => handleback()}>全部代理</NavBar>
      </div>
      <div className={styles.all_proxy_list}>
        <List>
          {factUser.map(
            (user: {
              id: React.Key | null | undefined;
              avatar: string | undefined;
              description:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
              name:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
            }) => (
              <List.Item
                key={user.id}
                prefix={
                  <Image
                    src={user.avatar}
                    style={{ borderRadius: 60 }}
                    fit="cover"
                    width={60}
                    height={60}
                  />
                }
                description={user.description}
                arrow={null}
                onClick={() => handleChooseProxy(user)}
              >
                {user.name}
              </List.Item>
            )
          )}
        </List>
      </div>
      {/* 系统公告 */}
      <Modal
        visible={visible}
        content={
          <>
            <div className={styles.annoceMent_container}>
              <div className={styles.title}>代理公告</div>
              <div className={styles.content}>
                <div
                  className={styles.insert_element}
                  dangerouslySetInnerHTML={{
                    __html: noticeContent,
                  }}
                ></div>
              </div>
            </div>
          </>
        }
        closeOnAction
        onClose={() => {
          setVisible(false);
        }}
        actions={[
          {
            key: "confirm",
            text: "我知道了",
          },
        ]}
      />
      {/* 系统公告 */}
      {/* 提示进行中订单没有找到代理 */}
      <Modal
        visible={noAgentVisiable}
        content={
          <>
            <div className={styles.annoceMent_container}>
              <div className={styles.title}>提示</div>
              <div className={styles.content}>
                <div className={styles.insert_element}>
                商家代理已暂停营业，将自动关闭订单，请重新下单
                </div>
              </div>
            </div>
          </>
        }
        closeOnAction
        actions={[
          {
            key: "confirm",
            text: "重新下单",
            onClick: () => cancelOrder()
          },
        ]}
      />
      {/* 提示进行中订单没有找到代理 */}
    </div>
  );
};

export default ProxyIndex;
