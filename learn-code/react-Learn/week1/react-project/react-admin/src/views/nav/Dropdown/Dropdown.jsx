import React from "react";
import { Menu, Dropdown, Divider, Button, Space, Tooltip, message } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import "./index.scss";
const DropdownPart = () => {
  const handleButtonClick = (e) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };

  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const leftmenu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );
  const rightmenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="dropPart">
        <div className="title">
          <h1>DropDown下拉菜单</h1>
          <p>
            当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。
          </p>
          <Divider />
        </div>
        <div className="downFlex">
          <div className="LeftPart">
            <Space>
              <Dropdown overlay={leftmenu} placement="bottomLeft" arrow>
                <Button>bottomLeft</Button>
              </Dropdown>
              <Dropdown overlay={leftmenu} placement="bottomCenter" arrow>
                <Button>bottomCenter</Button>
              </Dropdown>
              <Dropdown overlay={leftmenu} placement="bottomRight" arrow>
                <Button>bottomRight</Button>
              </Dropdown>
              <br />
              <Dropdown overlay={leftmenu} placement="topLeft" arrow>
                <Button>topLeft</Button>
              </Dropdown>
              <Dropdown overlay={leftmenu} placement="topCenter" arrow>
                <Button>topCenter</Button>
              </Dropdown>
              <Dropdown overlay={leftmenu} placement="topRight" arrow>
                <Button>topRight</Button>
              </Dropdown>
            </Space>
          </div>
          <div className="rightPart">
            <Space wrap>
              <Dropdown.Button onClick={handleButtonClick} overlay={rightmenu}>
                Dropdown
              </Dropdown.Button>
              <Dropdown.Button
                overlay={rightmenu}
                placement="bottomCenter"
                icon={<UserOutlined />}
              >
                Dropdown
              </Dropdown.Button>
              <Dropdown.Button
                onClick={handleButtonClick}
                overlay={rightmenu}
                disabled
              >
                Dropdown
              </Dropdown.Button>
              <Dropdown.Button
                overlay={rightmenu}
                buttonsRender={([leftButton, rightButton]) => [
                  <Tooltip title="tooltip" key="leftButton">
                    {leftButton}
                  </Tooltip>,
                  React.cloneElement(rightButton, { loading: true }),
                ]}
              >
                With Tooltip
              </Dropdown.Button>
              <Dropdown overlay={rightmenu}>
                <Button>
                  Button <DownOutlined />
                </Button>
              </Dropdown>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropdownPart;
