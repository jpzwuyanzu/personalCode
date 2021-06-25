
import Home from './views/Home'
import Cart from './views/Cart'
import Kind from './views/Kind'
import User from './views/User'
import UserList from './views/UserList'
import AdminList from './views/AdminList'
export default  [
    {
        path:'/home',
        title:'首页',
        component: Home
    },
    {
        path:'/cart',
        title:'购物车管理',
        component: Cart
    },
    {
        path:'/kind',
        title:'分类管理',
        component: Kind
    },
    {
        path:'/user',
        title:'用户管理',
        component: User,
        children:[
            {
                path:'/user/list',
                title:'用户列表',
                component: UserList
            },
            {
                path:'/user/admin',
                title:'管理员列表',
                component: AdminList
            }
        ]
    }　
]