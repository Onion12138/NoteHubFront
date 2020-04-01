<template>
  <el-container>
    <el-header>
      <el-page-header @back="goBack" content="交流室"></el-page-header>
    </el-header>
    <el-main>
      <el-table
        :data="tableData"
        style="width: 100% height: 800px"
        max-height="500"
        :show-header="false"
      >
        <el-table-column label="TA" width="400">
          <template slot-scope="scope">
            <el-avatar :src="circleUrl" v-if="scope.row.num % 2 === 1"></el-avatar>
            <!-- <span v-if="scope.row.num % 2 === 1">mother fucker</span> -->
            <el-input
              v-if="scope.row.num % 2 === 1"
              type="textarea"
              :autosize="true"
              v-model="scope.row.date"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="我" width="400">
          <template slot-scope="scope">
            <el-avatar :src="circleUrl" v-if="scope.row.num % 2 === 0"></el-avatar>
            <el-input
              v-if="scope.row.num % 2 === 0"
              type="textarea"
              :autosize="true"
              v-model="scope.row.date"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    }
  },
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      tableData: [
        {
          num: 0,
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          num: 1,
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          num: 2,
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          num: 3,
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          num: 4,
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          num: 5,
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          num: 6,
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>