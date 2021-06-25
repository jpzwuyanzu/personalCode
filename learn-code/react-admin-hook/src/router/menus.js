import React, { lazy } from 'react'
import {  
    HomeOutlined,
    AppstoreOutlined,
    GoldOutlined,
    FormOutlined,
    DatabaseOutlined,
    SlidersOutlined,
    InfoCircleOutlined,
    SettingOutlined, 
    OrderedListOutlined,
    UserOutlined
} from '@ant-design/icons';
const menus = [
    {
        path:'/',
        key:'/',
        redirect:'/home',
        meta:{
            hidden: true
        }
    },
    {
        path:'/home',
        key:'0-0',
        title:'系统首页',
        icon:<HomeOutlined />,
        component:lazy(() => import('../views/Home/Index'))
    },
    {
        path:'/user',
        key:'0-1',
        title:'用户管理',
        icon:<UserOutlined />,
        redirect:'/user/list',
        children:[
            {
                path:'/user/list',
                key:'0-1-0',
                title:'用户列表',
                icon:<OrderedListOutlined />,
                component:lazy(() => import('../views/user/List'))
            },
            {
                path:'/user/adminlist',
                key:'0-1-1',
                title:'管理员列表',
                icon:<OrderedListOutlined />,
                component:lazy(() => import('../views/user/AdminList')),
                auth:'1',
            }
        ]
    },
    {
        path:'/public',
        key:'0-2',
        title:'通用',
        icon:<AppstoreOutlined />,
        redirect:'/public/button',
        children:[
            {
                path:'/public/button',
                key:'0-2-0',
                title:'按钮',
                icon:<OrderedListOutlined />,
                component:lazy(() => import('../views/public/Button/Button'))
            },
            {
                path:'/public/icon',
                key:'0-2-1',
                title:'图标',
                icon:<OrderedListOutlined />,
                component:lazy(() => import('../views/public/Icon/Icon'))
            }
        ]
    },
    {
        path:'/nav',
        key:'0-3',
        title:'导航',
        icon:<GoldOutlined />,
        redirect:'/nav/dropdown',
        auth:'1',
        children:[
            {
                path:'/nav/dropdown',
                key:'0-3-0',
                title:'下拉菜单',
                icon:<OrderedListOutlined />,
                component:lazy(() => import('../views/nav/Dropdown/Dropdown')),
                auth:'1',
            },
            {
                path:'/nav/menu',
                key:'0-3-1',
                title:'导航菜单',
                icon:<OrderedListOutlined />,
                component:lazy(() => import('../views/nav/Navmenu/Navmenu')),
                auth:'1',
            },
            {
                path:'/nav/step',
                key:'0-3-2',
                title:'步骤条',
                icon:<OrderedListOutlined />,
                component:lazy(() => import('../views/nav/Step/Step')),
                auth:'1',
            }
        ]
    },
    {
        path:'/form',
        key:'0-4',
        title:'表单',
        icon:<FormOutlined />,
        redirect:'/form/baseform',
        auth:'1',
        children:[
            {
                path:'/form/baseform',
                key:'0-4-0',
                title:'基础表单',
                icon:<OrderedListOutlined />,
                component:lazy(() => import('../views/form/Baseform/Baseform')),
                auth:'1',
            },
            {
                path:'/form/stepform',
                key:'0-4-1',
                title:'步骤表单',
                icon:<OrderedListOutlined />,
                component:lazy(() => import('../views/form/Stepform/Stepform')),
                auth:'1',
            }
        ]
    },
    {
        path:'/show',
        key:'0-5',
        title:'展示',
        icon:<DatabaseOutlined />,
        redirect:'/show/table',
        auth:'1',
        children:[
            {
                path:'/show/table',
                key:'0-5-0',
                title:'表格',
                icon:<OrderedListOutlined />,
                component:lazy(() => import('../views/show/Table/Table')),
                auth:'1',
            },
            {
                path:'/show/collapse',
                key:'0-5-1',
                title:'折叠面板',
                icon:<OrderedListOutlined />,
                component:lazy(() => import('../views/show/Collapse/Collapse')),
                auth:'1',
            },
            {
                path:'/show/tree',
                key:'0-5-2',
                title:'树形控件',
                icon:<OrderedListOutlined />,
                component:lazy(() => import('../views/show/Tree/Tree')),
                auth:'1',
            },
            {
                path:'/show/tab',
                key:'0-5-3',
                title:'标签页',
                icon:<OrderedListOutlined />,
                component:lazy(() => import('../views/show/Tabs/Tabs')),
                auth:'1',
            },
        ]
    },
    {
        path:'/others',
        key:'0-6',
        title:'其他',
        icon:<SlidersOutlined />,
        redirect:'/others/progress',
        auth:'1',
        children:[
            {
                path:'/others/progress',
                key:'0-6-0',
                title:'进度条',
                icon:<OrderedListOutlined />,
                component:lazy(() => import('../views/others/Progress/Progress')),
                auth:'1',
            },
            // {
            //     path:'/others/animation',
            //     title:'动画',
            //     icon:<OrderedListOutlined />,
            //     component:lazy(() => import('../views/others/Animation/Animation'))
            // },
            {
                path:'/others/upload',
                key:'0-6-1',
                title:'上传',
                icon:<OrderedListOutlined />,
                component:lazy(() => import('../views/others/Upload/Upload')),
                auth:'1',
            },
            {
                path:'/others/editor',
                key:'0-6-2',
                title:'富文本',
                icon:<OrderedListOutlined />,
                component:lazy(() => import('../views/others/Editor/Editor')),
                auth:'1',
            },
        ]
    },
    {
        path:'/about',
        key:'0-7',
        title:'关于',
        icon:<InfoCircleOutlined />, 
        component:lazy(() => import('../views/about/About'))
    },
    {
        path:'/setting',
        key:'0-8',
        title:'用户设置',
        icon:<SettingOutlined />, 
        component:lazy(() => import('../views/setting/Index')),
        meta:{
            hidden:true
        }
    }
    
]

export default menus