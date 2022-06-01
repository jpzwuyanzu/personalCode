<template>
  <a-layout-header style="background: #001529; padding: 0 16px">
    <div class="header-left-part">
      <div class="admin-logo">
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          alt=""
        />
        <h1>Vue Ant Design</h1>
      </div>
    </div>
    <div class="header-right-part">
      <div class="message-warning">
        <a-badge count="5">
          <bell-outlined style="color: #fff;font-size: 17px;" />
        </a-badge>
      </div>
      <div class="user-info-container">
        <a-dropdown>
          <!-- <a class="ant-dropdown-link" @click.prevent>
            Hover me
            <DownOutlined />
          </a> -->
          <div class="user-info-dropdown">
            <img src="../assets/userIcon.png" alt="">
            <span>Serati Ma</span>
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="chooseUserInfoBtn('personalCenter')">
                <a href="javascript:;">
                  <UserOutlined/>
                  个人中心
                </a>
              </a-menu-item>
              <a-menu-item @click="chooseUserInfoBtn('personalSetting')">
                <a href="javascript:;">
                  <SettingOutlined/>
                  个人设置
                </a>
              </a-menu-item>
              <a-menu-item @click="chooseUserInfoBtn('login')">
                <a href="javascript:;">
                  <LogoutOutlined/>
                  退出登录
                </a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { BellOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons-vue";
import { removeCookieItem, setCookieItem } from './../utils/common'
const router = useRouter()
const store = useStore()
const chooseUserInfoBtn = (path: string) => {
  if(path === 'login') {
    removeCookieItem('token')
    removeCookieItem('role')
    removeCookieItem('username')
    setCookieItem("loginState", 'false');
    store.dispatch("changeLoginStateAction", {loginState: false});
    router.push({ name: "login" });
  } else {
    router.push({ name: path })
  }
}
</script>
<style lang="scss" scoped>
.ant-layout-header {
  height: 48px;
}
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 48px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
.header-left-part {
  width: 200px;
  text-align: center;
  .admin-logo {
    height: 48px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    float: left;

    img {
      width: 28px;
      height: 28px;
      object-fit: contain;
    }
    h1 {
      color: #fff;
      height: 48px;
      font-weight: 600;
      font-size: 18px;
      line-height: 48px;
      padding: 0;
      margin: 0;
      margin-left: 12px;
    }
  }
}
.header-right-part {
  margin-left: 200px;
  width: calc(100% - 200px);
  text-align: right;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  .message-warning {
    margin-right: 20px;
    cursor: pointer;
  }
  // .user-info-container {
  //   display: flex;
  //   align-items: center;
  //   height: 48px;
  //   padding: 0 12px;
  //   cursor: pointer;
  //   transition: all .3s;
  //   img {
  //     width: 24px;
  //     height: 24px;
  //     border-radius: 50%;
  //     object-fit: contain;
  //     margin-right: 10px;
  //   }
  // }
  .user-info-dropdown {
    display: flex;
    align-items: center;
    height: 48px;
    padding: 0 12px;
    cursor: pointer;
    transition: all .3s;
    // width: 150px;
    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      object-fit: contain;
      margin-right: 10px;
    }
  }
}
</style>