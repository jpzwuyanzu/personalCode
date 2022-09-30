import React, { useState, memo, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import SideMenu from "../../layout/SideMenu";
import TopHeader from "../../layout/TopHeader";
import "./NewsSandBox.css";

const { Sider, Content } = Layout;

 const NewsSandBox = () => {
    const [collapsed, setCollapsed] = useState(false);
     return (
       <Layout>
           <Sider trigger={null} collapsible collapsed={collapsed}>
           <SideMenu />
           </Sider>
         <Layout className="site-layout">
           <TopHeader />
           <Content
             className="site-layout-background"
             style={{
               margin: "24px 16px",
               padding: 24,
               minHeight: 280,
             }}>
               {/* <Suspense fallback={ <>....</> }> */}
               <Outlet />
               {/* </Suspense> */}
               {/* 路由容器 */}
           </Content>
         </Layout>
       </Layout>
     );
   }

export default NewsSandBox
