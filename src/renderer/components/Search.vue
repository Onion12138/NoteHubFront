<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-main>
      <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-divider></el-divider>
      <div v-for="item in content" :key="item.id">
        <el-link type="primary" @click.stop.prevent="linkToNote(item.id)">{{item.description}}</el-link>
        <div>{{item.summary}}</div>
        <el-row type="flex">
          <el-col :span="3" v-for="(tag,index) in keywordsFilter(item.keywords)" :key="index">
            <el-tag :type="tagType[index]">{{tag}}</el-tag>
          </el-col>
        </el-row>

        <el-divider></el-divider>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { getRequest } from "@/utils/request";
export default {
  name: "search",
  data() {
    return {
      tagType: ["primary", "success", "warning"],
      keyword: "",
      content: []
    };
  },
  methods: {
    keywordsFilter: function(keywords) {
      return keywords.split(",").slice(0, 3);
    },
    linkToNote(noteId) {
      this.$router.push("/note/" + noteId);
    },
    search() {
      getRequest("/searchApi/search", { keyword: this.keyword }).then(
        response => {
          const data = response.data.data;
          this.content = data.content;
        }
      );
    }
  }
};
</script>
<style scoped>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-link {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.el-row {
  margin-top: 1rem;
  margin-bottom: -0.5rem;
}
</style>