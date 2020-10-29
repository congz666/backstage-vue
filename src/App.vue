<!--
 * @Descripttion: 
 * @Author: congz
 * @Date: 2020-09-24 17:15:19
 * @LastEditors: congz
 * @LastEditTime: 2020-10-29 15:18:47
-->
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import * as userAPI from '@/api/user/';
export default {
    beforeCreate() {
        // 获取浏览器localStorage，判断用户是否已经登录
        userAPI.checkToken().then(res => {
            // 如果已经登录，设置vuex登录状态
            if (res.code == 200) {
                this.setAdmin(JSON.parse(localStorage.getItem('admin')));
            } else {
                localStorage.removeItem('admin');
                localStorage.removeItem('token');
            }
        });
    },
    methods: {
        ...mapActions(['setAdmin'])
    }
};
</script>
<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css'; /*深色主题*/
/*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
