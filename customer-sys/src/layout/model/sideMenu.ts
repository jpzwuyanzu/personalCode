import { reactive } from 'vue'
export function  loadSideMenu() {
    const sideMenu = reactive<any[]>([
        {
            path: '/home',
            key: '1',
            title: '首页',
            icon: 'HomeOutlined'
        },
        {
            path: '/user-mannage',
            key: 2,
            title: '用户管理',
            icon: 'UserOutlined',
            redirect: '/user-mannage/userList',
            children: [
                {
                    path: '/user-mannage/userList',
                    key: '2-1',
                    title: '用户列表',
                    icon: 'UserOutlined'
                },
                {
                    path: '/user-mannage/userStastic',
                    key: '2-2',
                    title: '用户统计',
                    icon: 'UserOutlined'
                }
            ]
        },
        {
            path: '/order-mannage',
            key: 3,
            title: '订单管理',
            icon: 'OrderedListOutlined',
            redirect: '/order-mannage/orderList',
            children: [
                {
                    path: '/order-mannage/orderList',
                    key: '3-1',
                    title: '订单列表',
                    icon: 'OrderedListOutlined'
                },
                {
                    path: '/order-mannage/orderStastic',
                    key: '3-2',
                    title: '订单统计',
                    icon: 'OrderedListOutlined'
                }
            ]
        },
        {
            path: '/role-mannage',
            key: 4,
            title: '角色管理',
            icon: 'UsergroupAddOutlined',
            redirect: '/role-mannage/roleList',
            children: [
                {
                    path: '/role-mannage/roleList',
                    key: '4-1',
                    title: '角色列表',
                    icon: 'UsergroupAddOutlined'
                },
                {
                    path: '/role-mannage/permissList',
                    key: '4-2',
                    title: '权限列表',
                    icon: 'UsergroupAddOutlined'
                }
            ]
        }
    ]);
    return {sideMenu}
}