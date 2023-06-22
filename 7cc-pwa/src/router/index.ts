import { createRouter, createWebHistory } from 'vue-router'

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
                component: Fb
            },
            {
                path: 'home/im',
                name: 'im',
                component: IM
            },
            {
                path: 'home/c-game',
                name: 'c-game',
                component: CGame
            },
            {
                path: 'home/g-game',
                name: 'g-game',
                component: GGame
            },
            {
                path: 'home/s-game',
                name: 's-game',
                component: SGame
            },
            {
                path: 'home/group',
                name: 'group',
                component: Group
            }
        ]
    },
    {
        path: '/sportslive',
        name: 'sportslive',
        component: SportsLive
    },
    {
        path: '/activity',
        name: 'activity',
        component: Activity
    },
    {
        path: '/sportsbetrecord',
        name: 'sportsbetrecord',
        component: SportsBetrecord
    },
    {
        path: '/personal',
        name: 'personal',
        component: Personal
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
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    next()
})
router.afterEach(() => {
})
export default router