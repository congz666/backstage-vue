<!--
 * @Descripttion: 
 * @Author: congz
 * @Date: 2020-09-26 13:55:29
 * @LastEditors: congz
 * @LastEditTime: 2020-10-31 15:49:21
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
                    <el-form-item label="商品ID">
                        <el-input v-model.number="form.product_id"></el-input>
                    </el-form-item>
                    <el-form-item label="图片类型">
                        <el-select
                            v-model.number="form.img_type"
                            placeholder="图片类型"
                            class="handle-select mr10"
                        >
                            <el-option key="1" label="轮播图" :value="1"></el-option>
                            <el-option key="2" label="介绍图片" :value="2"></el-option>
                            <el-option key="3" label="参数图片" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="图片地址">
                        <el-input v-model="form.img_path"></el-input>
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
export default {
    name: 'ProductImgNew',
    data() {
        return {
            form: {
                img_type: '',
                product_id: '',
                img_path: ''
            }
        };
    },
    created() {},
    methods: {
        onSubmit() {
            productAPI.createProductImg(this.form).then(res => {
                if (res.code == 20001) {
                    //token过期，需要重新登录
                    this.loginExpired(res.msg);
                    return;
                }
                if (res.code == 404) {
                    this.notifyError('创建商品图片失败', res.msg);
                    return;
                }
                this.notifySucceed('创建商品图片成功');
            });
        }
    }
};
</script>