<style lang="scss" scoped>
.content {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: #BAA1FF linear-gradient(to right, #BAA1FF, #7988FA) !important;
}

.main {
    width: 400px;
    height: 400px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 5px #BAA1FF;

    .title {
        font-size: 25px;
        text-align: center;
        margin: 30px 0;
    }

    .block {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 30px;

        .iconfont {
            margin-right: 15px;
            font-size: 25px;
            color: #409eff;
        }
    }

    .inp-w {
        width: 250px;
    }

    .login_btn {
        overflow: hidden;
    }

    .btns {
        width: 250px;
        display: block;
        margin-left: 70px;
    }
}
</style>

<template>
<div class="content">
    <div class="main">
        <div class="title">VUE-ADMIN</div>
        <div class="block">
            <span style="font-size:23px;margin-right:16px;color:#1989FA" class="el-icon-user"></span>
            <el-input class="inp-w" v-model.trim="account" placeholder="请输入用户名"></el-input>
        </div>
        <div class="block">
            <span style="font-size:23px;margin-right:16px; color:#1989FA" class="el-icon-lock"></span>
            <el-input class="inp-w" type="password" v-model.trim="password" placeholder="请输入密码"></el-input>
        </div>
        <div class="login_btn">
            <el-button class="btns" type="primary" v-on:keyup.enter="login" @click="login">登录</el-button>
        </div>
    </div>
</div>
</template>

<script>
import { loginByUsername } from "@/api/request"
export default {
    data() {
        return {
            account: '',
            password: ''
        };
    },
    mounted() {
        this.$notify({
            title: '提示',
            message: '账号密码随意',
            duration: 0
        });
    },
    methods: {
        login() {

            /**
             * 接口请求
             * var obj = {name:'test',password:'test'}
             *  loginByUsername(obj).then(res=>{
             * console.log(res)
             *  })
             */

            if (!this.account) {
                this.$message({
                    message: '账号不能为空',
                    type: 'error'
                });
                return;
            }
            if (!this.password) {
                this.$message({
                    message: '密码不能为空',
                    type: 'error'
                });
                return;
            }
            this.$util.setStorage('session', 'isLogin', JSON.stringify('true'))
            this.$util.setStorage('session', 'side-default-active', JSON.stringify('0'))
            setTimeout(() => {
                this.$router.push({
                    name: 'home'
                })
            }, 200)
        }
    },
};
</script>
