<!--
 * @Descripttion: 
 * @Author: congz
 * @Date: 2020-09-26 14:12:33
 * @LastEditors: congz
 * @LastEditTime: 2020-10-14 21:11:10
-->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 其它
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <i class="el-icon-lx-tag"></i> 分类
                </el-breadcrumb-item>
                <el-breadcrumb-item>新建分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="分类ID">
                        <el-input v-model.number="form.category_id"></el-input>
                    </el-form-item>
                    <el-form-item label="分类名">
                        <el-input v-model="form.category_name"></el-input>
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
import * as categoryAPI from '@/api/other/category/';
export default {
    name: 'CategoryNew',
    data() {
        return {
            form: {
                category_id: '',
                category_name: ''
            }
        };
    },
    methods: {
        onSubmit() {
            categoryAPI.createCategory(this.form).then(res => {});
            this.$message.success('提交成功！');
        }
    }
};
</script>