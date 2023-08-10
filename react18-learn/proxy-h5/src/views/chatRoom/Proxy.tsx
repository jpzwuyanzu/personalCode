import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Tabs, NavBar } from "antd-mobile";
import { CountDown } from 'react-vant';
import styles from "./Proxy.module.scss";

const Proxy = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [activeKey, setActiveKey] = useState<string>();
  const [times, setTimes] = useState(30 * 60 * 1000);


  const handleTabChange = (val: string) => {
    navigate(`${val}${search}`);
  };


  useEffect(() => {
    setActiveKey(
      (pathname as any).slice(-1) === "/" ? pathname : pathname + "/"
    );
  }, [pathname]);

  return (
    <div className={styles.proxy_container}>
      <div className={styles.navbar_container}>
        <NavBar onBack={() => navigate(-1)}>标题</NavBar>
      </div>
      <div className={styles.tabs_container}>
        <Tabs activeKey={activeKey} onChange={(val) => handleTabChange(val)}>
          <Tabs.Tab title="代理客服" key="/chat/chatroom/"></Tabs.Tab>
          <Tabs.Tab title="代理订单" key="/chat/order/"></Tabs.Tab>
        </Tabs>
      </div>
      <div className={styles.order_status_line}>
        <span>订单进行中，剩余时间:</span>&nbsp;<CountDown time={times} millisecond format="mm:ss" className={ styles.countDownNow } />
      </div>
      <div className={styles.proxy_content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Proxy;
