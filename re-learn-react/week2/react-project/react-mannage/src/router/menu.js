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
    BorderlessTableOutlined,
    GithubOutlined
} from '@ant-design/icons';
const menus = [
    {
        path: '/',
        redirect: '/welcome',
        meta: {
            hidden: true
        }
    },
    {
        title:'欢迎页',
        key: '0-0',
        path: '/welcome',
        icon: <GithubOutlined />,
        component: lazy(() => import('./../views/welcome/Welcome'))
    },
    {
        title:'系统首页',
        key: '0-1',
        path: '/home',
        icon: <HomeOutlined />,
        component: lazy(() => import('./../views/home/Index')),
        auth: 2
    },
    {
        title: '通用组件',
        key: '0-2',
        path: '/common',
        icon: <BorderBottomOutlined />,
        redirect: '/common/button',
        children: [
            {
              title: '按钮组件',
              key: '0-2-0',
              path: '/common/button',
              icon: <AlignCenterOutlined />,
              component: lazy(() => import('../views/common/Button'))  
            },
            {
                title: '图标组件',
                key: '0-2-1',
                path: '/common/icon',
                icon: <PictureOutlined />,
                component: lazy(() => import('../views/common/Icon'))  
              }
        ]
    },
    {
        title: '基本布局',
        key: '0-3',
        path: '/basic',
        icon: <CodepenCircleOutlined />,
        redirect: '/basic/grid',
        children: [
            {
                title: '栅格布局',
                key: '0-3-0',
                path: '/basic/grid',
                icon: <UnderlineOutlined />,
                component: lazy(() => import('./../views/basicLayout/Grid'))
            },
            {
                title: '通用布局',
                key: '0-3-1',
                path: '/basic/side',
                icon: <MenuFoldOutlined />,
                component: lazy(() => import('./../views/basicLayout/Layout'))
            }
        ]
    },
    {
        title: '导航组件',
        key: '0-4',
        path: '/navigator',
        icon: <LinkedinOutlined />,
        redirect: '/navigator/affix',
        children: [
            { 
                title: '固钉组件',
                key: '0-4-0',
                path: '/navigator/affix',
                icon: <FieldBinaryOutlined />,
                component: lazy(() => import('./../views/navigator/Affix'))
            },
            { 
                title: '面包屑',
                key: '0-4-1',
                path: '/navigator/breadcrumb',
                icon: <FieldNumberOutlined />,
                component: lazy(() => import('./../views/navigator/Breadcrumb'))
            },
            { 
                title: '下拉组件',
                key: '0-4-2',
                path: '/navigator/drop',
                icon: <FieldStringOutlined />,
                component: lazy(() => import('./../views/navigator/Dropdown'))
            },
            { 
                title: 'Menu组件',
                key: '0-4-3',
                path: '/navigator/menu',
                icon: <MenuOutlined />,
                component: lazy(() => import('./../views/navigator/Menu'))
            },
            { 
                title: '分页组件',
                key: '0-4-4',
                path: '/navigator/pagination',
                icon: <MinusSquareOutlined />,
                component: lazy(() => import('./../views/navigator/Pagination'))
            },
            { 
                title: '步骤条',
                key: '0-4-5',
                path: '/navigator/step',
                icon: <StepForwardOutlined />,
                component: lazy(() => import('./../views/navigator/Steps'))
            }
        ]
    },
    {
        title: '表单组件',
        key: '0-5',
        path: '/form',
        icon: <FormOutlined />,
        redirect: '/form/list',
        children: [
            {
                title: 'Form表单',
                key: '0-5-0',
                path: '/form/list',
                icon: <UnorderedListOutlined />,
                component: lazy(() => import('./../views/form/Form'))
            }
        ]
    },
    {
        title: '展示组件',
        key: '0-6',
        path: '/show',
        icon: <AppstoreOutlined />,
        redirect: '/show/table',
        children: [
            {
                title: 'Table表格',
                key: '0-6-0',
                path: '/show/table',
                icon: <BorderlessTableOutlined />,
                component: lazy(() => import('./../views/show/Table'))
            },
            {
                title: '表格功能展示',
                key: '0-6-1',
                path: '/show/mytable',
                icon: <BorderlessTableOutlined />,
                component: lazy(() => import('./../views/show/MyTable'))
            },
            {
                title: 'SHOW组件',
                key: '0-6-2',
                path: '/show/moreShow',
                icon: <BorderlessTableOutlined />,
                component: lazy(() => import('./../views/show/MoreShow'))
            },
            {
                title: 'Table实例',
                key: '0-6-3',
                path: '/show/moretable',
                icon: <BorderlessTableOutlined />,
                component: lazy(() => import('./../views/show/OtherTable'))
            },
            {
                title: 'Braft-Editor',
                key: '0-6-4',
                path: '/show/BraftEditor',
                icon: <BorderlessTableOutlined />,
                component: lazy(() => import('./../views/show/Editor'))
            }
        ]
    },
    {
        title:'用户管理',
        key: '0-7',
        path: '/usermannage',
        icon: <UserOutlined />,
        redirect: '/usermannage/userlist',
        auth: 2,
        children: [
            {
                title:'用户列表',
                key: '0-7-0',
                path: '/usermannage/userlist',
                icon: <OrderedListOutlined />,
                component: lazy(() => import('./../views/user/UserList')),
                auth: 2
            },
            {
                title:'管理员列表',
                key: '0-7-1',
                path: '/usermannage/adminlist',
                icon: <OrderedListOutlined />,
                component: lazy(() => import('./../views/user/AdminList')),
                auth: 2
            }
        ]
    },
    {
        title:'用户设置',
        key: '0-8',
        path: '/setting',
        icon: <SettingOutlined />,
        component: lazy(() => import('./../views/setting/Index')),
        meta: {
            hidden: true
        }
    },
    {
        title:'个人中心',
        key: '0-9',
        path: '/userCenter',
        icon: <SettingOutlined />,
        component: lazy(() => import('./../views/user/UserCenter')),
        meta: {
            hidden: true
        }
    }
]

export default menus