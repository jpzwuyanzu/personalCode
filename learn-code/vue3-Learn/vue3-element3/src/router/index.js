import { createRouter, createWebHistory } from "vue-router";
import { getItem } from '../utils/common'
import NProgress from 'nprogress'
import 'nprogress/nprogress'

const routes = [
  {
    path: "/",
    component: () => import("../layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("views/home.vue"),
        name: "Home",
        meta: {
          auth: true,
          title: "首页",
          icon: "el-icon-s-home",
          breadCrum: true,
          breadCrum_title: [
            {
              name: "系统首页",
              redirectPath: "/home",
            },
          ],
        },
      },
      {
        path: "sys-mannage/sysLog",
        name: "sysLog",
        meta: {
          auth: true,
          title: "系统日志",
          icon: "el-icon-s-home",
          breadCrum: true,
          breadCrum_title: [
            {
              name: "系统管理",
              redirectPath: "/sys-mannage/sysLog",
            },
            {
              name: "系统日志",
              redirectPath: "/sys-mannage/sysLog",
            },
          ],
        },
        component: () => import("views/sys-Mannage/sysLog.vue"),
      },
      {
        path: "sys-mannage/sysInfo",
        name: "syInfo",
        meta: {
          auth: true,
          title: "系统信息",
          icon: "el-icon-s-home",
          breadCrum: true,
          breadCrum_title: [
            {
              name: "系统管理",
              redirectPath: "/sys-mannage/sysInfo",
            },
            {
              name: "系统信息",
              redirectPath: "/sys-mannage/sysInfo",
            },
          ],
        },
        component: () => import("views/sys-Mannage/sysInfo.vue"),
      },
      {
        path: "user-mannage/userList",
        name: "userList",
        meta: {
          auth: true,
          title: "用户列表",
          icon: "el-icon-s-home",
          breadCrum: true,
          breadCrum_title: [
            {
              name: "用户管理",
              redirectPath: "/user-mannage/userList",
            },
            {
              name: "用户列表",
              redirectPath: "/user-mannage/userList",
            },
          ],
        },
        component: () => import("views/user-Mannage/userList.vue"),
      },
      {
        path: "user-mannage/adminList",
        name: "adminList",
        meta: {
          auth: true,
          title: "员工列表",
          icon: "el-icon-s-home",
          breadCrum: true,
          breadCrum_title: [
            {
              name: "用户管理",
              redirectPath: "/user-mannage/adminList",
            },
            {
              name: "管理员列表",
              redirectPath: "/user-mannage/adminList",
            },
          ],
        },
        component: () => import("views/user-Mannage/adminList.vue"),
      },
      {
        path: "/setting",
            name: "setting",
            meta: {
              auth: true,
              title: "个人设置",
              icon: "el-icon-s-home",
              breadCrum: true,
              breadCrum_title: [
                {
                  name: "个人设置",
                  redirectPath: "/setting",
                },
              ],
            },
            component: () => import("views/setting/personSetting.vue"),
      },
    ],
  },
  
  {
    path: "/login",
    name: "login",
    component: () => import("layout/Login.vue"),
  },
  {
      path: '/404',
      name: '404',
      component: () => import('views/404.vue')
  },
  {
      path: '/:pathMatch(.*)',
      redirect: '/404'
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});


/** 验证用户是否登录 **/
router.beforeEach((to,from,next) => {
    if(to.matched.some( m => m.meta && m.meta.auth)) {
        // console.log("先判断是否登录");
        if(to.name=='login'){
          NProgress.start()
            next();
        }else{
          if(getItem('token')){
            NProgress.start()
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
            NProgress.start()
            next('/login');
          }
 
        }
  　} else {
        console.log("请先登录");
        NProgress.start()
        next()
    }
})

router.afterEach(() => {
  NProgress.done()
})
export default router;
