import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Tabs, NavBar } from "antd-mobile";
import { CountDown, Dialog, Input } from "react-vant";
import styles from "./Proxy.module.scss";

const Proxy = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [activeKey, setActiveKey] = useState<string>();
  const [times, setTimes] = useState(30 * 60 * 1000);
  const [navTitle, setNavTitle] = useState(decodeURIComponent(search.split("?")[1].split("&")[1].split("=")[1]));
  /**
   * orderStatus:
   * 0: 进行中订单，可以取消
   * 1: 已关闭， 按钮不可以点击
   * 2: 充值成功， 不可以点击
   */
  const [orderStatus, setOrderStatus] = useState(1);

  const handleTabChange = (val: string) => {
    navigate(`${val}${search}`);
  };

  const reportProxy = () => {
    Dialog.alert({
      title: <span style={{ color: '#ff6084' }}>请输入举报内容</span>,
      showCancelButton: true,
      theme: 'round-button',
      message: (
        <div className={ styles.report_container }>
          <div className={ styles.report_input }>
            <Input.TextArea autoSize={{ minHeight: 120 }} placeholder="  请输入..." maxLength={100} showWordLimit />
          </div>
          <div className={ styles.report_tips }>官方将核实举报内容，胡乱举报将承担后果!</div>
        </div>
      ),
    })
  }



  useEffect(() => {
    console.log(search);
    setActiveKey(
      (pathname as any).slice(-1) === "/" ? pathname : pathname + "/"
    );
  }, [pathname]);

  return (
    <div className={styles.proxy_container}>
      <div className={styles.navbar_container}>
        <NavBar onBack={() => navigate("/proxy/allproxy")} right={<><div className={ styles.reportNow } onClick={reportProxy}>举报</div></>}>{navTitle}</NavBar>
      </div>
      <div className={styles.tabs_container}>
        <Tabs activeKey={activeKey} onChange={(val) => handleTabChange(val)}>
          <Tabs.Tab title="代理客服" key="/chat/chatroom/"></Tabs.Tab>
          <Tabs.Tab title="代理订单" key="/chat/order/"></Tabs.Tab>
        </Tabs>
      </div>
      <div className={orderStatus === 1 ? styles.order_status_disline :  styles.order_status_line}>
        {orderStatus === 0 ? (
          <>
            <span>订单进行中，剩余时间:</span>&nbsp;
            <CountDown
              time={times}
              millisecond
              format="mm:ss"
              className={styles.countDownNow}
            />
          </>
        ) : orderStatus === 1 ? (
          "订单已关闭"
        ) : (
          "充值成功"
        )}
      </div>
      <div className={styles.proxy_content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Proxy;
