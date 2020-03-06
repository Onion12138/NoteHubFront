<template>
  <div>
    Amazing NoteHub !
    <img src="../../../static/logo.png">
    <!-- <el-dialog
      title="请您先登录"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :visible.sync="loginDialog"
      :center="true">
      <login></login>
    </el-dialog> -->
    <el-dialog
      title="选择你感兴趣的tag"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :destroy-on-close="true"
      :visible.sync="dialogVisible"
      :center="true">
      <el-checkbox-group v-model="chooseTags">
        <el-checkbox-button v-for="tag in tags" :label="tag.name" :key="tag._id">{{tag.name}}</el-checkbox-button>
      </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmChooseTags" :disabled="chooseTags.length < 1">确 定</el-button>
    </span>
    </el-dialog>
  </div>
  
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  import { noteApi }from '../../utils/path' 
  export default {
      name: 'home',
      mounted() {
        // this.axios.post(noteApi + '/user/login').then((response)=>{
        //   console.log(response)
        // })
        let userInfo = localStorage.getItem("userInfo")
        if(userInfo === undefined || userInfo === '') {
          this.$router.replace("/login")
        }
      },
      data() {
        return {
          dialogVisible: true,
          tags: [{
            _id: 0,
            name: "人工智能"

          },{
            _id: 1,
            name: "前端开发"
          },{
            _id: 2,
            name: "后端开发"
          },{
            _id: 3,
            name: "移动/游戏开发"
          },{
            _id: 4,
            name: "大数据云计算"
          },{
            _id: 5,
            name: "测试运维"
          }],
          chooseTags: []
        }
      },
      methods: {
        confirmChooseTags() {
          this.dialogVisible = false
        }
      }
};
</script>