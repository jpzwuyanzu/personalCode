import { lazy } from 'react'
import {
    HomeOutlined,
    OrderedListOutlined,
    UserOutlined,
    SettingOutlined,
    BorderBottomOutlined,
    AlignCenterOutlined,
    PictureOutlined,
    CodepenCircleOutlined,
    UnderlineOutlined,
    MenuFoldOutlined,
    LinkedinOutlined,
    FieldBinaryOutlined,
    FieldNumberOutlined,
    FieldStringOutlined,
    MenuOutlined,
    MinusSquareOutlined,
    StepForwardOutlined,
    FormOutlined,
    UnorderedListOutlined,
    AppstoreOutlined,
    BorderlessTableOutlined
} from '@ant-design/icons';
const menus = [
    {
        path: '/',
        redirect: '/home',
        meta: {
            hidden: true
        }
    },
    {
        title:'系统首页',
        path: '/home',
        icon: <HomeOutlined />,
        component: lazy(() => import('./../views/home/Index'))
    },
    {
        title: '通用组件',
        path: '/common',
        icon: <BorderBottomOutlined />,
        redirect: '/common/button',
        children: [
            {
              title: '按钮组件',
              path: '/common/button',
              icon: <AlignCenterOutlined />,
              component: lazy(() => import('../views/common/Button'))  
            },
            {
                title: '图标组件',
                path: '/common/icon',
                icon: <PictureOutlined />,
                component: lazy(() => import('../views/common/Icon'))  
              }
        ]
    },
    {
        title: '基本布局',
        path: '/basic',
        icon: <CodepenCircleOutlined />,
        redirect: '/basic/grid',
        children: [
            {
                title: '栅格布局',
                path: '/basic/grid',
                icon: <UnderlineOutlined />,
                component: lazy(() => import('./../views/basicLayout/Grid'))
            },
            {
                title: '通用布局',
                path: '/basic/side',
                icon: <MenuFoldOutlined />,
                component: lazy(() => import('./../views/basicLayout/Layout'))
            }
        ]
    },
    {
        title: '导航组件',
        path: '/navigator',
        icon: <LinkedinOutlined />,
        redirect: '/navigator/affix',
        children: [
            { 
                title: '固钉组件',
                path: '/navigator/affix',
                icon: <FieldBinaryOutlined />,
                component: lazy(() => import('./../views/navigator/Affix'))
            },
            { 
                title: '面包屑',
                path: '/navigator/breadcrumb',
                icon: <FieldNumberOutlined />,
                component: lazy(() => import('./../views/navigator/Breadcrumb'))
            },
            { 
                title: '下拉组件',
                path: '/navigator/drop',
                icon: <FieldStringOutlined />,
                component: lazy(() => import('./../views/navigator/Dropdown'))
            },
            { 
                title: 'Menu组件',
                path: '/navigator/menu',
                icon: <MenuOutlined />,
                component: lazy(() => import('./../views/navigator/Menu'))
            },
            { 
                title: '分页组件',
                path: '/navigator/pagination',
                icon: <MinusSquareOutlined />,
                component: lazy(() => import('./../views/navigator/Pagination'))
            },
            { 
                title: '步骤条',
                path: '/navigator/step',
                icon: <StepForwardOutlined />,
                component: lazy(() => import('./../views/navigator/Steps'))
            }
        ]
    },
    {
        title: '表单组件',
        path: '/form',
        icon: <FormOutlined />,
        redirect: '/form/list',
        children: [
            {
                title: 'Form表单',
                path: '/form/list',
                icon: <UnorderedListOutlined />,
                component: lazy(() => import('./../views/form/Form'))
            }
        ]
    },
    {
        title: '展示组件',
        path: '/show',
        icon: <AppstoreOutlined />,
        redirect: '/show/table',
        children: [
            {
                title: 'Table表格',
                path: '/show/table',
                icon: <BorderlessTableOutlined />,
                component: lazy(() => import('./../views/show/Table'))
            }
        ]
    },
    {
        title:'用户管理',
        path: '/usermannage',
        icon: <UserOutlined />,
        redirect: '/usermannage/userlist',
        children: [
            {
                title:'用户列表',
                path: '/usermannage/userlist',
                icon: <OrderedListOutlined />,
                component: lazy(() => import('./../views/user/UserList'))
            }
        ]
    },
    {
        title:'用户设置',
        path: '/setting',
        icon: <SettingOutlined />,
        component: lazy(() => import('./../views/setting/Index')),
        meta: {
            hidden: true
        }
    },
]

export default menus