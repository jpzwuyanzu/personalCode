export default [
  {
    path: '/login',
    component: '@/pages/login',
    headerRender: false,
    menuRender: false,
  },
  {
    path: '/',
    hidden: true,
    component: '@/pages/home',
  },
  {
    path: '/404',
    hidden: true,
    component: '@/pages/404',
  },
  {
    name: '总览',
    icon: 'dashboard',
    path: '/overview',
    component: '@/pages/overview',
  },
  {
    name: '系统管理',
    icon: 'SettingOutlined',
    path: '/system',
    routes: [
      {
        name: '账号管理',
        path: '/system/account',
        component: '@/pages/system/account',
      },
      {
        name: '角色管理',
        path: '/system/role',
        component: '@/pages/system/role',
      },
      {
        name: 'IP管理',
        path: '/system/ip',
        component: '@/pages/system/ip',
      },
      {
        name: '操作日志',
        path: '/system/operate-log',
        component: '@/pages/system/operate-log',
      },
      {
        name: '登录日志',
        path: '/system/login-log',
        component: '@/pages/system/login-log',
      },
    ],
  },
  {
    name: '商户管理',
    icon: 'ShopOutlined',
    path: '/merchant',
    routes: [
      {
        name: '商户管理',
        path: '/merchant/manage',
        component: '@/pages/merchant/manage',
      },
      {
        name: '商户账变记录',
        path: '/merchant/record',
        component: '@/pages/merchant/record',
      },
      {
        name: '代收订单',
        path: '/merchant/collect-order',
        component: '@/pages/merchant/collect-order',
      },
      {
        name: '代付订单',
        path: '/merchant/pay-order',
        component: '@/pages/merchant/pay-order',
      },
      {
        name: '商户余额数据',
        path: '/merchant/balance',
        component: '@/pages/merchant/balance',
      },
    ],
  },
  {
    name: '财务管理',
    icon: 'MoneyCollectOutlined',
    path: '/finance',
    routes: [
      {
        name: '商户提现审批',
        path: '/finance/withdraw-approval',
        component: '@/pages/finance/withdraw-approval',
      },
      {
        name: '商户USDT充值',
        path: '/finance/usdt-recharge',
        component: '@/pages/finance/usdt-recharge',
      },
      {
        name: '商户充值信息管理',
        path: '/finance/recharge-info-manage',
        component: '@/pages/finance/recharge-info-manage',
      },
      {
        name: '商户提现信息管理',
        path: '/finance/withdraw-info-manage',
        component: '@/pages/finance/withdraw-info-manage',
      },
    ],
  },
  {
    name: '通道管理',
    icon: 'NodeIndexOutlined',
    path: '/channel',
    routes: [
      {
        name: '代收通道管理',
        path: '/channel/collect-manage',
        component: '@/pages/channel/collect-manage',
      },
      {
        name: '代付通道管理',
        path: '/channel/pay-manage',
        component: '@/pages/channel/pay-manage',
      },
    ],
  },
];
