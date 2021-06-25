import { reactive } from 'vue'
import { getItem } from './../../utils/common'

export function getSideMenu () {
    //1 代表超级管理员， 2代表普通管理员
    const userRole = getItem('role')
    const state = {
        sideMenus: reactive([])
    }

    if(userRole === '1') {
        state.sideMenus = reactive([
            {
              path: "/home",
              key: "1",
              title: "系统首页",
              icon: "el-icon-location",
            },
            {
              path: "/sys-mannage",
              redirect: "/sys-mannage/sysLog",
              key: "2",
              title: "系统管理",
              icon: "el-icon-s-management",
              children: [
                {
                  path: "/sys-mannage/sysLog",
                  key: "2-1",
                  title: "系统日志",
                  icon: "el-icon-location",
                },
                {
                  path: "/sys-mannage/sysInfo",
                  key: "2-2",
                  title: "系统信息",
                  icon: "el-icon-location",
                },
              ],
            },
            {
              path: "/user-mannage",
              redirect: "/user-mannage/userList",
              key: "3",
              title: "用户管理",
              icon: "el-icon-s-custom",
              children: [
                {
                  path: "/user-mannage/userList",
                  key: "3-1",
                  title: "用户列表",
                  icon: "el-icon-location"
                },
                {
                  path: "/user-mannage/adminList",
                  key: "3-2",
                  title: "员工列表",
                  icon: "el-icon-location"
                },
              ],
            },
          ])
    } 
    
    if(userRole === '2') {
        state.sideMenus = reactive([
            {
              path: "/home",
              key: "1",
              title: "系统首页",
              icon: "el-icon-location",
            },
            {
              path: "/sys-mannage",
              redirect: "/sys-mannage/sysLog",
              key: "2",
              title: "系统管理",
              icon: "el-icon-s-management",
              children: [
                {
                  path: "/sys-mannage/sysLog",
                  key: "2-1",
                  title: "系统日志",
                  icon: "el-icon-location",
                },
                {
                  path: "/sys-mannage/sysInfo",
                  key: "2-2",
                  title: "系统信息",
                  icon: "el-icon-location",
                },
              ],
            }
          ])
    }

    return { state }
}