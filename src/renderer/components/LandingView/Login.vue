<template>
  <el-row :gutter="0">
    <el-form
      :model="loginForm"
      :rules="rules"
      class="login-container"
      ref="loginForm"
      label-position="left"
      label-width="0px"
    >
      <div class="logo_container">
        <img id="logo" :src="logo" alt="notehub" />
      </div>

      <!-- <h3 class="login_title">NOTEHUB</h3> -->

      <el-form-item prop="email" style="margin-bottom: 40px">
        <el-input type="text" v-model="loginForm.email" auto-complete="off" placeholder="邮箱"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="space-between">
          <el-col :span="12" class="el-col-left">
            <router-link to="/auth/register">忘记密码？重置</router-link>
          </el-col>
          <el-col :span="12" class="el-col-right">
            <router-link to="/auth/register">没有账号？注册</router-link>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item style="width: 100% ;margin-bottom: 80px">
        <el-button
          type="success"
          @click.native.prevent="submitClick('loginForm')"
          style="width: 100%"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>
<script>
import { postJsonRequest } from "@/utils/request";
import Logo from "@/../../static/logo.png";
import "@/utils/mock";

export default {
  name: "login",
  data() {
    return {
      logo: Logo,
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确邮箱", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "请输入有效的密码", trigger: "blur" }
        ]
      },
      loginForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    submitClick: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          postJsonRequest("/noteApi/user/login", this.loginForm).then(
            response => {
              let data = response.data.data;
              alert("欢迎您:" + data.username);
              (async () => {
                localStorage.setItem("profileUrl", data.profileUrl);
                localStorage.setItem("username", data.username);
                localStorage.setItem("email", data.email);
                localStorage.setItem(
                  "mindmap",
                  JSON.stringify(data.mindMapList)
                );
                await localStorage.setItem("token", data.token);
                this.$router.push({ path: "/home" });
              })();
            }
          );
        } else {
          alert("请正确输入信息");
        }
      });
    }
  }
};
</script>
<style scoped>
#logo {
  width: 18rem;
  height: 15rem;
  margin: 0px auto 40px auto;
}

.login-container {
  text-align: center;
  width: 25rem;
  height: 31.25rem;
  margin: 0 auto;
  padding: 35px 35px 15px 35px;
  background: #fff;
}
/* .login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  font-size: 3rem;
  color: #505458;
} */
.login_remember {
  margin: 0px 0px 35px 0px;
  text-align: left;
}
.el-col-right {
  text-align: right;
}
.el-col-left {
  text-align: left;
}
</style>
