import { 
    HomeOutlined,
    BorderOuterOutlined
 } from '@ant-design/icons'

export default [
    {
        path: '/',
        icon: HomeOutlined,
        name: '系统首页',
    },
    {
        path: '/banner',
        icon: BorderOuterOutlined,
        name: '轮播图管理',
        children: [
            {
                path: '/banner/list',
                name: '轮播图列表'
            },
            {
                path: '/banner/add',
                name: '添加轮播图'
            }
        ]
    },
    {
        path: '/pro',
        icon: BorderOuterOutlined,
        name: '产品管理',
        children: [
            {
                path: '/pro/list',
                name: '产品列表'
            }
        ]
    }
]