import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, List, Image, Dialog, Modal } from "antd-mobile";
import styles from "./index.module.scss";

const proxyStatusMsg = {
  close: "该商家代理已停止营业，为了不影响您的充值体验，请换一个店铺",
  offLine: "该商家代理已离线，为了不影响您的充值体验，请换一个店铺",
  trading: "存在正在进行中的订单，请先完成!",
};

const ProxyIndex = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [proxUserList, setProUserList] = useState([
    {
      name: "代理充值-001",
      id: 1,
      num: 9000,
      icon: "https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    },
    {
      name: "代理充值-001",
      id: 2,
      num: 9000,
      icon: "https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    },
    {
      name: "代理充值-001",
      id: 3,
      num: 9000,
      icon: "https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    },
    {
      name: "代理充值-001",
      id: 4,
      num: 9000,
      icon: "https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    },
  ])
  const navigate = useNavigate();
  const factUser = useMemo(() => {
    let temp: any = [];
    proxUserList.forEach((itm, inx) => {
      temp.push({
        id: itm.id,
        avatar: itm.icon,
        name: (
          <>
            <span className={styles.proxy_name}>{itm.name}</span>
            <span className={styles.socketStatus}>
              <span className={styles.proxy_flex}>
                <span className={styles.status_point}></span>
                <span className={styles.proxy_status}>在线</span>
              </span>
            </span>
          </>
        ),
        description: (
          <>
            <span className={styles.descript_container}>
              <span className={styles.proxy_store}>店铺</span>
              <span className={styles.proxy_num}>已累计充值{itm.num}单</span>
            </span>
          </>
        ),
        status: 1, //状态为1代表开启
        proxyName: itm.name
      });
    });
    return temp
  }, [proxUserList])

  //返回上一页
  const back = () => {
    console.log("909090");
  };
  //跳转到代理通道
  const linkProxy = (proxyId: number,proxyName: string) => {
    navigate(`/chat/chatroom?id=${proxyId}&name=${proxyName}`);
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
      console.log(proxyInfo)
      if(proxyInfo['status']) {
        linkProxy(proxyInfo['id'], proxyInfo['proxyName'])
      } else {
        openDialog('close')
      }
  }

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={styles.proxy_container}>
      <div className={styles.top_nav_bar}>
        <NavBar onBack={back}>全部代理</NavBar>
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
                    __html:
                      "<p>345345345</p><p>345345345</p><p>345345345</p><p>345345345</p><p>345345345</p><p>345345345</p><p>345345345</p><p>345345345</p><p>345345345</p><p>345345345</p><p>345345345</p>",
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
    </div>
  );
};

export default ProxyIndex;
