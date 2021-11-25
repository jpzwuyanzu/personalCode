import Home from './views/Home'
import Kind from './views/Kind'
import Cart from './views/Cart'
import User from './views/User'
import UserList from './views/UserList'
import AdminList from './views/AdminList'

// eslint-disable-next-line import/no-anonymous-default-export
export default  [
    {
        path: '/home',
        title: '首页',
        component: Home
    },
    {
        path: '/kind',
        title: '分类管理',
        component: Kind
    },
    {
        path: '/cart',
        title: '购物车管理',
        component: Cart
    },
    {
        path: '/user',
        title: '用户管理',
        component: User,
        children: [
            {
                path: '/user/list',
                title: '用户列表',
                component: UserList  
            },
            {
                path: '/user/admin',
                title: '管理员列表',
                component: AdminList  
            }
        ]
    }
]