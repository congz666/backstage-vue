<!--
 * @Descripttion: 
 * @Author: congz
 * @Date: 2020-09-24 17:15:19
 * @LastEditors: congz
 * @LastEditTime: 2020-10-31 14:54:25
-->
<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="form" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="user_name">
                    <el-input v-model="form.user_name" placeholder="测试账号:testtest">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="密码:12345678"
                        v-model="form.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div id="captcha">
                    <p id="wait">正在加载验证码...</p>
                </div>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script src="../../assets/gt.js"></script>
<script>
import { mapActions } from 'vuex';
import * as userAPI from '@/api/user/';
require('../../assets/gt.js');
var captcha;
export default {
    data: function() {
        return {
            form: {
                user_name: '',
                password: '',
                challenge: '',
                validate: '',
                seccode: ''
            },
            rules: {
                user_name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        ...mapActions(['setAdmin']),
        submitForm() {
            this.$refs.login.validate(valid => {
                if (!valid) {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return;
                }
                var result = captcha.getValidate();
                if (!result) {
                    this.$message.error('请验证');
                    return;
                }
                (this.form.challenge = result.geetest_challenge),
                    (this.form.validate = result.geetest_validate),
                    (this.form.seccode = result.geetest_seccode),
                    userAPI.adminLogin(this.form).then(res => {
                        if (res.code == 200) {
                            this.$message.success('登录成功');
                            let admin = JSON.stringify(res.data.admin);
                            localStorage.setItem('admin', admin);
                            localStorage.setItem('token', res.data.token);
                            this.$router.push('/');
                            // 登录信息存到vuex
                            this.setAdmin(res.data.admin);
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
            });
        },
        init_geetest() {
            userAPI.geetest().then(res => {
                window.initGeetest(
                    {
                        gt: res.gt,
                        challenge: res.challenge,
                        new_captcha: res.new_captcha,
                        offline: !res.success,
                        product: 'popup',
                        width: '100%'
                    },
                    function(captchaObj) {
                        captcha = captchaObj;
                        captchaObj.appendTo('#captcha');
                        captchaObj.onReady(function() {
                            document.getElementById('wait').style.display = 'none';
                        });
                    }
                );
            });
        }
    },
    mounted() {
        this.init_geetest();
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
    margin-top: 15px;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
