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
        title: '系统首页',
        icon: <HomeOutlined/>,
        component: lazy(() => import('./../views/home/Index'))
    },
    {
        path: '/bannermanager',
        title: '轮播图管理',
        icon: <PictureOutlined />,
        redirect: '/bannermanager/list',
        children: [
            {
                path: '/bannermanager/list',
                title: '轮播图列表',
                icon: <MenuOutlined />,
                component: lazy(() => import('./../views/banner/Index'))
            }, 
        ]
    },
    {
        path: '/navigatormanager',
        title: '快捷导航管理',
        icon: <LinkOutlined />,
        redirect: '/navigatormanager/list',
        children: [
            {
                path: '/navigatormanager/list',
                title: '导航列表',
                icon: <OrderedListOutlined />,
                component: lazy(() => import('./../views/navgator/List'))
            }, 
            {
                path: '/navigatormanager/category',
                title: '导航分类',
                icon: <PicRightOutlined />,
                component: lazy(() => import('./../views/navgator/Category'))
            }, 
            {
                path: '/navigatormanager/homelist',
                title: '首页导航',
                icon: <DashOutlined />,
                component: lazy(() => import('./../views/navgator/HomeList'))
            }, 
        ]
    },
    {
        path: '/seckillmanager',
        title: '秒杀管理',
        icon: <FieldTimeOutlined />,
        redirect: '/seckillmanager/list',
        children: [
            {
                path: '/seckillmanager/list',
                title: '首页秒杀列表',
                icon: <UnorderedListOutlined />,
                component: lazy(() => import('./../views/seckill/List'))
            }, 
        ]
    },
    {
        path: '/usermanager',
        title: '用户管理',
        icon: <UserOutlined />,
        redirect: '/usermanager/list',
        children: [
            {
                path: '/usermanager/list',
                title: '用户列表',
                icon: <UserOutlined />,
                component: lazy(() => import('./../views/user/List'))
            }
        ]
    },
    {
        path: '/setting',
        title: '用户设置',
        icon: <UserOutlined />,
        component: lazy(() => import('../views/setting/Index')),
        meta: {
            hidden: true
        }
    }
]

export default menus