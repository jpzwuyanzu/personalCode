import menus from './../../router/menu'
import { withRouter, useLocation, Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'

const breadcrumbNameMap = {}

const renderbreadcrumbNameMap = (menus) => {
    menus.forEach((item, index) => {
        if(item.children) {
            breadcrumbNameMap[item.path] = item.title
            renderbreadcrumbNameMap(item.children)
        } else {
            breadcrumbNameMap[item.path] = item.title
        }
    })
}

renderbreadcrumbNameMap(menus)

const Breadcrum = withRouter((props) => {
    // console.log(useLocation(), props.location)
    const location = useLocation()
    const pathSnippets = location.pathname.split('/').filter(i => i);
    // console.log(pathSnippets) //['bannermanager', 'list']
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
        return (
            <Breadcrumb.Item key={url} style={{ lineHeight: '64px'}}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        )
    })

    const breadcrumbItems = [
        <Breadcrumb.Item key="home" style={{ lineHeight: '64px'}}>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>,
      ].concat(extraBreadcrumbItems);


    return (
        <>
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        </>
    )
})

export default Breadcrum