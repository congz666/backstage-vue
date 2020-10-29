/*
 * @Descripttion:Vuex入口
 * @Author: congz
 * @Date: 2020-06-04 11:22:40
 * @LastEditors: congz
 * @LastEditTime: 2020-10-29 13:47:53
 */

import Vue from 'vue';
import Vuex from 'vuex';

import admin from './modules/admin';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        admin
    }
});
