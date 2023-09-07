import { useEffect } from 'react';
import { CheckOutlined,  CloseOutlined, SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Card, Switch, message } from 'antd';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks'
import {  changeHeadImg ,loadProxyDetailInfo} from '@/api/index'
import { switchAmountNum } from '@/store/slices/proxy.slice';

const { Meta } = Card

const  Home = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  let proxyStatus = useAppSelector((state) => state.amountNum.openStatus);

//查询店铺状态
const loadProxyStatus = async () => {
  const res: any = await loadProxyDetailInfo({});
  if (res && res.code === 200) {
    // dispatch(changeProxy({'ac': 'changeProxy', 'proxy': res.data.agent} as any))
    dispatch(switchAmountNum(res.data.agent))
  }
};

//开启关闭店铺
  const switchCurrentProxyInfo = async(checked:any) => {
    const res:any = await changeHeadImg({ id: userInfo.id, openStatus: Number(Boolean(checked) ? 1 : 2) });
    if(res && res.code === 200){
      message.open({ type: 'success', content: '修改成功' })
      loadProxyStatus()
    }
  }

  useEffect(() => {
    userInfo.userType === 1 && loadProxyStatus()
  }, [])



  return (
    <>
    {
      userInfo.userType === 1 ? <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        // <SettingOutlined key="setting" />,
        // <EditOutlined key="edit" />,
        // <EllipsisOutlined key="ellipsis" />,
        <div>店铺状态</div>,
        <div><Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        checked={Number(proxyStatus) === 1 ? true : false}
        onClick={(checked: boolean) => switchCurrentProxyInfo(checked)}
      /></div>
      ]}
    >
      <Meta
        avatar={<Avatar src={`${userInfo.fastUrl}${userInfo.headImage}`} />}
        title={userInfo.username}
        description="代理店铺"
      />
    </Card> : <Card
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
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title="Card title"
      description="This is the description"
    />
  </Card>
    }
    </>
  )
}


export default Home;