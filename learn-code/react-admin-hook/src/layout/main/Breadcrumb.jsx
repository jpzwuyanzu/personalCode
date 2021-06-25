import { useLocation, withRouter, Link } from 'react-router-dom'
import { Breadcrumb  } from 'antd';
import menus from '../../router/menus'

//构建breadcrumbNameMap数据
const breadcrumbNameMap ={};
const renderBreadcrumbNameMap = (menus) => {
    menus.forEach((item,index) => {
        if(item.children) {
            breadcrumbNameMap[item.path] = item.title
            renderBreadcrumbNameMap(item.children)
        } else {
            breadcrumbNameMap[item.path] = item.title
        }
    })
}
renderBreadcrumbNameMap(menus)



const BreadCrumb = withRouter(() => {
    const location = useLocation() //还可以通过props中解构出来
    const pathSnippets = location.pathname.split('/').filter(i => i)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
          <Breadcrumb.Item key={url} style={{lineHeight:'64px'}}> 
            <Link to={url}>{breadcrumbNameMap[url]}</Link>
          </Breadcrumb.Item>
        );
      });
      const breadcrumbItems = [
        <Breadcrumb.Item key="/" style={{lineHeight:'64px'}}>
          <Link to="/">首页</Link>
        </Breadcrumb.Item>,
      ].concat(extraBreadcrumbItems);




    return (
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    );
})

export default BreadCrumb;
