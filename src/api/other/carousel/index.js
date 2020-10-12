/*
 * @Descripttion：轮播图服务
 * @Author: congz
 * @Date: 2020-09-26 19:04:22
 * @LastEditors: congz
 * @LastEditTime: 2020-10-12 21:52:13
 */
import axios from 'axios';

// 读取轮播图列表
const listCarousels = (start, limit) => axios.get('/api/v1/carousels', { params: { start, limit } }).then(res => res.data);
// 读取轮播图
const getCarousel = carousel_id => axios.get(`/api/v1/carousels/${carousel_id}`).then(res => res.data);
// 修改轮播图
const updateCarousel = form => axios.put('/api/v1/carousels', form).then(res => res.data);

export { listCarousels, getCarousel, updateCarousel };
