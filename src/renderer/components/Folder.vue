<template>
  <el-table
    :data="tableData"
    style="width: 100%;cursor:pointer"
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
      <template slot-scope="scope" v-if="scope.$index!==0">
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
export default {
  data() {
    return {
      modifyFolderNameVisible: false,
      folderName: "",
      newFolderName: "",
      currentRow: null,
      tableData: [
        {
          id: "0",
          name: "默认收藏夹"
        },
        {
          id: "1",
          name: "JAVA基础"
        },
        {
          id: "2",
          name: "MYSQL"
        },
        {
          id: "3",
          name: "DUBBO"
        }
      ]
    };
  },
  methods: {
    // setCurrent(row) {
    //   this.$refs.singleTable.setCurrentRow(row);
    // },
    change(e) {
      this.$forceUpdate();
    },
    handleFolderNameModify() {
      this.tableData = this.tableData.map(item => {
        if (item.id === this.currentRow.id)
          return { ...item, name: this.newFolderName };
        else return item;
      });
      this.modifyFolderNameVisible = false;
    },
    handleFolderAdd() {
      console.log(this.tableData[this.tableData.length - 1].id);
      const newId = Number(this.tableData[this.tableData.length - 1].id) + 1;
      this.tableData = [
        ...this.tableData,
        {
          id: newId,
          name: this.folderName
        }
      ];
    },
    handleCurrentChange(val) {
      this.currentRow = val;

      if (val.id === "0") {
        this.$router.push({
          name: "mindMap",
          query: { isDefault: true }
        });
      } else {
        this.$router.push({ name: "mindMap", query: { id: val.id } });
      }
    },
    handleEdit(index, row) {
      this.currentRow = row;
      this.modifyFolderNameVisible = true;
    },
    handleDelete(index, row) {
      this.currentRow = row;
      this.tableData = this.tableData.filter(item => item.id !== row.id);
    }
  }
};
</script>