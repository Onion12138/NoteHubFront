<template>
  <el-form :model="note" :rules="rules" ref="note">
    <el-container>
      <el-main>
        <el-input style="margin-bottom:1.2rem" v-model="note.description" placeholder="请输入笔记的描述信息"></el-input>
        <mavon-editor style="min-height:450px" v-model="note.content" />
        <div class="block">
          <el-cascader
            style="margin-top:1.2rem"
            placeholder="为笔记设置Tag"
            v-model="note.tag"
            :options="tags"
            @change="handleChange"
            :clearable="true"
            filterable
          ></el-cascader>
        </div>
      </el-main>
      <el-switch
        style="margin-left: 1.5rem"
        v-model="note.authority"
        active-text="允许fork"
        inactive-text="只能查阅"
      ></el-switch>
      <el-footer>
        <div style="display: flex;align-items: center;margin-top: 15px;justify-content: flex-end">
          <el-button type="warning" icon="el-icon-delete" @click="cancelModify">放弃修改</el-button>
          <el-button type="primary" icon="el-icon-upload" @click="publish(note)">发布笔记</el-button>
        </div>
      </el-footer>
    </el-container>
  </el-form>
</template>

<script>
import { getRequest, postEncodedRequest } from "@/utils/request";
export default {
  name: "edit",
  data() {
    return {
      note: {
        id: "",
        content: "",
        description: "",
        tag: "",
        authority: true,
        forkFrom: ""
      },
      rules: {
        description: [
          { required: true, message: "请输入笔记描述", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入笔记内容", trigger: "blur" }
        ]
      },
      tags: []
    };
  },
  mounted() {
    console.log(this.$route);
    if (this.$route.query) {
      this.note.content = this.$route.query.content || this.note.content;
      this.note.forkFrom = this.$route.query.forkFrom || "";
    }
    getRequest("/noteApi/note/findTag").then(response => {
      console.log(response);
      this.tags = response.data.data;
    });
  },
  methods: {
    cancelModify() {
      this.note = {
        id: "",
        content: "",
        description: "",
        tag: "",
        authority: true,
        forkFrom: ""
      };
      if (Object.keys(this.$route.query).length) {
        this.$router.go(-1);
      }
    },
    handleChange() {},
    publish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          postEncodedRequest("/noteApi/note/publish", this.note).then(
            response => {
              const data = response.data.data;
              this.note = Object.assign({}, this.note, { id: data });
            }
          );
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>