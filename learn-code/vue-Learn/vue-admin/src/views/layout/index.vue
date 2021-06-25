<template>
<el-container class="mainContainer">
    <div>
        <el-menu @select="handleSelected" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"  :default-active="defaultMenus" :unique-opened="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <div :class="{adminHeader:true, another: isCollapse}">
                <img src="../../../logo.png" alt="">
                <span v-if="!isCollapse">VUE-ADMIN</span>
            </div>
            <div v-for="(item,index) in sideMenu" :key="index">
                <div v-if="item.children">
                    <el-submenu :index="index+''">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span v-if="!isCollapse" slot="title">{{item.meta.title}}</span>
                        </template>
                        <el-menu-item-group v-for="(item1,index1) in item.children" :key="index1">
                            <router-link tag="li" :to="{name:item1.name}">
                                <el-menu-item :index="index+'-'+index1">{{item1.meta.title}}</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                </div>
                <div v-else>
                    <router-link tag="li" :to="{name: item.name}">
                        <el-menu-item :index="index+''"><i class="el-icon-location"></i><span v-if="!isCollapse">{{item.meta.title}}</span></el-menu-item>
                    </router-link>
                </div>
            </div>
        </el-menu>
    </div>
    <el-container>
        <el-header style="text-align: right; font-size: 12px;position:relative;">
            <div style="position:absolute;left:10px;top:15px;cursor:pointer;" @click="toggleColla">
                <i style="font-size:30px;display:block;" :class="[isCollapse ?  'el-icon-s-unfold':'el-icon-s-fold']"></i>
            </div>
            <el-dropdown style="height:60px"  :hide-on-click="false" placement="bottom-start" @command="handleCommand">
                <span class="el-dropdown-link">
                    <el-avatar style="margin-top:10px;cursor: pointer;z-index:100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-main style="background:#f0f2f5;">
            <transition name="slide-fade">
              <router-view key="key" />
            </transition>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            isCollapse: false,
            sideMenu: [],
            defaultMenus:'0'
        }
    },
    computed:mapState({
        count: state => state.count
    }),
    created() {
        this.defaultMenus = this.$util.getStorage('session','side-default-active') ? JSON.parse(this.$util.getStorage('session','side-default-active'))  : '0'
        fetch('/sideMenu.json').then(res => res.json()).then(result => {
            console.log(result.result)
            this.sideMenu = result.result.filter((item) => {
                if(item.meta.auth) {
                    return item.meta.auth === JSON.parse(this.$util.getStorage('session', 'role'))*1
                } else {
                    return item
                }
            })
        })
        
    },
    methods: {
        toggleColla() {
            this.isCollapse = !this.isCollapse
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleSelected(key, keyPath){
            console.log(key, keyPath)
            if(keyPath.length === 2) {
                sessionStorage.setItem('side-default-active', JSON.stringify(keyPath[1]))
            } else {
                sessionStorage.setItem('side-default-active', JSON.stringify(keyPath[0]))
            } 
        },
        handleCommand(commond){
            //退出登录
            sessionStorage.clear();
            setTimeout(()=>{
                this.$router.push({name:'login'})
            },200)
        }
    },
};
</script>

<style lang="scss" scoped>
.hideWith {
    width: auto !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.mainContainer {
    height: 100%;
}

.mainContainer>div {
    background: #545c64;
}

.adminHeader {
    padding-left: 30px;
    padding-right: 30px;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background: #545c64;

    img {
        width: 32px;
        height: 32px;
    }

    span {
        font-size: 16px;
        font-weight: 400;
        color: white;
        white-space: nowrap;
    }
}

.another {
    padding: 0;
}

.el-menu {
    border-right: 0px !important;
    height: calc(100% - 60px);
    background: rgb(84, 92, 100) !important;
}

.el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}

</style>
