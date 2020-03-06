<template>
    <el-container>
        <el-header>
        </el-header>
        <el-main>
            <el-table
                :data="tableData"
                style="width: 100%"
                :show-header="false"
                stripe
                >
                <el-table-column
                    prop="date"
                    abel="日期"
                    width="100">
                    <template slot-scope="scope">
                        <el-badge :value="95">
                        <el-avatar :src="scope.row.profileUrl"></el-avatar>
                          </el-badge>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: 'message',
    data() {
      return {
        tableData: [{
            profileUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          date: '2016-05-02',
          username: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
            profileUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          date: '2016-05-04',
          username: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
            profileUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          date: '2016-05-01',
          username: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
            profileUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          date: '2016-05-03',
          username: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods: {
        handleDelete() {

        }
    }
}
</script>

<style>
    .item {
        margin-top: 10px;
        margin-right: 40px;
    }
</style>