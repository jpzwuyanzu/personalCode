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
        <el-switch v-model="isCollapse">
        </el-switch>
    </div>
    <el-container>
        <el-header style="text-align: right; font-size: 12px">
            <el-dropdown @command="handleCommand">
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>王小虎</span>
        </el-header>
        <el-main>
            <router-view key="key" />
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: false,
            sideMenu: [],
            defaultMenus:'0'
        }
    },
    created() {
        this.defaultMenus = JSON.parse(sessionStorage.getItem('side-default-active')) ? JSON.parse(sessionStorage.getItem('side-default-active'))  : '0'
        fetch('/sideMenu.json').then(res => res.json()).then(result => {
            this.sideMenu = result.result;
        })
        
    },
    methods: {
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
            console.log(9090)
            //退出登录
            sessionStorage.clear();
            setTimeout(()=>{
                this.$router.push({name:'login'})
            },200)
        }
    },
};
</script>

<style lang="scss">
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
