// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
//   SmileOutlined,
//   DownOutlined
// } from '@ant-design/icons';
// import { Layout, Menu,  Dropdown, Space} from 'antd';
// import React, { useState } from 'react';
// const { Header, Sider, Content } = Layout;

// const App = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const menu = (
//     <Menu
//       items={[
//         {
//           key: '1',
//           label: (
//             <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
//               1st menu item
//             </a>
//           ),
//         },
//         {
//           key: '2',
//           label: (
//             <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
//               2nd menu item (disabled)
//             </a>
//           ),
//           icon: <SmileOutlined />,
//           disabled: true,
//         },
//         {
//           key: '3',
//           label: (
//             <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
//               3rd menu item (disabled)
//             </a>
//           ),
//           disabled: true,
//         },
//         {
//           key: '4',
//           danger: true,
//           label: 'a danger item',
//         },
//       ]}
//       onClick={(value) => {
//         console.log(value)
//       }}
//     />
//   );
//   return (
//     <Layout>
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <div className="logo" />
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={['1']}
//           items={[
//             {
//               key: '1',
//               icon: <UserOutlined />,
//               label: 'nav 1',
//             },
//             {
//               key: '2',
//               icon: <VideoCameraOutlined />,
//               label: 'nav 2',
//             },
//             {
//               key: '3',
//               icon: <UploadOutlined />,
//               label: 'nav 3',
//             },
//           ]}
//         />
//       </Sider>
//       <Layout className="site-layout">
//         <Header
//           className="site-layout-background"
//           style={{
//             padding: 0,
//           }}
//         >
//           {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
//             className: 'trigger',
//             onClick: () => setCollapsed(!collapsed),
//           })}
//         </Header>
//         <Content
//           className="site-layout-background"
//           style={{
//             margin: '24px 16px',
//             padding: 24,
//             minHeight: 280,
//           }}
//         >
//           <Dropdown overlay={menu} trigger={["click"]}>
//               <a onClick={e => e.preventDefault()}>
//                 <Space>
//                   Hover me
//                   <DownOutlined />
//                 </Space>
//               </a>
//             </Dropdown>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default App;
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        app
      </div>
    )
  }
}
