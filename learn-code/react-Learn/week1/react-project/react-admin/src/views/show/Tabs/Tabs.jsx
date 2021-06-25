import React, { useState } from "react";
import { Divider, Tabs, Radio } from "antd";
import {AppleOutlined, AndroidOutlined} from "@ant-design/icons";
import "./index.scss";

const { TabPane } = Tabs;

const TabsPart = () => {

    const [mode, setmode] = useState('top')

    const handleModeChange = (e) => {
        const mode = e.target.value;
        setmode(mode);
      };



  const callback = (key) => {
    console.log(key);
  };

  return (
    <>
      <div className="tabstitle">
        <h1>何时使用</h1>
        <Divider />
        <p>提供平级的区域将大块内容进行收纳和展现，保持界面整洁。</p>
        <p>Ant Design 依次提供了三级选项卡，分别用于不同的场景。</p>
        <p>卡片式的页签，提供可关闭的样式，常用于容器顶部</p>
        <p>既可用于容器顶部，也可用于容器内部，是最通用的 Tabs。</p>
        <p>Radio.Button 可作为更次级的页签来使用。</p>
      </div>
      <div className="tabContent">
        <h1>基础</h1>
        <Divider />
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
      <div className="tabContent">
        <h1>有图标的标签</h1>
        <Divider />
        <Tabs defaultActiveKey="2">
          <TabPane
            tab={
              <span>
                <AppleOutlined />
                Tab 1
              </span>
            }
            key="1"
          >
            Tab 1
          </TabPane>
          <TabPane
            tab={
              <span>
                <AndroidOutlined />
                Tab 2
              </span>
            }
            key="2"
          >
            Tab 2
          </TabPane>
        </Tabs>
      </div>
      <div className="tabContent">
        <h1>滑动的标签</h1>
        <Divider />
      <div>
        <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
          <Radio.Button value="top">Horizontal</Radio.Button>
          <Radio.Button value="left">Vertical</Radio.Button>
        </Radio.Group>
        <Tabs defaultActiveKey="1" tabPosition={mode} style={{ height: 220 }}>
          {[...Array.from({ length: 30 }, (v, i) => i)].map(i => (
            <TabPane tab={`Tab-${i}`} key={i} disabled={i === 28}>
              Content of tab {i}
            </TabPane>
          ))}
        </Tabs>
      </div>
      </div>
    </>
  );
};

export default TabsPart;
