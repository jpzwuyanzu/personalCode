import React from 'react';
import { Layout, Divider } from 'antd'
const {Header, Content, Sider, Footer } = Layout

const LayoutCom = () => {
    return (
        <div style={{ height:'400px' }}>
            <h1>Layout布局</h1>
            <Divider/>
            <Layout>
            <Sider style={{ backgroundColor: '#3ba0e9', color: '#fff' }}>Sider</Sider>
                <Layout>
                    <Header style={{ backgroundColor:'#7dbcea', color: '#fff' }}>Header</Header>
                    <Content style={{ background: '#108EE9', color: '#fff'}}>Content</Content>
                    <Footer style={{ backgroundColor:'#7dbcea', color: '#fff' }}>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    );
}

export default LayoutCom;
