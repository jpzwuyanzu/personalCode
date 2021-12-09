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
            {
                path: '/bannermanager/add',
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
        path: '/homemanager',
        title: '首页数据管理',
        icon: <FieldTimeOutlined />,
        redirect: '/homemanager/seckilllist',
        children: [
            {
                path: '/homemanager/seckilllist',
                title: '首页秒杀列表',
                icon: <UnorderedListOutlined />,
                component: lazy(() => import('../views/homedata/SeckillList'))
            }, 
            {
                path: '/homemanager/recommendlist',
                title: '首页推荐列表',
                icon: <UnorderedListOutlined />,
                component: lazy(() => import('../views/homedata/RecomendList'))
            }, 
        ]
    },
    {
        path: '/productmanager',
        title: '商品管理',
        icon: <FieldTimeOutlined />,
        redirect: '/productmanager/list',
        children: [
            {
                path: '/productmanager/list',
                title: '商品列表',
                icon: <UnorderedListOutlined />,
                component: lazy(() => import('./../views/product/List'))
            }, 
            {
                path: '/productmanager/sortlist',
                title: '筛选商品',
                icon: <UnorderedListOutlined />,
                component: lazy(() => import('./../views/product/SortList'))
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