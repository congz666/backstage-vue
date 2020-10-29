/*
 * @Descripttion:用户登录状态模块
 * @Author: congz
 * @Date: 2020-06-04 11:22:40
 * @LastEditors: congz
 * @LastEditTime: 2020-10-29 13:48:57
 */

export default {
    state: {
        admin: '' // 登录的用户
    },
    getters: {
        getAdmin(state) {
            return state.admin;
        }
    },
    mutations: {
        setAdmin(state, data) {
            state.admin = data;
        }
    },
    actions: {
        setAdmin({ commit }, data) {
            commit('setAdmin', data);
        }
    }
};
