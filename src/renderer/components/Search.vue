<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-main>
      <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </el-main>
  </el-container>
</template>
<script>
import { getRequest } from "@/utils/request";
export default {
  name: "search",
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    search() {
      getRequest("/searchApi/search", { keyword: this.keyword }).then(
        response => {
          console.log(response.data.data);
        }
      );
    }
  }
};
</script>
<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>