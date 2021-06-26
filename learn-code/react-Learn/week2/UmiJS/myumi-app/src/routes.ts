import { HomeOutlined, BorderOuterOutlined } from '@ant-design/icons';
export default [
  {
    path: '/',
    icon: HomeOutlined,
    name: '系统首页',
  },
  {
    path: '/hospital',
    icon: BorderOuterOutlined,
    name: '医院管理',
    children: [
      {
        path: '/hospital/list',
        name: '医院列表'
      }
    ]
  },
  {
    path: '/doctor',
    icon: BorderOuterOutlined,
    name: '医生管理',
    children: [
      {
        path: '/doctor/list',
        name: '医生列表'
      }
    ]
  },
  {
    path: '/patient',
    icon: BorderOuterOutlined,
    name: '病人管理',
    children: [
      {
        path: '/patient/list',
        name: '病人列表'
      }
    ]
  },
  {
    path: '/cure',
    icon: BorderOuterOutlined,
    name: '治愈人员管理',
    children: [
      {
        path: '/cure/list',
        name: '治愈列表'
      }
    ]
  },
  {
    path: '/died',
    icon: BorderOuterOutlined,
    name: '死亡人员管理',
    children: [
      {
        path: '/died/list',
        name: '死亡列表'
      }
    ]
  }
  // {
  //   path: '/banner',
  //   icon: BorderOuterOutlined,
  //   name: '轮播图管理',
  //   children: [
  //     {
  //       path: '/banner/list',
  //       name: '轮播图列表',
  //     },
  //     {
  //       path: '/banner/add',
  //       name: '添加轮播图',
  //     },
  //   ],
  // },
  // {
  //   path: '/pro',
  //   icon: BorderOuterOutlined,
  //   name: '产品管理',
  //   children: [
  //     {
  //       path: '/pro/list',
  //       name: '产品列表',
  //     },
  //   ],
  // },
  // {
  //   path: '/user',
  //   icon: BorderOuterOutlined,
  //   name: '用户管理',
  //   children: [
  //     {
  //       path: '/user/user',
  //       name: '轮播图列表',
  //     },
  //     {
  //       path: '/user/admin',
  //       name: '添加轮播图',
  //     },
  //   ],
  // }
];
