/*
 * @Descripttion:用户服务
 * @Author: congz
 * @Date: 2020-09-26 15:36:53
 * @LastEditors: congz
 * @LastEditTime: 2020-10-12 12:34:03
 */
import axios from 'axios';

// 读取用户列表
const listUsers = (start, limit) => axios.get('/api/v1/users', { params: { start, limit } }).then(res => res.data);

export { listUsers };
