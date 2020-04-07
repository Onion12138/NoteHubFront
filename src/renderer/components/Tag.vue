<template>
  <el-container>
    <el-tabs v-model="choice" tab-position="left" style="height: 100%" @tab-click="handleChoose">
      <el-tab-pane :key="item.id" v-for="item in tags" :label="item.value" :name="item.value">
        <el-tabs
          v-model="subChoice"
          v-if="refresh"
          tab-position="left"
          style="height: 100%"
          @tab-click="handleSubChoose"
        >
          <el-tab-pane
            :key="item.id"
            v-for="item in subTags"
            :label="item.value"
            :name="item.value"
          ></el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
    <el-main>
      <el-table :data="noteTable" style="width: 100%">
        <el-table-column label="发布于">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime |timeFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新于">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.updateTime | timeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述">
          <template slot-scope="scope">
            <el-popover
              trigger="hover"
              title="摘要"
              width="200"
              placement="top"
              :content="scope.row.summary|summaryFilter"
            >
              <div slot="reference" class="name-wrapper">
                <el-link
                  type="primary"
                  @click="handleViewNote(scope.$index,scope.row)"
                >{{ scope.row.description }}</el-link>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="primary" @click="handleViewTree(scope.$index, scope.row)">笔记结构</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        :page-count="total"
        layout="prev, pager, next, jumper"
      ></el-pagination>

      <el-drawer title="笔记结构图" :visible.sync="drawer" :with-header="true" size="80%">
        <vue2-org-tree
          name="test"
          :data="titleTree"
          :horizontal="horizontal"
          :collapsable="collapsable"
          :label-class-name="labelClassName"
          :render-content="renderContent"
          @on-expand="onExpand"
          @on-node-click="onNodeClick"
        />
      </el-drawer>
    </el-main>
  </el-container>
</template>
<script>
import { getRequest } from "@/utils/request";
import { timestampFormat } from "@/utils/timeUtils";

export default {
  data() {
    return {
      choice: "",
      subChoice: "",
      noteTable: [],
      currentPage: 1,
      total: 1,
      drawer: false,
      titleTree: {},
      horizontal: true,
      collapsable: true,
      expandAll: false,
      labelClassName: "bg-white",
      subTags: [],
      refresh: true,
      tags: []
    };
  },
  mounted() {
    getRequest("/note/findTag").then(response => {
      this.tags = response.data.data;
    });
  },
  filters: {
    summaryFilter(summary) {
      return summary.slice(0, 100);
    },
    timeFilter(time) {
      return timestampFormat(time);
    }
  },
  methods: {
    handleChoose() {
      this.subTags = this.tags.find(e => e.value === this.choice).children;
      getRequest("/note/findByTag", {
        tag: this.choice,
        page: this.currentPage
      }).then(response => {
        this.noteTable = response.data.data.content;
        this.total = response.data.data.totalPages;
      });
    },
    handleSubChoose() {
      getRequest("/note/findByTag", {
        tag: this.subChoice,
        page: this.currentPage
      }).then(response => {
        this.noteTable = response.data.data.content;
        this.total = response.data.data.totalPages;
      });
    },
    handleViewTree(index, row) {
      this.drawer = true;
      this.titleTree = this.noteTable[index].titleTree;
    },
    handleViewNote(index, row) {
      this.$router.push("/note/" + row.id);
    },
    handleCurrentChange(val) {
      getRequest("/note/findByTag", {
        tag: this.choice,
        page: this.currentPage
      }).then(response => {
        this.noteTable = response.data.data.content;
        this.total = response.data.data.totalPages;
      });
    },
    handleNodeClick(data) {
      console.log(data);
    },
    renderContent(h, data) {
      data.value = data.value || "层级结构";
      return data.value;
    },
    onExpand(e, data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
    //点击选项执行的方法，可以用于跳转到其他链接，注意一定要写协议头
    onNodeClick(e, data) {
      //    alert(data.label);
      if (data.url == null) {
        return false;
      } else {
        window.open(data.url);
      }
    },
    collapse(list) {
      var _this = this;
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function(item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    }
  }
};
</script>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>