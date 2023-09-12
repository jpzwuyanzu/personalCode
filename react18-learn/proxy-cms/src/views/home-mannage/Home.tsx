import { useEffect } from "react";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined
} from "@ant-design/icons";
import { Avatar, Card, message, Button } from "antd";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { changeHeadImg, loadProxyDetailInfo } from "@/api/index";
import { switchAmountNum } from "@/store/slices/proxy.slice";
import OpenImg from "@/assets/imgs/status/open.png";
import CloseImg from "@/assets/imgs/status/close.jpeg";
import styles from "./Home.module.scss";

const { Meta } = Card;

const Home = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  let proxyStatus = useAppSelector((state) => state.amountNum.openStatus);

  //查询店铺状态
  const loadProxyStatus = async () => {
    const res: any = await loadProxyDetailInfo({});
    if (res && res.code === 200) {
      // dispatch(changeProxy({'ac': 'changeProxy', 'proxy': res.data.agent} as any))
      dispatch(switchAmountNum(res.data.agent));
    }
  };

  //开启关闭店铺
  const switchCurrentProxyInfo = async (checked: any) => {
    const res: any = await changeHeadImg({
      id: userInfo.id,
      openStatus: Number(Boolean(checked) ? 1 : 2),
    });
    if (res && res.code === 200) {
      message.open({ type: "success", content: "修改成功" });
      loadProxyStatus();
    }
  };

  useEffect(() => {
    userInfo.userType === 1 && loadProxyStatus();
  }, []);

  return (
    <>
      {userInfo.userType === 1 ? (
        // <Card
        //   style={{ width: 300 }}
        //   cover={
        //     <img
        //       alt="example"
        //       src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        //     />
        //   }
        //   actions={[
        //     <div>店铺状态</div>,
        //     <div>
        //       <Switch
        //         checkedChildren={<CheckOutlined />}
        //         unCheckedChildren={<CloseOutlined />}
        //         checked={Number(proxyStatus) === 1 ? true : false}
        //         onClick={(checked: boolean) => switchCurrentProxyInfo(checked)}
        //       />
        //     </div>,
        //   ]}
        // >
        //   <Meta
        //     avatar={<Avatar src={`${userInfo.fastUrl}${userInfo.headImage}`} />}
        //     title={userInfo.username}
        //     description="代理店铺"
        //   />
        // </Card>
        <div className={styles.proxy_plat}>
          <p className={styles.plat_title}>代理运营平台</p>
             <img src={Number(proxyStatus) === 1 ? OpenImg : CloseImg} className={styles.status_img} alt="" />
          <p className={styles.store_label}>
            不爱钱，不会挣钱，是很可怕的一件事。
          </p>
          <div className={Number(proxyStatus) === 1 ? styles.store_card : styles.store_card_close}>
            <div className={ styles.store_status_lable }>
              <span className={ styles.store_status_label_name }>店铺当前状态:</span>
              <span className={ styles.store_status_text }>{Number(proxyStatus) === 1 ? '正在营业中...' : '已暂停营业'}</span>
            </div>
            <div className={ styles.btn_container }>
              <Button type="primary" danger={Number(proxyStatus) === 1} size="large"  icon={Number(proxyStatus) === 1 ? <PauseCircleOutlined /> : <PlayCircleOutlined />} onClick={() => switchCurrentProxyInfo(Number(proxyStatus) === 1 ? false : true)}>
                {Number(proxyStatus) === 1 ? '暂停营业' : '开始营业'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
      )}
    </>
  );
};

export default Home;
