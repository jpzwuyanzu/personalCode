import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import SideMenu from "../../layout/SideMenu";
import TopHeader from "../../layout/TopHeader";
import "./NewsSandBox.css";

const { Content } = Layout;

export default function NewsSandBox() {
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
          }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
