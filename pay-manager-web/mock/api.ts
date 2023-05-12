import mockJS from 'mockjs';

const account = {
  id: '@id',
  username: '@first',
  name: '@cname',
  scope: '全部',
  key: '@guid',
  ip: '@ip',
  status: '启用',
  created_time: '@datetime',
  last_login_time: '@datetime',
};

const menus = [
  {
    "id": 10,
    "label": "总览",
    "path": "/overview"
  },
  {
    "id": 20,
    "label": "账号信息",
    "path": "/account"
  },
  {
    "id": 30,
    "label": "系统管理",
    "path": "/system",
    "children": [
      {
        "id": 3001,
        "label": "账号管理",
        "path": "/system/account",
        "children": [
          {
            "id": 300100,
            "label": "新增",
            "path": "system-account-add"
          },
          {
            "id": 300101,
            "label": "修改",
            "path": "system-account-edit"
          },
          {
            "id": 300102,
            "label": "权限",
            "path": "system-account-auth"
          },
          {
            "id": 300103,
            "label": "启用/禁用",
            "path": "system-account-status"
          },
          {
            "id": 300104,
            "label": "重置身份验证码",
            "path": "system-account-google"
          }
        ]
      },
      {
        "id": 3002,
        "label": "角色管理",
        "path": "/system/role",
        "children": [
          {
            "id": 300200,
            "label": "新增",
            "path": "system-role-add"
          },
          {
            "id": 300201,
            "label": "修改",
            "path": "system-role-edit"
          },
          {
            "id": 300202,
            "label": "权限设置",
            "path": "system-role-auth"
          }
        ]
      },
      {
        "id": 3003,
        "label": "IP管理",
        "path": "/system/ip",
        "children": [
          {
            "id": 300300,
            "label": "新增",
            "path": "system-ip-add"
          },
          {
            "id": 300301,
            "label": "删除",
            "path": "system-ip-del"
          }
        ]
      },
      {
        "id": 3004,
        "label": "操作日志",
        "path": "/system/operate-log"
      },
      {
        "id": 3005,
        "label": "登录日志",
        "path": "/system/login-log"
      }
    ]
  },
  {
    "id": 40,
    "label": "商户管理",
    "path": "/merchant",
    "children": [
      {
        "id": 4001,
        "label": "商户管理",
        "path": "/merchant/manage"
      },
      {
        "id": 4002,
        "label": "商户账变记录",
        "path": "/system/record"
      },
      {
        "id": 4003,
        "label": "代收订单",
        "path": "/merchant/collect-order"
      }
    ]
  }
]

export default {
  'GET /api/account/list': mockJS.mock({
    code: 200,
    'data|100': [account],
  }),
  'GET /api/account/detail': mockJS.mock({
    code: 200,
    data: account,
  }),
  'GET /api/getMenus': mockJS.mock({
    code: 200,
    data: menus,
  }),
  'GET /api/merchant/balance/chart': mockJS.mock({
    code: 200,
    'data|100': [
      {
        Date: '@date',
        scales: '@integer(0, 100)',
      },
    ],
  }),
  // 'POST /api/login': mockJS.mock({
  //   code: 200,
  //   data: { token: '1231231sgsd' },
  // }),
  // 'GET /api/system/user/getUserMerchantInfo': mockJS.mock({
  //   code: 200,
  //   data: { 
  //     userId: 1,
  //     userName: 'panda',
  //     merchantName: 'asdg',
  //     merchantId: 'sadgasdgasg',
  //     usdt: 'KKKKKsddggggddddd'
  //    },
  // }),
};
