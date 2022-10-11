import React from "react";
import RouterView from '../../components/RouterView'
import { Layout } from "antd";
import SideMenu from "../../layout/SideMenu";
import TopHeader from "../../layout/TopHeader";
import "./NewsSandBox.css";

const { Content } = Layout;

 const NewsSandBox = () => {
     return (
       <Layout>
           <SideMenu />
         <Layout className="site-layout">
           <TopHeader />
           <Content
             className="site-layout-background"
             style={{
               margin: "24px 16px",
               padding: 24,
               minHeight: 280,
               overflow: 'auto'
             }}>
               {/* <Suspense fallback={ <>....</> }> */}
               <RouterView />
               {/* </Suspense> */}
               {/* 自定义React路由容器 */}
           </Content>
         </Layout>
       </Layout>
     );
   }

export default NewsSandBox
