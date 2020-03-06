<template>
    <el-main>
  <el-form 
        :model="registerForm" 
        :rules="rules" 
        ref="registerForm" 
        class="register-container" 
        label-position="left"
        label-width="20px" >
    <h3 class="login_title">注册</h3>

    <el-form-item prop="email">
      <el-input type="text" v-model="registerForm.email" auto-complete="off" placeholder="邮箱" style="width: 70%;margin-bottom: 40px"></el-input>
    </el-form-item>

    <el-form-item prop="username">
      <el-input type="text" v-model="registerForm.username" auto-complete="off" placeholder="昵称" style="width: 70%;margin-bottom: 40px"></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="密码" style="width: 70%;margin-bottom: 40px"></el-input>
    </el-form-item>

    <el-form-item prop="checkPassword">
      <el-input type="password" v-model="registerForm.checkPassword" auto-complete="off" placeholder="确认密码" style="width: 70%;margin-bottom: 40px"></el-input>
    </el-form-item>

    <el-form-item prop="code">
      <el-input type="text" placeholder="验证码" v-model="registerForm.code" style="width: 70%;margin-bottom: 40px">
        <el-button slot="append" icon="el-icon-s-promotion" @click="sendCode('registerForm')" :disabled="this.timer != null">{{msg}}</el-button>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('registerForm')" style="width: 70%">注册</el-button>
    </el-form-item>

  </el-form>
    </el-main>
</template>

<script>
  export default{
    name: "register",
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.checkPassword !== '') {
            this.$refs.registerForm.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        registerForm: {
          email: '',
          username: '',
          password: '',
          checkPassword: '',
          code: ''
        },
        rules: {
          email: [{required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入合法邮箱', trigger: 'blur'}],
          username: [{required: true, message: '请输入昵称', trigger: 'blur'},
            {min: 2, max: 16, message: '长度为2-16个字符', trigger: 'blur'}],
          password: [
            { validator: validatePass, trigger: 'blur' },
            {pattern: /[a-zA-Z0-9]{6,16}/, message:'密码为6-16位的字母或数字', trigger: 'blur'}
          ],
          checkPassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {pattern: /[0-9]{6}/, message: '请输入6位数字验证码', trigger: 'blur'}
          ]
        },
        msg: '发送验证码',
        timer: null,
        count: '',
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.replace('/home')
          } else {
            alert('请正确填写注册信息')
            return false
          }
        })
      },
      sendCode: function (formName) {
        this.$refs[formName].validateField('email',msg =>{
          if(msg === ""){
            this.count = 30
            this.timer = setInterval(() => {
              if (this.count > 0) {
                this.count--
                this.msg = this.count + 's后再次发送'
              } else {
                clearInterval(this.timer)
                this.timer = null
                this.msg = '发送验证码'
              }
            }, 1000)
          }else{
            alert('请正确填写邮箱')
          }
        })
      },
    }
  }
</script>

<style scoped>
  .register-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 640px;
    height: 640px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>
