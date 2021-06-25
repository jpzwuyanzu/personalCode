import React from "react";
import { Button, Divider, Row, Col, Tooltip, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scss";

const ButtonPart = () => {
  return (
    <>
      <div className="buttonHeader">
        <h1>何时使用</h1>
        <Divider />
        <p>
          标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
        </p>
      </div>
      <Row>
        <Col span={12}>
          <div className="buttonLeft">
            <Space>
              <Button type="primary">primary button</Button>
              <Button type="dashed">dashed button</Button>
              <Button type="text">text button</Button>
              <Button type="link">link button</Button>
            </Space>
            <Space style={{marginTop:'40px'}}>
            <Button danger type="primary">primary button</Button>
              <Button danger type="dashed">dashed button</Button>
              <Button danger type="text">text button</Button>
              <Button danger type="link">link button</Button>
            </Space>
          </div>
        </Col>
        <Col span={12}>
          <div className="buttonRight">
            <Space>
              <Tooltip title="search">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<SearchOutlined />}
                />
              </Tooltip>
              <Button type="primary" shape="circle">
                A
              </Button>
              <Button type="primary" icon={<SearchOutlined />}>
                Search
              </Button>
              <Tooltip title="search">
                <Button shape="circle" icon={<SearchOutlined />} />
              </Tooltip>
              <Button icon={<SearchOutlined />}>Search</Button>
              <br />
              <br />
              <Tooltip title="search">
                <Button shape="circle" icon={<SearchOutlined />} />
              </Tooltip>
              <Button icon={<SearchOutlined />}>Search</Button>
              <Tooltip title="search">
                <Button
                  type="dashed"
                  shape="circle"
                  icon={<SearchOutlined />}
                />
              </Tooltip>
              <Button type="dashed" icon={<SearchOutlined />}>
                Search
              </Button>
            </Space>
            <Space style={{marginTop:'40px'}}>
                <Button type="primary" block>primary</Button>
                <Button type="dashed" block>dashed</Button>
                <Button type="link" block>link</Button>
                <Button type="primary" loading>
          Loading
        </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ButtonPart;
