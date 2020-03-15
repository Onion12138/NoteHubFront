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
      <h3 class="login_title">系统登录</h3>

      <el-form-item prop="email" style="margin-bottom: 80px">
        <el-input
          type="text"
          v-model="loginForm.email"
          auto-complete="off"
          placeholder="邮箱"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password" style="margin-bottom: 80px">
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>

      <el-form-item style="width: 100% ;margin-bottom: 80px">
        <el-button
          type="success"
          @click.native.prevent="submitClick('loginForm')"
          style="width: 100%"
          >登录</el-button
        >
      </el-form-item>

      <el-form-item>
        <router-link to="/register">没有账号？注册</router-link>
      </el-form-item>

      <el-form-item>
        <router-link to="/home">忘记密码？重置</router-link>
      </el-form-item>
    </el-form>
  </el-row>
</template>
<script>
import { postJsonRequest } from "@/utils/request";
import "@/utils/mock";

export default {
  name: "login",
  data() {
    return {
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
              localStorage.setItem("profileUrl", data.profileUrl);
              localStorage.setItem("token", data.token);
              localStorage.setItem("username", data.username);
              localStorage.setItem("mindmap", JSON.stringify(data.mindMapList));
            }
          );
          this.$router.replace("/home");
        } else {
          alert("请正确输入信息");
        }
      });
    }
  }
};
</script>
<style>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 500px;
  height: 800px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  background-size: contain;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_remember {
  margin: 0px 0px 35px 0px;
  text-align: left;
}
</style>
