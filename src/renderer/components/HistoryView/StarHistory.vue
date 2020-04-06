<template>
  <el-table
    :data="tableData"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%"
  >
    <el-table-column align="left" label="笔记名称">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium">{{ scope.row.description }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column align="center" label="点赞日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.localDateTime | timeFilter }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getRequest } from "@/utils/request";
import { timestampFormat } from "@/utils/timeUtils";

export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getBrowseHistory();
  },
  filters: {
    timeFilter(time) {
      return timestampFormat(time);
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$router.push("/note/" + val.noteId);
    },
    getBrowseHistory() {
      getRequest("/user/myStar").then(response => {
        this.tableData = response.data.data;
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>