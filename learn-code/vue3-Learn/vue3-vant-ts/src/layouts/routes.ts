import DefaultLayOut from './default.vue'
export default [
    {
      path: '/home',
      name: 'home',
      icon: 'home',
      title: '电影/影院',
      component: DefaultLayOut,
      redirect: '/home/index',
      children: [
          {
             path: '/home/index',
             component: () => import('./../views/Home/index.vue')
          }
      ]
    },
    {
        path: '/video',
        name: 'video',
        icon: 'video',
        title: '视频',
        component: DefaultLayOut,
        redirect: '/video/index',
        children: [
            {
               path: '/video/index',
               component: () => import('./../views/video/index.vue')
            }
        ]
      },
      {
        path: '/smallVideo',
        name: 'smallVideo',
        icon: 'smallVideo',
        title: '小视频',
        component: DefaultLayOut,
        redirect: '/smallVideo/index',
        children: [
            {
               path: '/smallVideo/index',
               component: () => import('./../views/smallVideo/index.vue')
            }
        ]
      },
      {
        path: '/show',
        name: 'show',
        icon: 'show',
        title: '演出',
        component: DefaultLayOut,
        redirect: '/show/index',
        children: [
            {
               path: '/show/index',
               component: () => import('./../views/show/index.vue')
            }
        ]
      },
      {
        path: '/my',
        name: 'my',
        icon: 'my',
        title: '我的',
        component: DefaultLayOut,
        redirect: '/my/index',
        children: [
            {
               path: '/my/index',
               component: () => import('./../views/my/index.vue')
            }
        ]
      }
]