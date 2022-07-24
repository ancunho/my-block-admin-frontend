<template>
    <div class="login-box">
        <h1>Login</h1>
        <el-row>
            <el-col :xs="24" :sm="24" :md="{span: 6, offset: 9}">
                <el-form ref="form" :model="form" label-width="80px">
                    <p class="login-box-text">用户名:</p>
                    <el-input style="margin-bottom: 20px;" placeholder="请输入用户名" v-model="form.username"></el-input>
                    <p class="login-box-text">密码:</p>
                    <el-input style="margin-bottom: 20px;"  placeholder="请输入密码" v-model="form.password" show-password></el-input>
                    <p class="login-box-text">验证码:</p>
                    <div style="display:flex; justify-content: flex-start;">
                        <el-input class="aaaa" style="margin-bottom: 20px; width: 60%" placeholder="请输入密码" v-model="form.captchaCode"></el-input>
                        <el-image
                            v-on:click="handleClickCaptchaImage"
                            style="width: 40%; height: 40px;"
                            :src="form.captchaImage"
                            fit="fill"></el-image>
                    </div>
                </el-form>
                <el-button style="width:100%; display: block; margin:0 auto; height:52px; " type="primary" @click="handleLogin"> 登 录 </el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            form: {
                username: '',
                password: '',
                captchaImage: '',
                captchaKey: '',
                captchaCode: '',
            }
        }
    },
    mounted() {
        let _this = this;
        _this.loadCaptchaImage();
    },
    methods: {
        handleLogin() {
            event.preventDefault();
            let _this = this;
            if (Tool.isEmpty(_this.form.username)) {
                _this.$message.error("用户名不能为空");
                return;
            }
            if (Tool.isEmpty(_this.form.password)) {
                _this.$message.error("密码不能为空");
                return;
            }
            if (Tool.isEmpty(_this.form.captchaCode)) {
                _this.$message.error("验证码不能为空");
                return;
            }

            var params = {};
            params.username = _this.form.username;
            params.password = _this.form.password;
            params.captchaCode = _this.form.captchaCode;
            _this.$request.post("/backend/user/login", params).then(response => {
                if (response.data.code === 0) {
                    _this.$message.success("登录成功")
                    _this.$router.push({
                        path: "welcome"
                    })
                } else {
                    alert(response.data.msg);
                    _this.form.username = '';
                    _this.form.password = '';
                    _this.loadCaptchaImage();
                }
            });

        },
        loadCaptchaImage() {
            let _this = this;
            _this.$request.get("/backend/captcha").then(response => {
                _this.form.captchaImage = response.data.data.base64Img;
                _this.form.captchaKey = response.data.data.captchaKey;
                _this.form.captchaCode = response.data.data.captchaCode;
            })
        },
        handleClickCaptchaImage() {
            let _this = this;
            _this.loadCaptchaImage();
        }
    }
}
</script>

<style scoped>
.login-box { margin: 30px auto; padding:0 30px;}
.login-box h1 { text-align: center; margin: 20px 0;}
.login-box .login-box-text {font-size:15px; color:#909399; font-weight: bold; line-height: 2;}
.aaaa input.el-input__inner {height:52px!important;display: inline-block!important;}
</style>