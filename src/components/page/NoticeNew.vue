<!--
 * @Descripttion: 
 * @Author: congz
 * @Date: 2020-09-26 14:07:57
 * @LastEditors: congz
 * @LastEditTime: 2020-10-31 15:50:54
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
                <el-breadcrumb-item>新建公告</el-breadcrumb-item>
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
            <mavon-editor
                v-model="form.text"
                ref="md"
                @imgAdd="$imgAdd"
                @change="change"
                style="min-height: 600px"
            />
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import * as noticeAPI from '@/api/other/notice/';
export default {
    name: 'NoticeNew',
    data: function() {
        return {
            html: '',
            configs: {},
            form: {
                text: ''
            }
        };
    },
    components: {
        mavonEditor
    },
    methods: {
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
            noticeAPI.createNotice(this.form).then(res => {
                if (res.code == 20001) {
                    //token过期，需要重新登录
                    this.loginExpired(res.msg);
                    return;
                }
                if (res.code == 404) {
                    this.notifyError('创建公告失败', res.msg);
                    return;
                }
                this.notifySucceed('创建公告成功');
            });
        }
    }
};
</script>
<style scoped>
.editor-btn {
    margin-top: 20px;
}
</style>