<template>
  <div>
    <el-cascader placeholder="可搜索" :options="options" filterable @change="handleChoose" ref="opt">
      <template slot-scope="{ node, data }">
        <span>{{ data.label }}</span>
        <span v-if="!node.isLeaf">({{ data.children.length }})</span>
      </template>
    </el-cascader>
    <minimap v-if="options[0]" :mindmap="mindmapString"></minimap>
  </div>
</template>
<script>
import { getRequest } from "@/utils/request";
import minimap from "@/components/MindMap";

export default {
  components: {
    minimap
  },
  computed: {
    mindmapString: function() {
      console.log(this.options[0]);
      return JSON.stringify(this.options[0]);
    }
  },
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
  created() {
    getRequest("/user/getCollection").then(response => {
      console.log("fff");
      this.options = [response.data.data];
    });
  }
};
</script>
<style scoped>
.el-cascader {
  width: 100%;
}
</style>