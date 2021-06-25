import React, { useEffect, useState } from "react";
import { TabBar } from "antd-mobile";
import { useHistory, useLocation, withRouter } from "react-router-dom";
const tabPath = { "/home": "blueTab", "/play": "redTab", "/my": "yellowTab" };
const TabBarCom = withRouter(() => {
  const [selectedTab, setSelectedTab] = useState("blueTab");
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    tabPath[pathname]
      ? setSelectedTab(tabPath[pathname])
      : setSelectedTab("blueTab");
  }, [pathname]);

  const goPage = (path) => {
    history.push(path);
  };

  return (
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
      noRenderContent={true}
    >
      <TabBar.Item
        title="首页"
        key="indexPage"
        icon={
          <div
            style={{
              width: "22px",
              height: "22px",
              background:
                "url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat",
            }}
          />
        }
        selectedIcon={
          <div
            style={{
              width: "22px",
              height: "22px",
              background:
                "url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat",
            }}
          />
        }
        selected={selectedTab === "blueTab"}
        onPress={() => {
          setSelectedTab("blueTab");
          goPage("/home");
        }}
        data-seed="logId"
      ></TabBar.Item>
      <TabBar.Item
        icon={
          <div
            style={{
              width: "22px",
              height: "22px",
              background:
                "url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat",
            }}
          />
        }
        selectedIcon={
          <div
            style={{
              width: "22px",
              height: "22px",
              background:
                "url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat",
            }}
          />
        }
        title="逛逛"
        key="play"
        selected={selectedTab === "redTab"}
        onPress={() => {
          setSelectedTab("redTab");
          goPage("/play");
        }}
        data-seed="logId1"
      ></TabBar.Item>
      <TabBar.Item
        icon={
          <div
            style={{
              width: "22px",
              height: "22px",
              background:
                "url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat",
            }}
          />
        }
        selectedIcon={
          <div
            style={{
              width: "22px",
              height: "22px",
              background:
                "url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat",
            }}
          />
        }
        title="个人中心"
        key="my"
        selected={selectedTab === "yellowTab"}
        onPress={() => {
          setSelectedTab("yellowTab");
          goPage("/my");
        }}
      ></TabBar.Item>
    </TabBar>
  );
});

export default TabBarCom;
