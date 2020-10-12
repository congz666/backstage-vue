/*
 * @Descripttion:分类服务
 * @Author: congz
 * @Date: 2020-09-26 19:04:22
 * @LastEditors: congz
 * @LastEditTime: 2020-10-12 22:44:44
 */
import axios from 'axios';

// 创建分类
const createCategory = form => axios.post('/api/v1/categories', form).then(res => res.data);
// 读取分类列表
const listCategories = (start, limit) => axios.get('/api/v1/categories', { params: { start, limit } }).then(res => res.data);
// 修改分类
const updateCategory = form => axios.put('/api/v1/categories', form).then(res => res.data);
// 删除分类
const deleteCategory = id => axios.delete('/api/v1/categories', { data: { id: id } }).then(res => res.data);
export { createCategory, listCategories, updateCategory, deleteCategory };
