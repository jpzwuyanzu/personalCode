import React from 'react';
import { Layout, theme } from 'antd';
import RouterView from '@/components/RouterView'
import SideMenu from '@/layout/SideMenu'
import TopHeader from '@/layout/TopHeader'
import styles from './PageSandBox.module.scss'

const { Content } = Layout;
const PageSandBox: React.FC = () => {
  const {token: { colorBgContainer }} = theme.useToken();

  return (
    <div className={styles.page_sand_box}>
      <Layout>
      <SideMenu/>
      <Layout>
        <TopHeader/>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <RouterView/>
        </Content>
      </Layout>
    </Layout>
    </div>
  );
};

export default PageSandBox;