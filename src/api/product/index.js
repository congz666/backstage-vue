/*
 * @Descripttion:商品服务
 * @Author: congz
 * @Date: 2020-09-26 15:36:53
 * @LastEditors: congz
 * @LastEditTime: 2020-09-26 19:35:19
 */
import axios from 'axios';

// 创建商品
const newProduct = () => axios.post('/api/v1/products', form, { params: { token } }).then(res => res.data);

// 读取商品列表
const listProducts = (category_id, start, limit) =>
    axios.get('/api/v1/products', { params: { category_id, start, limit } }).then(res => res.data);

export { newProduct, listProducts };
