import { lazy } from 'react'
import {
    HomeOutlined,
    PictureOutlined,
    OrderedListOutlined,
    LinkOutlined,
    AlignCenterOutlined,
    FieldTimeOutlined,
    UserOutlined,
    SettingOutlined
} from '@ant-design/icons';
const menus = [
    {
        title:'系统首页',
        path: '/',
        icon: <HomeOutlined />,
        component: lazy(() => import('./../views/home/Index'))
    },
    {
        title:'轮播图管理',
        path: '/bannermannage',
        icon: <PictureOutlined />,
        children: [
            {
                title:'轮播图列表',
                path: '/bannermannage/list',
                icon: <OrderedListOutlined />,
                component: lazy(() => import('./../views/banner/BannerList'))
            },
        ]
    },
    {
        title:'快捷导航管理',
        path: '/navigatormannage',
        icon: <LinkOutlined />,
        children: [
            {
                title:'导航分类',
                path: '/navigatormannage/category',
                icon: <AlignCenterOutlined />,
                component: lazy(() => import('./../views/navigator/Category'))
            },
            {
                title:'导航列表',
                path: '/navigatormannage/list',
                icon: <AlignCenterOutlined />,
                component: lazy(() => import('./../views/navigator/List'))
            },
            {
                title:'首页导航',
                path: '/navigatormannage/homelist',
                icon: <AlignCenterOutlined />,
                component: lazy(() => import('./../views/navigator/HomeList'))
            },
        ]
    },
    {
        title:'秒杀管理',
        path: '/seckillmannage',
        icon: <FieldTimeOutlined />,
        children: [
            {
                title:'首页秒杀列表',
                path: '/seckillmannage/seckilllist',
                icon: <OrderedListOutlined />,
                component: lazy(() => import('./../views/seckill/SecKillList'))
            }
        ]
    },
    {
        title:'用户管理',
        path: '/usermannage',
        icon: <UserOutlined />,
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