/*
 * @Descripttion:商品服务
 * @Author: congz
 * @Date: 2020-09-26 15:36:53
 * @LastEditors: congz
 * @LastEditTime: 2020-10-14 21:55:54
 */
import axios from 'axios';
//商品服务
// 创建商品
const createProduct = form => axios.post('/api/v1/products', form).then(res => res.data);

// 读取商品列表
const listProducts = (category_id, start, limit) =>
    axios.get('/api/v1/products', { params: { category_id, start, limit } }).then(res => res.data);

// 更新商品
const updateProduct = form => axios.put('/api/v1/products', form).then(res => res.data);
// 删除商品
const deleteProduct = product_id => axios.delete('/api/v1/products', { data: { product_id: product_id } }).then(res => res.data);

//商品图片服务
// 创建商品图片
const createProductImg = form => axios.post('/api/v1/product-imgs', form).then(res => res.data);

// 读取商品图片列表
const listProductImgs = (img_type, product_id, start, limit) =>
    axios.get('/api/v1/product-imgs', { params: { img_type, product_id, start, limit } }).then(res => res.data);

// 更新商品图片
const updateProductImg = form => axios.put('/api/v1/product-imgs', form).then(res => res.data);
// 删除商品图片
const deleteProductImg = (img_type, img_id) =>
    axios.delete('/api/v1/product-imgs', { data: { img_type: img_type, img_id: img_id } }).then(res => res.data);

export { createProduct, listProducts, updateProduct, deleteProduct, createProductImg, listProductImgs, updateProductImg, deleteProductImg };
