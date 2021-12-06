import React from 'react';
import { withRouter, useLocation, Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import menus from './../../router/menu'

const breadcrumbNameMap = {}

//递归遍历获取{ path: title }结构的数据
const renderBreadcrumbNameMap = (menus) => {
     menus.forEach(item => {
        if(item.children) {
            breadcrumbNameMap[item.path] = item.title 
            renderBreadcrumbNameMap(item.children)
        } else {
            breadcrumbNameMap[item.path] = item.title 
        }
    })
}

renderBreadcrumbNameMap(menus)

const Breadcrum = withRouter((props) => {
    const location = useLocation();

    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url} style={{ lineHeight: '64px' }}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="welcome" style={{ lineHeight: '64px' }}>
      <Link to="/">Welcome</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

    return (
        <>
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        </>
    );
})

export default Breadcrum;
