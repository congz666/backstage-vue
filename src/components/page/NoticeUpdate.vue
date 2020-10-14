<!--
 * @Descripttion: 
 * @Author: congz
 * @Date: 2020-09-26 14:07:57
 * @LastEditors: congz
 * @LastEditTime: 2020-10-14 21:10:44
-->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 其它
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <i class="el-icon-lx-notification"></i> 公告
                </el-breadcrumb-item>
                <el-breadcrumb-item>修改公告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                mavonEditor：基于Vue的markdown编辑器。
                访问地址：
                <a
                    href="https://github.com/hinesboy/mavonEditor"
                    target="_blank"
                >mavonEditor</a>
            </div>
            <div class="handle-box">
                <el-input v-model="notice_id" placeholder="公告ID" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <mavon-editor
                v-model="form.text"
                ref="md"
                @imgAdd="$imgAdd"
                @change="change"
                style="min-height: 600px"
            />
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
            <el-button
                v-if="deleteButton==true"
                class="editor-btn"
                type="danger"
                @click="deleteNotice"
            >删除</el-button>
        </div>
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import * as noticeAPI from '@/api/other/notice/';
export default {
    name: 'NoticeUpdate',
    data: function() {
        return {
            notice_id: '',
            form: {
                notice_id: 0,
                text: '请输入公告ID'
            },
            deleteButton: false,
            html: '',
            configs: {}
        };
    },
    components: {
        mavonEditor
    },
    methods: {
        getData() {
            noticeAPI.getNotice(Number(this.notice_id)).then(res => {
                if (res.data != null) {
                    this.form.text = res.data.text;
                    this.deleteButton = true;
                } else {
                    this.form.text = '不存在该公告ID';
                    this.deleteButton = false;
                }
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.getData();
        },
        // 将图片上传到服务器，返回地址替换到md中
        $imgAdd(pos, $file) {
            var formdata = new FormData();
            formdata.append('file', $file);
            // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
            this.$axios({
                url: '/common/upload',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(url => {
                this.$refs.md.$img2Url(pos, url);
            });
        },
        change(value, render) {
            // render 为 markdown 解析后的结果
            this.html = render;
        },
        submit() {
            this.form.notice_id = Number(this.notice_id);
            noticeAPI.updateNotice(this.form).then(res => {});
            this.$message.success('修改成功！');
        },
        deleteNotice() {
            noticeAPI.deleteNotice(Number(this.notice_id)).then(res => {});
            this.$message.success('删除成功！');
        }
    }
};
</script>
<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-input {
    width: 100px;
    display: inline-block;
}
.mr10 {
    margin-right: 10px;
}
.editor-btn {
    margin-top: 20px;
}
</style>