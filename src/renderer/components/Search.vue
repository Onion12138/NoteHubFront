<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-header>
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="选择搜索方式">
          <el-option label="作者邮箱搜索" value="1"></el-option>
          <el-option label="关键词搜索" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%" :stripe="true" :show-header="false">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="发布时间">
                <div>{{ props.row.publishTime }}</div>
              </el-form-item>
              <el-form-item label="最新更新于">
                <div>{{ props.row.updateTime }}</div>
              </el-form-item>
              <el-form-item label="作者邮箱">
                <div>{{ props.row.email }}</div>
              </el-form-item>
              <el-form-item label="关键字">
                <div>{{ props.row.keywords }}</div>
              </el-form-item>
              <el-form-item label="摘要">
                <div>{{ props.row.summary }}</div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="200">
          <template slot-scope="scope">
            <i class="el-icon-document"></i>
            <span style="margin-left: 10px">{{scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标签">
          <template slot-scope="scope">
            <el-tag>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleViewDetail(scope.$index, scope.row)">查看笔记</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleViewOutline(scope.$index, scope.row)">查看结构</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer title="笔记结构图" :visible.sync="drawer" size="80%">
        <!-- <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
        <vue2-org-tree
          name="test"
          :data="data"
          :horizontal="horizontal"
          :collapsable="collapsable"
          :label-class-name="labelClassName"
          :render-content="renderContent"
          @on-expand="onExpand"
          @on-node-click="onNodeClick"
        />
      </el-drawer>
    </el-main>
    <el-footer>
      <div class="block">
        <span class="demonstration">直接前往</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="200"
        ></el-pagination>
      </div>
    </el-footer>
  </el-container>
  <!-- </div> -->
</template>
<script>
export default {
  name: "search",
  data() {
    return {
      input: "",
      select: "",
      tableData: [
        {
          noteId: 1,
          publishTime: "2016-05-02",
          updateTime: "2019-02-23",
          email: "969023014@qq.com",
          keywords: "进程 操作系统",
          summary: "Linux操作系统指令合集",
          description: "Linux常用命令",
          tag: "操作系统"
        },
        {
          noteId: 2,
          publishTime: "2018-07-02",
          updateTime: "2019-02-23",
          email: "969023014@qq.com",
          keywords: "代理服务器 云计算",
          summary: "云计算基本概念是什么呢",
          description: "云计算",
          tag: "云计算"
        },
        {
          noteId: 3,
          publishTime: "2016-05-02",
          updateTime: "2019-02-23",
          email: "969023014@qq.com",
          keywords: "IP 协议",
          summary:
            "TCP建立三次连接，保证可靠传输，而UDP不建立连接，常用于实时数据传输，如视频、音频等等",
          description: "网络层协议",
          tag: "计算机网络"
        }
      ],
      drawer: false,
      defaultProps: {
        children: "children",
        label: "labe"
      },
      treeData: [],
      currentPage: 2,
      data: {
        children: [
          {
            children: [
              {
                children: [],
                label: "Docker",
                level: 3
              },
              {
                children: [
                  {
                    children: [],
                    label: "缓存预热",
                    level: 4
                  },
                  {
                    children: [],
                    label: "缓存雪崩",
                    level: 4
                  },
                  {
                    children: [],
                    label: "缓存击穿",
                    level: 4
                  },
                  {
                    children: [],
                    label: "缓存穿透",
                    level: 4
                  }
                ],
                label: "企业级解决方案",
                level: 3
              }
            ],
            label: "Redis",
            level: 2
          }
        ],
        label: "Redis",
        level: 0
      },
      horizontal: true,
      collapsable: true,
      expandAll: false,
      labelClassName: "bg-white"
    };
  },
  methods: {
    handleViewDetail(index, row) {
      this.$router.push({ path: "/note", query: { noteId: row.noteId } });
    },
    handleViewOutline(index, row) {
      this.drawer = true;
      this.treeData = this.tableData[index].tree;
      console.log(index, row);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    renderContent(h, data) {
      return data.label;
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
<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
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
  width: 100%;
}
.org-tree-node-label {
  white-space: nowrap;
}
.bg-white {
  background-color: white;
}
.bg-orange {
  background-color: orange;
}
.bg-gold {
  background-color: gold;
}
.bg-gray {
  background-color: gray;
}
.bg-lightpink {
  background-color: lightpink;
}
.bg-chocolate {
  background-color: chocolate;
}
.bg-tomato {
  background-color: tomato;
}
</style>