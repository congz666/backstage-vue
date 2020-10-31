<!--
 * @Descripttion: 
 * @Author: congz
 * @Date: 2020-09-26 13:55:29
 * @LastEditors: congz
 * @LastEditTime: 2020-10-31 15:48:31
-->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-goods"></i> 商品
                </el-breadcrumb-item>
                <el-breadcrumb-item>新建商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="商品名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品简述">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="商品简介">
                        <el-input type="textarea" rows="5" v-model="form.info"></el-input>
                    </el-form-item>
                    <el-form-item label="分类">
                        <el-select v-model.number="form.category_id" placeholder="请选择">
                            <el-option
                                v-for="item in categoriesList"
                                :key="index"
                                :label="item.category_name"
                                :value="item.category_id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="图片地址">
                        <el-input v-model="form.img_path"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input v-model="form.price"></el-input>
                    </el-form-item>
                    <el-form-item label="折后价">
                        <el-input v-model="form.discount_price"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import * as productAPI from '@/api/product/';
import * as categoryAPI from '@/api/other/category/';
export default {
    name: 'ProductNew',
    data() {
        return {
            form: {
                name: '',
                title: '',
                info: '',
                category_id: 1,
                img_path: '',
                price: '',
                discount_price: ''
            },
            categoriesList: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData(val) {
            categoryAPI.listCategories().then(res => {
                if (res.code == 20001) {
                    //token过期，需要重新登录
                    this.loginExpired(res.msg);
                    return;
                }
                if (res.code == 404) {
                    this.notifyError('获取分类失败', res.msg);
                    return;
                }
                this.categoriesList = res.data.category;
            });
        },
        onSubmit() {
            productAPI.createProduct(this.form).then(res => {
                if (res.code == 20001) {
                    //token过期，需要重新登录
                    this.loginExpired(res.msg);
                    return;
                }
                if (res.code == 404) {
                    this.notifyError('创建商品失败', res.msg);
                    return;
                }
                this.notifySucceed('创建商品成功');
            });
        }
    }
};
</script>