<template>
  <el-cascader placeholder="可搜索" :options="options" filterable>
    <template slot-scope="{ node, data }">
      <span>{{ data.label }}</span>
      <span v-if="!node.isLeaf">({{ data.children.length }})</span>
    </template>
  </el-cascader>
</template>
<script>
import { getRequest } from "../../utils/request";
export default {
  methods: {
    handleChange() {
      console.log(this.$refs.opt.getCheckedNodes()[0].data.id);
      this.$router.push("/note");
    }
  },
  data() {
    return {
      options: []
    };
  },
  mounted() {
    this.options = JSON.parse(localStorage.getItem("mindmap"));
  }
};
</script>
<style>
</style>