<template>
  <div class="logoContainer">
    <img src="../../../static/logo.png" />
    <!-- <el-dialog
      title="请您先登录"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :visible.sync="loginDialog"
      :center="true">
      <login></login>
    </el-dialog>-->
  </div>
</template>
<style scoped>
.logoContainer {
  margin: 0 auto;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  name: "home",
  mounted() {
    // this.axios.post(noteApi + '/user/login').then((response)=>{
    //   console.log(response)
    // })
  },
  data() {
    return {};
  }
};
</script>