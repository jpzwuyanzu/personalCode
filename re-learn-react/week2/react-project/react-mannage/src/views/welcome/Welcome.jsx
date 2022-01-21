import React from "react";
import { Typography, Divider } from "antd";
const { Title, Paragraph } = Typography;

const Welcome = () => {
  return (
    <>
      <div className="welcome-container">
        <Typography>
          <Title>React项学习总结</Title>
          <Paragraph>
           这是一个React学习项目，总结使用React搭建后台管理系统，学习Hooks的使用，以及熟悉Antd-UI库的使用。
          </Paragraph>
          <Title level={2}>项目中涉及的知识点</Title>
          <Paragraph>
            <ul>
              <li>
                react
              </li>
              <li>
                react-router(路由)
              </li>
              <li>
                react-redux
              </li>
              <li>
                redux(状态管理)
              </li>
              <li>
                redux-immutable + immutable.js (持久化的数据结构)
              </li>
              <li>
                redux-thunk(中间件，处理异步操作)
              </li>
              <li>
                axios(数据请求)
              </li>
              <li>
                antd(ui库)
              </li>
              <li>
                echarts(数据展示)
              </li>
              <li>
                braft-editor(富文本编辑器)
              </li>
              <li>
                antd(ui库)
              </li>
              <li>
                nprogress(顶部进度条)
              </li>
            </ul>
          </Paragraph>
          <Divider />
        </Typography>
      </div>
    </>
  );
};

export default Welcome;
