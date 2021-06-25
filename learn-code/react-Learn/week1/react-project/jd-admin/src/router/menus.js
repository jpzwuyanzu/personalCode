import React, {lazy} from 'react';
import {  
    HomeOutlined, 
    PictureOutlined, 
    OrderedListOutlined, 
    SlackOutlined  
} from '@ant-design/icons';
const menus = [
    {
        path:'/',
        key:'/',
        redirect:'/home',
        meta:{
            hidden:true
        }
    },
    {
        path:'/home',
        key:'0-0',
        title:'系统首页',
        icon:<HomeOutlined />,
        component: lazy(() => import('./../views/home/Index'))
    },
    {
        path:'/bannerMannager',
        key:'0-1',
        title:'轮播图管理',
        icon:<PictureOutlined />,
        redirect:'/bannerMannager/list',
        children:[
            {
                path:'/bannerMannager/list',
                key:'0-1-0',
                title:'轮播图列表',
                icon:<OrderedListOutlined />,
                component: lazy(() => import('./../views/banner/Index')),
            },
            {
                path:'/bannerMannager/add',
                key:'0-1-1',
                title:'添加轮播图',
                icon:<OrderedListOutlined />,
                component: lazy(() => import('./../views/banner/Add')),
                meta:{
                    hidden:true
                }
            }
        ]
    },
    {
        path:'/navigatorMannager',
        key:'0-2',
        title:'快捷导航管理',
        icon:<SlackOutlined />,
        redirect:'/navigatorMannager/list',
        children:[
            {
                path:'/navigatorMannager/list',
                key:'0-2-0',
                title:'导航的列表',
                icon:<OrderedListOutlined />,
                component: lazy(() => import('./../views/navigator/List')),
            },
            {
                path:'/navigatorMannager/category',
                key:'0-2-1',
                title:'导航的分类',
                icon:<OrderedListOutlined />,
                component: lazy(() => import('./../views/navigator/Category')),
            },
            {
                path:'/navigatorMannager/homelist',
                key:'0-2-2',
                title:'首页导航',
                icon:<OrderedListOutlined />,
                component: lazy(() => import('./../views/navigator/Homelist')),
            }
        ]
    },
    {
        path:'/seckillMannager',
        key:'0-3',
        title:'首页数据管理',
        icon:<HomeOutlined />,
        redirect:'/seckillMannager/list',
        children:[
            {
                path:'/seckillMannager/list',
                key:'0-3-0',
                title:'首页秒杀列表',
                icon:<OrderedListOutlined />, 
                component: lazy(() => import('./../views/seckill/List'))
            },
            {
                path:'/seckillMannager/recommondlist',
                key:'0-3-1',
                title:'首页推荐列表',
                icon:<OrderedListOutlined />, 
                component: lazy(() => import('./../views/seckill/Recomondlist'))
            }
        ]
    },
    {
        path:'/userMannager',
        key:'0-4',
        title:'用户管理',
        icon:<HomeOutlined />,
        redirect:'/userMannager/list',
        children:[
            {
                path:'/userMannager/list',
                key:'0-4-0',
                title:'用户列表',
                icon:<OrderedListOutlined />, 
                component: lazy(() => import('./../views/user/List'))
            },
            {
                path:'/userMannager/adminlist',
                key:'0-4-1',
                title:'管理员列表',
                icon:<OrderedListOutlined />, 
                component: lazy(() => import('./../views/user/AdminList'))
            }
        ]
    },
    {
        path:'/productMannager',
        key:'0-5',
        title:'商品管理',
        icon:<HomeOutlined />,
        redirect:'/productMannager/list',
        children:[
            {
                path:'/productMannager/list',
                key:'0-5-0',
                title:'商品列表',
                icon:<OrderedListOutlined />, 
                component: lazy(() => import('./../views/product/list'))
            },
            {
                path:'/productMannager/sortlist',
                key:'0-5-1',
                title:'筛选商品',
                icon:<OrderedListOutlined />, 
                component: lazy(() => import('./../views/product/sortlist'))
            }
        ]
    },
    {
        path:'/setting',
        key:'0-6',
        title:'设置',
        icon:<OrderedListOutlined />, 
        component: lazy(() => import('../views/setting/Index')),
        meta:{
            hidden:true
        }
    }
    
]

export default menus