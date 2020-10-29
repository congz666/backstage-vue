/*
 * @Descripttion:
 * @Author: congz
 * @Date: 2020-09-24 17:15:19
 * @LastEditors: congz
 * @LastEditTime: 2020-10-29 15:20:26
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import axios from 'axios';

Vue.prototype.axios = axios;
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeResolve((to, from, next) => {
    document.title = `${to.meta.title} | CMall-Backstage`;
    const role = store.state.admin;
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role.admin.user_name === 'congz666' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

// 全局请求拦截器
axios.interceptors.request.use(
    config => {
        let token = window.localStorage.getItem('token');
        if (token) {
            //将token放到请求头发送给服务器,将tokenkey放在请求头中
            config.headers.Authorization = token;
            //也可以这种写法
            // config.headers['accessToken'] = Token;
        }
        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    }
);

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
