import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import configRoute from './../layouts/routes'
import notFound from './../views/notFound/index.vue'
import { getItem } from './../util/common'
const routes: Array<RouteRecordRaw> = [
   {
       path: '/',
       redirect: '/home/index'
   },
   {
       path: '/login',
       name: 'login',
       meta: {
           title: '登录',
           keepAlive: true
       },
       component: () => import('../views/Login/index.vue')
   }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

configRoute.forEach(item => {
    router.addRoute(item)
})

router.addRoute({
    path: '/:pathMatch(.*)*',
    component: notFound
  })

/** 验证用户是否登录 **/
router.beforeEach((to,from,next) => {
    if(to.matched.some( m => m.meta && m.meta.auth)) {
        // console.log("先判断是否登录");
        if(to.name=='login'){
            next();
        }else{
          if(getItem('token')){
            next();
            // next('/Login');
            //访问服务器缓存数据，判断当前token是否失效
            // Vue.http.get("http:xxxx/Login/UserIsLogin?token="+localStorage.getItem('token')+"&url="+to.name,{withCredentials: true}).then(response => response.json()).then(num => {
            //         // console.log('是否登录',num);
            //         if(num.code==1001){
            //             next();
            //         }else{
            //             alert('您的token已超时，请重新登录');
            //             next('/login');
            //         }
            // })
          }else{
            next('/login');
          }
 
        }
  　} else {
        console.log("请先登录");
        next()
    }
})



export default router