import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import Kind from '../views/kind/index.vue'
import Cart from '../views/cart/index.vue'
import My from '../views/my/index.vue'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/kind',
        name: 'kind',
        component: Kind
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    },
    {
        path: '/my',
        name: 'my',
        component: My
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
