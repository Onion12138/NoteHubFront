<template>
  <el-cascader placeholder="可搜索" :options="options" filterable @change="handleChoose" ref="opt">
    <template slot-scope="{ node, data }">
      <span>{{ data.label }}</span>
      <span v-if="!node.isLeaf">({{ data.children.length }})</span>
    </template>
  </el-cascader>
</template>
<script>
import { getRequest } from "@/utils/request";
export default {
  methods: {
    handleChoose() {
      console.log(this.$refs.opt);
      console.log(this.$refs.opt.getCheckedNodes());
      const noteId = this.$refs.opt.getCheckedNodes()[0].data.value;
      this.$router.push({
        path: `/note/${noteId}`
      });
    }
  },
  data() {
    return {
      options: []
    };
  },
  mounted() {
    getRequest("/user/getCollection").then(response => {
      this.options = [];
      this.options.push(response.data.data);
    });
  }
};
</script>
<style>
</style>