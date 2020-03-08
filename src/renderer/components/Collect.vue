<template>
  <el-cascader placeholder="可搜索" :options="options" filterable @change="handleChoose" ref="opt">
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
    handleChoose() {
      this.$router.push({path:"/note",query:{noteId:this.$refs.opt.getCheckedNodes()[0].data.value}});
    }
  },
  data() {
    return {
      options: []
    };
  },
  mounted() {
    getRequest("/noteApi/user/getCollection").then(response=>{
      this.options = []
      this.options.push(response.data.data)
    })
  }
};
</script>
<style>
</style>