/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { PageHeader, Button, Statistic, Descriptions } from "antd";
import avatorImg from './../../avator.jpeg'
const renderContent = (column = 2) => (
  <>
  <img style={{ width:200, height: 250, marginBottom: 30 }} src={ avatorImg } alt=""/>
 <Descriptions size="small" column={column}>
    <Descriptions.Item label="Created">罗罗诺亚 索隆</Descriptions.Item>
    <Descriptions.Item label="BirthDay">
      <a>1501年11月11日（1代表世界第一）</a>
    </Descriptions.Item>
    <Descriptions.Item label="Creation Time">2021-12-14</Descriptions.Item>
    <Descriptions.Item label="Effective Time">2021-12-14</Descriptions.Item>
    <Descriptions.Item label="Remarks">
    东海霜月村（自幼在霜月村修行）
    </Descriptions.Item>
  </Descriptions>
  </>
);

const extraContent = (
  <div
    style={{
      display: "flex",
      width: "max-content",
      justifyContent: "flex-end",
    }}
  >
    <Statistic
      title="Profession"
      value="世界第一大剑豪"
      style={{
        marginRight: 32,
      }}
    />
    <Statistic title="Offer a reward" prefix="$" value="悬赏金3亿两千万贝利" />
  </div>
);

const Content = ({ children, extra }) => (
  <div className="content">
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);

const userCenter = (props) => {
  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        // onBack={() => window.history.back()}
        // title="Title"
        // subTitle="This is a subtitle"
        extra={[
        //   <Button key="3">Operation</Button>,
        //   <Button key="2">Operation</Button>,
          <Button key="1" type="primary" onClick={ () => { props.history.push('/setting') } }>
            设置
          </Button>,
        ]}
        // footer={
        //   <Tabs defaultActiveKey="1">
        //     <TabPane tab="Details" key="1" />
        //     <TabPane tab="Rule" key="2" />
        //   </Tabs>
        // }
      >
        <Content extra={extraContent}>{renderContent()}</Content>
      </PageHeader>
    </>
  );
};

export default userCenter;
