import React, { lazy } from 'react'
import {
    HomeOutlined,
    PictureOutlined,
    MenuOutlined,
    LinkOutlined,
    OrderedListOutlined,
    PicRightOutlined,
    DashOutlined,
    FieldTimeOutlined,
    UnorderedListOutlined,
    UserOutlined
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
        path: '/home',
        key: '0-0',
        title: '系统首页',
        icon: <HomeOutlined/>,
        component: lazy(() => import('./../views/home/Index'))
    },
    {
        path: '/bannermanager',
        key: '0-1',
        title: '轮播图管理',
        icon: <PictureOutlined />,
        redirect: '/bannermanager/list',
        children: [
            {
                path: '/bannermanager/list',
                key: '0-1-0',
                title: '轮播图列表',
                icon: <MenuOutlined />,
                component: lazy(() => import('./../views/banner/Index'))
            }, 
            {
                path: '/bannermanager/add',
                key: '0-1-1',
                title: '添加轮播图',
                icon: <MenuOutlined />,
                component: lazy(() => import('./../views/banner/Add')),
                meta: {
                    hidden: true
                }
            }, 
        ]
    },
    {
        path: '/navigatormanager',
        key: '0-2',
        title: '快捷导航管理',
        icon: <LinkOutlined />,
        redirect: '/navigatormanager/list',
        children: [
            {
                path: '/navigatormanager/list',
                key: '0-2-0',
                title: '导航列表',
                icon: <OrderedListOutlined />,
                component: lazy(() => import('./../views/navgator/List'))
            }, 
            {
                path: '/navigatormanager/category',
                key: '0-2-1',
                title: '导航分类',
                icon: <PicRightOutlined />,
                component: lazy(() => import('./../views/navgator/Category'))
            }, 
            {
                path: '/navigatormanager/homelist',
                key: '0-2-2',
                title: '首页导航',
                icon: <DashOutlined />,
                component: lazy(() => import('./../views/navgator/HomeList'))
            }, 
        ]
    },
    {
        path: '/homemanager',
        key: '0-3',
        title: '首页数据管理',
        icon: <FieldTimeOutlined />,
        redirect: '/homemanager/seckilllist',
        children: [
            {
                path: '/homemanager/seckilllist',
                key: '0-3-0',
                title: '首页秒杀列表',
                icon: <UnorderedListOutlined />,
                component: lazy(() => import('../views/homedata/SeckillList'))
            }, 
            {
                path: '/homemanager/recommendlist',
                key: '0-3-1',
                title: '首页推荐列表',
                icon: <UnorderedListOutlined />,
                component: lazy(() => import('../views/homedata/RecomendList'))
            }, 
        ]
    },
    {
        path: '/productmanager',
        key: '0-4',
        title: '商品管理',
        icon: <FieldTimeOutlined />,
        redirect: '/productmanager/list',
        children: [
            {
                path: '/productmanager/list',
                key: '0-4-0',
                title: '商品列表',
                icon: <UnorderedListOutlined />,
                component: lazy(() => import('./../views/product/List'))
            }, 
            {
                path: '/productmanager/sortlist',
                key: '0-4-1',
                title: '筛选商品',
                icon: <UnorderedListOutlined />,
                component: lazy(() => import('./../views/product/SortList'))
            }, 
        ]
    },
    {
        path: '/usermanager',
        key: '0-5',
        title: '用户管理',
        icon: <UserOutlined />,
        redirect: '/usermanager/list',
        children: [
            {
                path: '/usermanager/list',
                key: '0-5-0',
                title: '用户列表',
                icon: <UserOutlined />,
                component: lazy(() => import('./../views/user/List'))
            },
            {
                path: '/usermanager/register',
                key: '0-5-1',
                title: '注册用户',
                icon: <UserOutlined />,
                component: lazy(() => import('./../views/user/Register'))
            },
            {
                path: '/usermanager/adminlist',
                key: '0-5-2',
                title: '管理员列表',
                icon: <UserOutlined />,
                component: lazy(() => import('./../views/user/AdminList'))
            }
        ]
    },
    {
        path: '/setting',
        key: '0-6',
        title: '用户设置',
        icon: <UserOutlined />,
        component: lazy(() => import('../views/setting/Index')),
        meta: {
            hidden: true
        }
    }
]

export default menus