import { createRouter, createWebHashHistory } from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Nprogress.configure({ showSpinner: false })

/**
 * 路由懒加载
 */

const Home = () => import('@/views/Home/index.vue');
const Fb = () => import('@/views/Home/FB/index.vue');
const IM = () => import('@/views/Home/IM/index.vue');
const CGame = () => import('@/views/Home/C-GAME/index.vue');
const GGame = () => import('@/views/Home/G-GAME/index.vue');
const SGame = () => import('@/views/Home/S-GAME/index.vue');
const Group = () => import('@/views/Home/Group/index.vue');

const SportsLive = () => import('@/views/SportsLive/index.vue');
const Activity = () => import('@/views/Activity/index.vue');
const SportsBetrecord = () => import('@/views/SportsBetrecord/index.vue');
const Personal = () => import('@/views/Personal/index.vue');

const NotFound = () => import('@/views/NotFound/index.vue');


const routes: any = [
    {
        path: '/',
        name: 'home',
        component: Home,
        redirect: '/home/fb',
        children: [
            {
                path: 'home/fb',
                name: 'fb',
                component: Fb,
                meta: {
                    needLogin: false
                }
            },
            {
                path: 'home/im',
                name: 'im',
                component: IM,
                meta: {
                    needLogin: false
                }
            },
            {
                path: 'home/c-game',
                name: 'c-game',
                component: CGame,
                meta: {
                    needLogin: false
                }
            },
            {
                path: 'home/g-game',
                name: 'g-game',
                component: GGame,
                meta: {
                    needLogin: false
                }
            },
            {
                path: 'home/s-game',
                name: 's-game',
                component: SGame,
                meta: {
                    needLogin: false
                }
            },
            {
                path: 'home/group',
                name: 'group',
                component: Group,
                meta: {
                    needLogin: false
                }
            }
        ]
    },
    {
        path: '/sportslive',
        name: 'sportslive',
        component: SportsLive,
        meta: {
            needLogin: true
        }
    },
    {
        path: '/activity',
        name: 'activity',
        component: Activity,
        meta: {
            needLogin: false
        }
    },
    {
        path: '/sportsbetrecord',
        name: 'sportsbetrecord',
        component: SportsBetrecord,
        meta: {
            needLogin: true
        }
    },
    {
        path: '/personal',
        name: 'personal',
        component: Personal,
        meta: {
            needLogin: false
        }
    },
    {
        path: '/notFound',
        name: 'notFound',
        component: NotFound,
        meta: {
            title: 'notFound',
            keepalive: false,
            breadCrum: false
        }
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/notFound',
        meta: {
            title: 'notFound',
            keepalive: false,
            breadCrum: false
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    Nprogress.start()
    next()
})
router.afterEach(() => {
    Nprogress.done()
})
export default router