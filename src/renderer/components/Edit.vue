<template>
  <el-container>
    <el-main>
      <el-input v-model="note.description" placeholder="请输入笔记的描述信息"></el-input>
      <mavon-editor v-model="note.content" />
      <div class="block">
        <el-cascader
          placeholder="为笔记设置Tag"
          v-model="note.tag"
          :options="tags"
          @change="handleChange"
          :clearable="true"
          filterable
        ></el-cascader>
      </div>
    </el-main>
    <el-switch v-model="note.authority" active-text="允许fork" inactive-text="只能查阅"></el-switch>
    <el-footer>
      <div style="display: flex;align-items: center;margin-top: 15px;justify-content: flex-end">
        <el-button type="warning" icon="el-icon-delete">放弃修改</el-button>
        <el-button type="primary" icon="el-icon-upload" @click="publish">发布笔记</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import { getRequest, postEncodedRequest } from "../../utils/request";
export default {
  name: "edit",
  data() {
    return {
      note: {
        content: "",
        description: "",
        tag: "",
        authority: true,
        forkFrom: ""
      },
      tags: []
    };
  },
  mounted() {
    if(this.$route.query.forkFrom !== undefined) {
      this.note.content = this.$route.query.content;
      this.note.forkFrom = this.$route.query.forkFrom;
    }else{
      this.note.forkFrom = ""
    }
    getRequest("/noteApi/note/findTag").then(response => {
      console.log(response);
      this.tags = response.data.data;
    });
  },
  methods: {
    handleChange() {},
    publish() {
      postEncodedRequest("/noteApi/note/publish", this.note).then(response => {
        console.log(response.data.data);
      });
    }
  }
};
</script>

<style>
</style>