<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-main>
      <el-input
        placeholder="请输入内容"
        v-model="keyword"
        class="input-with-select"
        @keyup.enter.native="search"
      >
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-divider></el-divider>
      <div v-for="item in content" :key="item.id">
        <el-link type="primary" @click.stop.prevent="linkToNote(item.id)">{{item.description}}</el-link>
        <div>{{item.summary | summaryFilter}}</div>

        <el-row type="flex" justify="space-between" style="color:rgb(165,165,165);fontSize:0.8rem">
          <el-col style="textAlign:left">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">发布于 {{ item.createTime }}</span>
          </el-col>
          <el-col style="textAlign:right">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">更新于 {{ item.updateTime }}</span>
          </el-col>
        </el-row>

        <!-- <el-row type="flex">
          <el-col :span="3" v-for="(tag,index) in keywordsFilter(item.keywords)" :key="index">
            <el-tag :type="tagType[index]">{{tag}}</el-tag>
          </el-col>
        </el-row>-->

        <el-divider></el-divider>
      </div>
      <el-pagination
        @current-change="search"
        :current-page.sync="currentPage"
        :page-size="10"
        :page-count="total"
        layout="prev, pager, next, jumper"
      ></el-pagination>
    </el-main>
  </el-container>
</template>
<script>
import { getRequest } from "@/utils/request";
import { timestampFormat } from "@/utils/timeUtils";

export default {
  name: "search",
  data() {
    return {
      tagType: ["primary", "success", "warning"],
      keyword: "",
      content: [],
      currentPage: 1,
      total: 1
    };
  },
  mounted() {
    this.search();
  },
  filters: {
    timeFilter(time) {
      return timestampFormat(time);
    },
    summaryFilter(summary) {
      return summary.slice(0, 200);
    }
  },
  methods: {
    // keywordsFilter: function(keywords) {
    //   return keywords.split(",").slice(0, 3);
    // },
    linkToNote(noteId) {
      this.$router.push("/note/" + noteId);
    },
    search() {
      getRequest("/search", {
        keyword: this.keyword,
        page: this.currentPage
      }).then(response => {
        this.content = response.data.data.content;
        this.total = response.data.data.totalPages;
      });
    },
    handleCurrentChange(val) {
      search();
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