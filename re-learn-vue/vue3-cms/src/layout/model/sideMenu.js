import { reactive } from 'vue'
export function loadSideMenu() {
    const menuData = {
        sideMenus: reactive([])
    }
    menuData.sideMenus = reactive([
        {
            path: '/home',
            key: '1',
            title: '系统首页',
            icon: 'HomeOutlined'
        },
        {
            path: '/order-Mannage',
            redirect: '/order-Mannage/orderList',
            key: '2',
            title: '订单管理',
            icon: 'OrderedListOutlined',
            children: [
                {
                    path: '/order-Mannage/orderList',
                    key: '2-1',
                    title: '订单列表',
                    icon: 'OrderedListOutlined',
                }
            ]
        },
        {
            path: '/recharge-Mannage',
            redirect: '/recharge-Mannage/rechargeList',
            key: '3',
            title: '充值管理',
            icon: 'PayCircleOutlined',
            children: [
                {
                    path: '/recharge-Mannage/rechargeList',
                    key: '3-1',
                    title: '充值列表',
                    icon: 'PayCircleOutlined',
                },
                {
                    path: '/recharge-Mannage/rechargeSetting',
                    key: '3-2',
                    title: '充值设置',
                    icon: 'PayCircleOutlined',
                }
            ]
        },
        {
            path: '/sys-Mannage',
            redirect: '/sys-Mannage/sysSetting',
            key: '4',
            title: '系统管理',
            icon: 'AppstoreOutlined',
            children: [
                {
                    path: '/sys-Mannage/sysSetting',
                    key: '4-1',
                    title: '系统设置',
                    icon: 'AppstoreOutlined',
                }
            ]
        },
        {
            path: '/user-Mannage',
            redirect: '/user-Mannage/userList',
            key: '5',
            title: '用户管理',
            icon: 'UserOutlined',
            children: [
                {
                    path: '/user-Mannage/userList',
                    key: '5-1',
                    title: '用户列表',
                    icon: 'UserOutlined',
                },
                {
                    path: '/user-Mannage/adminList',
                    key: '5-2',
                    title: '管理员列表',
                    icon: 'UserOutlined',
                }
            ]
        },
    ])

    return { menuData }
}