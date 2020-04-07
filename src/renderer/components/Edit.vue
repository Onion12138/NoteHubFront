<template>
  <el-container>
    <el-header v-if="isModify">
      <el-button type="text" icon="el-icon-back" @click="goBack" style="padding-bottom: 0px;">返回</el-button>
    </el-header>
    <el-main>
      <el-input style="margin-bottom:1.2rem" v-model="note.description" placeholder="请输入笔记的描述信息"></el-input>
      <mavon-editor ref="mavon" @imgAdd="$imgAdd" style="min-height:450px" v-model="note.content" />
      <div class="block">
        <el-cascader
          v-if="!isModify"
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
      v-if="!isModify"
      style="margin-left: 1.5rem"
      v-model="note.authority"
      active-text="允许fork"
      inactive-text="只能查阅"
    ></el-switch>
    <el-footer>
      <div style="display: flex;align-items: center;margin-top: 15px;justify-content: flex-end">
        <el-button v-if="isModify" type="danger" icon="el-icon-delete" @click="deleteNote">删除笔记</el-button>
        <el-button v-else type="warning" icon="el-icon-caret-left" @click="cancelModify">放弃修改</el-button>
        <el-button v-if="isModify" type="primary" icon="el-icon-upload" @click="modify">修改笔记</el-button>
        <el-button v-else type="primary" icon="el-icon-upload" @click="publish">发布笔记</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import {
  getRequest,
  postEncodedRequest,
  uploadFileRequest
} from "@/utils/request";
export default {
  name: "edit",
  data() {
    return {
      tags: [],
      isModify: false,
      note: {
        id: "",
        content: "",
        description: "",
        tag: "",
        authority: true,
        forkFrom: ""
      }
    };
  },
  mounted() {
    console.log(this.$route);
    if (this.$route.query) {
      const {
        id,
        content,
        forkFrom,
        description,
        tag,
        authority
      } = this.$route.query;

      this.note = {
        id: id || "",
        content: content || "",
        description: description || "",
        tag: tag || "",
        authority: authority || true,
        forkFrom: forkFrom || ""
      };
      this.isModify = id !== undefined;
    }
    getRequest("/note/findTag").then(response => {
      console.log(response);
      this.tags = response.data.data;
    });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    $imgAdd(pos, $file) {
      const formdata = new FormData();
      formdata.append("file", $file);
      formdata.append("noteId", this.note.id);
      uploadFileRequest("/note/uploadPicture", formdata).then(response => {
        const url = response.data.data;
        this.$refs.mavon.$img2Url(pos, url);
      });
    },
    modify() {
      if (this.checkForm()) {
        const data = {
          id: this.note.id,
          content: this.note.content,
          description: this.note.description
        };
        postEncodedRequest("/note/update", data).then(response => {
          if (response.data.code === 200) {
            this.$notify.success({
              title: "修改成功",
              position: "bottom-right"
            });
            this.$router.go(-1);
          }
        });
      }
    },
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
    checkForm() {
      if (!this.note.description) {
        this.$message.warning("笔记描述不能为空");
        return false;
      }
      if (!this.note.content) {
        this.$message.warning("笔记内容不能为空");
        return false;
      }
      if (!this.note.tag) {
        this.$message.warning("笔记标签不能为空");
        return false;
      }
      return true;
    },
    publish() {
      if (this.checkForm()) {
        console.log(this.note.tag);
        const data = Object.assign({}, this.note, {
          tag: this.note.tag.join("/")
        });
        // console.log("send");
        postEncodedRequest("/note/publish", data).then(response => {
          const data = response.data.data;
          this.note = Object.assign({}, this.note, { id: data });
          this.$notify.success({
            title: "发布成功",
            position: "bottom-right"
          });
          if (this.$route.query) {
            this.$router.go(-1);
          }
        });
      }
    },
    deleteNote() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          postEncodedRequest("/note/delete", { noteId: this.note.id }).then(
            response => {
              if (response.data.code === 200) {
                this.$notify.success({
                  title: "删除成功!",
                  position: "bottom-right"
                });
                this.$router.go(-1);
              }
            }
          );
        })
        .catch(() => {
          this.$notify.info({
            title: "取消删除",
            position: "bottom-right"
          });
        });
    }
  }
};
</script>

<style>
</style>