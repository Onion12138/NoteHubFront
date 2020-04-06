
<template>
  <el-table
    :data="tableData"
    style="width: 100%;"
    ref="singleTable"
    highlight-current-row
    @current-change="handleCurrentChange"
  >
    <el-table-column label="导图" width="60">
      <template>
        <i class="el-icon-notebook-1"></i>
      </template>
    </el-table-column>
    <el-table-column label="主题">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium">{{ scope.row.name }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="folderName"
          size="mini"
          placeholder="新建文件夹"
          @input="change($event)"
          @keyup.enter.native="handleFolderAdd"
        />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click.stop="handleEdit(scope.$index, scope.row)">重命名</el-button>
        <el-button size="mini" type="danger" @click.stop="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    <el-dialog title="修改名称" :visible.sync="modifyFolderNameVisible" :append-to-body="true">
      <el-input
        v-model="newFolderName"
        placeholder="输入新名称"
        @keyup.enter.native="handleFolderNameModify"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyFolderNameVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleFolderNameModify">确 定</el-button>
      </div>
    </el-dialog>
  </el-table>
</template>

<script>
import { getRequest, postJsonRequest, postParamRequest } from "@/utils/request";
// import "@/utils/mock";

export default {
  data() {
    return {
      modifyFolderNameVisible: false,
      folderName: "",
      newFolderName: "",
      currentRow: null,
      mindMaps: []
    };
  },
  mounted() {
    this.getMindMap();
  },
  computed: {
    tableData: function() {
      return this.mindMaps.map((item, index) => {
        return Object.assign(
          {},
          {
            id: String(index),
            name: item.label
          }
        );
      });
    }
  },
  methods: {
    // setCurrent(row) {
    //   this.$refs.singleTable.setCurrentRow(row);
    // },
    getMindMap() {
      getRequest("/user/getMindMap").then(response => {
        this.mindMaps = response.data.data; //array
      });
    },
    change(e) {
      this.$forceUpdate();
    },

    handleFolderNameModify() {
      this.mindMaps = this.mindMaps.map((item, index) => {
        if (index === this.currentRow.id)
          return {
            ...item,
            label: this.newFolderName,
            value: this.newFolderName
          };
        else return item;
      });
      this.modifyFolderNameVisible = false;
    },
    handleFolderAdd() {
      const newMindMap = {
        children: [],
        label: this.folderName,
        value: this.folderName
      };
      this.mindMaps = [...this.mindMaps, newMindMap];
      postJsonRequest("/user/addMindMap", newMindMap).then(response => {
        this.$notify.success({
          title: "新建成功"
        });
      });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      this.$router.push({
        name: "mindMap",
        query: { id: val.id, mindMap: JSON.stringify(this.mindMaps[val.id]) }
      });
    },
    handleEdit(index, row) {
      this.currentRow = row;
      this.modifyFolderNameVisible = true;
    },
    handleDelete(index, row) {
      this.currentRow = row;
      const temp = this.mindMaps.slice();
      temp.splice(index, 1);
      this.mindMaps = temp.slice();
      //`/user/deleteMindMap?index=${row.id}`
      postParamRequest("/user/deleteMindMap", {
        index: row.id
      }).then(response => console.log(response.data));
    }
  }
};
</script>
<style>
.el-table__row:hover {
  cursor: pointer;
}
</style>