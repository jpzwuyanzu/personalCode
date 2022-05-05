import { reactive } from 'vue'
import { getCookieItem } from './../../utils/common'
export function loadSideMenu() {
    const menuData = {
        sideMenus: reactive([])
    }
    //获取登录用户的角色
    const adminRole = getCookieItem('role')*1
    if(adminRole === 1) {
        menuData.sideMenus = reactive([
            // {
            //     path: '/home',
            //     key: '1',
            //     title: '系统首页',
            //     icon: 'HomeOutlined'
            // },
            {
                path: '/dash-Mannage',
                redirect: '/dash-Mannage/analyze',
                key: '2',
                title: 'Dashboard',
                icon: 'DashboardOutlined',
                children: [
                    {
                        path: '/dash-Mannage/analyze',
                        key: '2-1',
                        title: '分析页',
                        icon: 'DashboardOutlined',
                    },
                    {
                        path: '/dash-Mannage/monitor',
                        key: '2-2',
                        title: '监控页',
                        icon: 'DashboardOutlined',
                    },
                    {
                        path: '/dash-Mannage/workBench',
                        key: '2-3',
                        title: '工作台',
                        icon: 'DashboardOutlined',
                    }
                ]
            },
            {
                path: '/order-Mannage',
                redirect: '/order-Mannage/orderList',
                key: '3',
                title: '订单管理',
                icon: 'OrderedListOutlined',
                children: [
                    {
                        path: '/order-Mannage/orderList',
                        key: '3-1',
                        title: '订单列表',
                        icon: 'OrderedListOutlined',
                    }
                ]
            },
            {
                path: '/recharge-Mannage',
                redirect: '/recharge-Mannage/rechargeList',
                key: '4',
                title: '充值管理',
                icon: 'PayCircleOutlined',
                children: [
                    {
                        path: '/recharge-Mannage/rechargeList',
                        key: '4-1',
                        title: '充值列表',
                        icon: 'PayCircleOutlined',
                    },
                    {
                        path: '/recharge-Mannage/rechargeSetting',
                        key: '4-2',
                        title: '充值设置',
                        icon: 'PayCircleOutlined',
                    }
                ]
            },
            {
                path: '/sys-Mannage',
                redirect: '/sys-Mannage/sysSetting',
                key: '5',
                title: '系统管理',
                icon: 'AppstoreOutlined',
                children: [
                    {
                        path: '/sys-Mannage/sysSetting',
                        key: '5-1',
                        title: '系统设置',
                        icon: 'AppstoreOutlined',
                    }
                ]
            },
            {
                path: '/user-Mannage',
                redirect: '/user-Mannage/userList',
                key: '6',
                title: '用户管理',
                icon: 'TeamOutlined',
                children: [
                    {
                        path: '/user-Mannage/userList',
                        key: '6-1',
                        title: '用户列表',
                        icon: 'TeamOutlined',
                    },
                    {
                        path: '/user-Mannage/adminList',
                        key: '6-2',
                        title: '管理员列表',
                        icon: 'TeamOutlined',
                    }
                ]
            },
            {
                path: '/personal-Mannage',
                redirect: '/personal-Mannage/personalCenter',
                key: '7',
                title: '个人页',
                icon: 'UserOutlined',
                children: [
                    {
                        path: '/personal-Mannage/personalCenter',
                        key: '7-1',
                        title: '个人中心',
                        icon: 'UserOutlined',
                    },
                    {
                        path: '/personal-Mannage/personalSetting',
                        key: '7-2',
                        title: '个人设置',
                        icon: 'UserOutlined',
                    }
                ]
            },
        ])
    } else {
        menuData.sideMenus = reactive([
            // {
            //     path: '/home',
            //     key: '1',
            //     title: '系统首页',
            //     icon: 'HomeOutlined'
            // },
            {
                path: '/sys-Mannage',
                redirect: '/sys-Mannage/sysSetting',
                key: '5',
                title: '系统管理',
                icon: 'AppstoreOutlined',
                children: [
                    {
                        path: '/sys-Mannage/sysSetting',
                        key: '5-1',
                        title: '系统设置',
                        icon: 'AppstoreOutlined',
                    }
                ]
            },
            {
                path: '/personal-Mannage',
                redirect: '/personal-Mannage/personalCenter',
                key: '7',
                title: '个人页',
                icon: 'UserOutlined',
                children: [
                    {
                        path: '/personal-Mannage/personalCenter',
                        key: '7-1',
                        title: '个人中心',
                        icon: 'UserOutlined',
                    },
                    {
                        path: '/personal-Mannage/personalSetting',
                        key: '7-2',
                        title: '个人设置',
                        icon: 'UserOutlined',
                    }
                ]
            },
        ])
    }
    

    return { menuData }
}