export default [
    {
      path: '/',
      title: '系统首页'
    },
    {
      path: '/pro',
      title: '产品管理'
    },
    {
      path: '/banner',
      title: '轮播图管理',
      children: [
        {
          path: '/banner/list',
          title: '轮播图列表管理'
        }
      ]
    }
  ]