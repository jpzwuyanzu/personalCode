/* eslint-disable */
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Tabs, NavBar, Toast,  TextArea, Popup} from "antd-mobile";
import { CountDown, Dialog, Input } from "react-vant";
import styles from "./Proxy.module.scss";
import { addReport,loadCusOrderDetail} from "../../api";
import { useAppSelector, useAppDispatch } from './../../hooks/redux-hook'
import { switchState } from './../../store/order.slice'
import ChatRoom from './Chat'
import OrderDetail from './Order'

const Proxy = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [activeKey, setActiveKey] = useState<string>();
  const [times, setTimes] = useState(30 * 60 * 1000);
  const [navTitle, setNavTitle] = useState(decodeURIComponent(search.split("?")[1].split("&")[1].split("=")[1]));
  /**
   * orderStatus:
   * 0: 进行中订单，可以取消
   * 1: 已关闭， 按钮不可以点击
   * 2: 充值成功， 不可以点击
   */
  const [orderStatus, setOrderStatus] = useState<any>(2);
  const [reportInfo, setReportInfo] = useState("");
  const [orderInfo, setOrderInfo] = useState<any>({});
  const orderStateCache = useAppSelector((state: any) => state.updateState.status)
  const dispatch = useAppDispatch()
  let reportFactInfo = '';

  const handleTabChange = (val: string) => {
    navigate(`${val}${search}`);
  };

  const handleTextChange = (val: any) => {
    setReportInfo(val)
    reportFactInfo = val
  }

  const handleCancelReport = () => {
    setReportInfo("")
    reportFactInfo = '';
  }

  const handleConfirmReport = async () => {
    if(reportFactInfo) {
      let res: any = await addReport({
        playerId: searchParams.get("fromUserId"),
        playerName: searchParams.get("fromUserName"),
        agentId: searchParams.get("toUserId")?.split('_')[1],
        agentName: searchParams.get("toUserName"),
        content: reportFactInfo,
      });
      if(res && res.code === 200) {
        Toast.show({
          icon: 'success',
          content: '举报成功',
        })
        setReportInfo('')
        reportFactInfo = '';
      }
    }
  };

  const reportProxy = () => {
    Dialog.alert({
      title: <span style={{ color: "#ff6084" }}>请输入举报内容</span>,
      showCancelButton: true,
      theme: "round-button",
      message: (
        <div className={styles.report_container}>
          <div className={styles.report_input}>
            <Input.TextArea
              autoSize={{ minHeight: 120 }}
              placeholder="  请输入..."
              onChange={(val) => handleTextChange(val)}
              maxLength={100}
              showWordLimit
            />
            {/* <TextArea
            showCount
            value={reportInfo}
            onChange={(val) => console.log(val)}
            maxLength={30}
          /> */}
          {/* <input type="text" /> */}
          {/* <textarea value={reportInfo} onChange={(val) => console.log(val.target.value)} ></textarea> */}
          </div>
          <div className={styles.report_tips}>
            官方将核实举报内容，胡乱举报将承担后果!
          </div>
        </div>
      ),
      onCancel: () => handleCancelReport(),
      onConfirm: () => handleConfirmReport(),
    });
  };

  //获取当前订单信息
  const loadOrderDetailInfo = async() => {
    const res: any = await loadCusOrderDetail({ fromUserId: searchParams.get('fromUserId'), orderNumber: searchParams.get('orderNumber')})
    if(res.code === 200 && res.data && res.data.order) {
      setOrderInfo(res.data.order)
      setOrderStatus(res.data.order.payStatus)
    } else {
      setOrderInfo({})
    }
  }


  useEffect(() => {
    setActiveKey(
      (pathname as any).slice(-1) === "/" ? pathname : pathname + "/"
    );
  }, [pathname]);

  useEffect(() => {
   if(orderStateCache) {
    loadOrderDetailInfo()
    dispatch(switchState({ status: false }))
   }
  }, [orderStateCache])

  useEffect(() => {
    loadOrderDetailInfo()
  }, [activeKey])

  useEffect(() => {
    loadOrderDetailInfo()
  },[])


  return (
    <div className={styles.proxy_container}>
      <div className={styles.navbar_container}>
        <NavBar
          onBack={() => navigate(`/proxy/allproxy?orderNumber=${searchParams.get('orderNumber')}&orderAmount=${searchParams.get('orderAmount')}&orderType=${searchParams.get('orderType')}&fromUserId=${searchParams.get("fromUserId")}&fromUserName=${searchParams.get("fromUserName")}`)}
          right={
            <>
              <div className={styles.reportNow} onClick={reportProxy}>
                举报
              </div>
            </>
          }
        >
          {navTitle}
        </NavBar>
      </div>
      <div className={styles.tabs_container}>
        <Tabs activeKey={activeKey} onChange={(val) => handleTabChange(val)}>
          <Tabs.Tab title="代理客服" key="/chat/chatroom/"></Tabs.Tab>
          <Tabs.Tab title="代理订单" key="/chat/order/"></Tabs.Tab>
        </Tabs>
      </div>
      {
        orderStatus ? <div
        className={
          orderStatus === 3 || orderStatus === 4
            ? styles.order_status_disline
            : styles.order_status_line
        }
      >
        {orderStatus === 2 ? (
          <>
            <span>订单进行中，剩余时间:</span>&nbsp;
            <CountDown
              time={orderInfo && orderInfo.ms ? 30*60*1000 - (Number(new Date().getTime()) - Number(new Date(orderInfo.ms).getTime())) : 30*60*1000}
              // time={times}
              millisecond
              format="mm:ss"
              className={styles.countDownNow}
              onFinish={ () => setOrderStatus(4) }
            />
          </>
        ) : (orderStatus === 1 ? (
          "充值成功"
        ) : (
          "订单关闭"
        ))}
      </div> : null
      }
      
      <div className={styles.proxy_content}>
        {/* <Outlet /> */}
        <div className={ activeKey === '/chat/chatroom/' ? styles.showChatRoom : styles.hideChatRoom }>
          <ChatRoom/>
        </div>
       <div className={ activeKey === '/chat/order/' ? styles.showOrderDetail : styles.hideOrderDetail }>
       <OrderDetail orderStatusP={orderStatus}  orderInfoP={orderInfo}/>
       </div>
      </div>
      {/* 举报 */}
      {/* <div className="reportDialog">
        <div className="report_content">
          909090
        </div>
      </div> */}
      {/* 举报 */}
    </div>
  );
};

export default Proxy;
