<template>
  <el-container>
    <el-main>
      <el-form
        :model="registerForm"
        :rules="rules"
        ref="registerForm"
        class="register-container"
        label-position="left"
        label-width="0px"
      >
        <h3 class="register-title">选择感兴趣的领域</h3>
        <el-form-item class="tag-group" prop="chooseTags">
          <el-checkbox-group v-model="registerForm.chooseTags">
            <el-checkbox-button v-for="tag in tags" :label="tag.name" :key="tag._id">{{ tag.name }}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            type="text"
            v-model="registerForm.email"
            auto-complete="off"
            placeholder="邮箱"
            style="width: 70%;margin-bottom: 1rem
"
          ></el-input>
        </el-form-item>

        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="registerForm.username"
            auto-complete="off"
            placeholder="昵称"
            style="width: 70%;margin-bottom: 1rem

"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
            auto-complete="off"
            placeholder="密码"
            style="width: 70%;margin-bottom: 1rem

"
          ></el-input>
        </el-form-item>

        <el-form-item prop="checkPassword">
          <el-input
            type="password"
            v-model="registerForm.checkPassword"
            auto-complete="off"
            placeholder="确认密码"
            style="width: 70%;margin-bottom: 1rem

"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input
            type="text"
            placeholder="验证码"
            v-model="registerForm.code"
            style="width: 70%;margin-bottom: 1rem"
          >
            <el-button
              slot="append"
              icon="el-icon-s-promotion"
              @click="sendCode('registerForm')"
              :disabled="this.timer != null"
            >{{ msg }}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item class="to_login">
          <router-link to="/auth/login">已有账号？登陆</router-link>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')" style="width: 70%">注册</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import { postParamRequest, postJsonRequest, getRequest } from "@/utils/request";

export default {
  name: "register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPassword !== "") {
          this.$refs.registerForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        email: "",
        username: "",
        password: "",
        checkPassword: "",
        code: "",
        chooseTags: []
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入合法邮箱", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 16, message: "长度为2-16个字符", trigger: "blur" }
        ],
        password: [
          { validator: validatePass, trigger: "blur" },
          {
            pattern: /[a-zA-Z0-9]{6,16}/,
            message: "密码为6-16位的字母或数字",
            trigger: "blur"
          }
        ],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            pattern: /[0-9]{6}/,
            message: "请输入6位数字验证码",
            trigger: "blur"
          }
        ],
        chooseTags: [
          { required: true, message: "请选择至少一个Tag", trigger: "blur" }
        ]
      },
      fileList: [],
      msg: "发送验证码",
      timer: null,
      count: "",
      tags: [
        {
          _id: 0,
          name: "人工智能"
        },
        {
          _id: 1,
          name: "前端开发"
        },
        {
          _id: 2,
          name: "后端开发"
        },
        {
          _id: 3,
          name: "移动开发"
        },
        {
          _id: 4,
          name: "测试运维"
        },
        {
          _id: 5,
          name: "大数据"
        },
        {
          _id: 6,
          name: "数学"
        },
        {
          _id: 7,
          name: "学科基础"
        },
        {
          _id: 8,
          name: "编程语言"
        },
        {
          _id: 9,
          name: "其他"
        }
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.registerForm.chooseTags = this.registerForm.chooseTags.join()
          postJsonRequest("/user/register", this.registerForm).then(
            response => {
              if (response.data.code === 200) {
                alert("注册成功");
                this.$router.replace("/login");
              } else {
                alert(response.data.message);
              }
            }
          );
        } else {
          alert("请正确填写注册信息");
          return false;
        }
      });
    },
    sendCode(formName) {
      this.$refs[formName].validateField("email", msg => {
        if (msg === "") {
          this.count = 30;
          this.timer = setInterval(() => {
            if (this.count > 0) {
              this.count--;
              this.msg = this.count + "s后再次发送";
            } else {
              clearInterval(this.timer);
              this.timer = null;
              this.msg = "发送验证码";
            }
          }, 1000);
          getRequest("/user/sendCode", {
            email: this.registerForm.email
          }).then(response => {
            if (response.data.code === 200) {
              alert("发送成功");
            } else {
              alert("发送失败");
            }
          });
        } else {
          alert("请正确填写邮箱");
        }
      });
    }
  }
};
</script>

<style scoped>
.register-title {
  font-size: 1.5rem;
}
.register-container {
  margin: 0 auto;
  width: 640px;
  height: 640px;
  padding: 35px 35px 15px 35px;
  background: #fff;
}
.to_login {
  margin-top: -2rem;
  margin-left: 21.5rem;
}
.tag-group {
  margin-right: 9rem;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
