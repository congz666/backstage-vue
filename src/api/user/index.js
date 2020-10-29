/*
 * @Descripttion:用户服务
 * @Author: congz
 * @Date: 2020-09-26 15:36:53
 * @LastEditors: congz
 * @LastEditTime: 2020-10-29 14:22:56
 */
import axios from 'axios';

// 读取用户列表
const listUsers = (start, limit) => axios.get('/api/v1/users', { params: { start, limit } }).then(res => res.data);

//检验token
const checkToken = () => axios.get('/api/v1/ping').then(res => res.data);

// 管理员登录
const adminLogin = form => axios.post('/api/v1/admins', form).then(res => res.data);

export { listUsers, adminLogin, checkToken };
