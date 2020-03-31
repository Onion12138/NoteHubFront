<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>我的信息</span>
    </div>
    <div class="text item">{{'昵称 ' + username }}</div>
    <div class="text item">{{'邮箱 ' + email }}</div>
  </el-card>
</template>

<script>
export default {
  name: "mine",
  data() {
    return {
      username: localStorage.getItem("username") || "用户",
      email: localStorage.getItem("email") || "xxx@xxx.xx"
    };
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>