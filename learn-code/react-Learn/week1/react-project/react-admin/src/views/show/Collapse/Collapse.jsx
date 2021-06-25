import React from "react";
import { Divider, Collapse } from "antd";
import "./index.scss";
const { Panel } = Collapse;

const CollapsePart = () => {
  const callback = (key) => {
    console.log(key);
  };

  const text = `
        A dog is a type of domesticated animal.
        Known for its loyalty and faithfulness,
        it can be found as a welcome guest in many households across the world.
      `;

  return (
    <>
      <div className="collaTitle">
        <h1>何时使用</h1>
        <Divider />
        <p>对复杂区域进行分组和隐藏，保持页面的整洁。</p>
        <p>手风琴 是一种特殊的折叠面板，只允许单个内容区域展开。</p>
      </div>
      <div className="collaContent">
        <h1>折叠面板</h1>
        <Divider />
        <Collapse defaultActiveKey={["1"]} onChange={callback}>
          <Panel header="This is panel header 1" key="1">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
      <div className="collaContent">
        <h1>手风琴</h1>
        <Divider />
        <Collapse accordion>
          <Panel header="This is panel header 1" key="1">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
      <div className="collaContent">
        <h1>幽灵折叠面板</h1>
        <Divider />
        <Collapse defaultActiveKey={["1"]} ghost>
          <Panel header="This is panel header 1" key="1">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
    </>
  );
};

export default CollapsePart;
