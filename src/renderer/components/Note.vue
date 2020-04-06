<template>
  <el-container>
    <el-header>
      <el-button type="text" icon="el-icon-back" @click="goBack" style="padding-bottom: 0px;">返回</el-button>
    </el-header>
    <el-main>
      <div class="note-description">{{note.description}}</div>
      <!-- <div> -->
      <el-row>
        <el-col :span="6">
          <el-row>
            <el-col>
              <el-avatar :src="author.profileUrl"></el-avatar>
            </el-col>
            <el-col>
              <span style="color:#777">{{author.username}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-tag>{{note.tag}}</el-tag>
        </el-col>
        <el-col :span="6">
          <el-tag v-if="note.forkFrom===''" type="success">原创</el-tag>
          <el-tag v-else type="info">再创作</el-tag>
        </el-col>
        <el-col :span="6">
          <el-tag v-if="note.authority" type="success">允许分支创作</el-tag>
          <el-tag v-else type="danger">不允许分支</el-tag>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-link type="primary" @click="follow">
            关注作者
            <i class="el-icon-star-on"></i>
          </el-link>
        </el-col>
        <el-col :span="6">
          <el-link type="primary" @click="chatWithAuthor">
            联系作者
            <i class="el-icon-chat-line-square"></i>
          </el-link>
        </el-col>
        <el-col :span="6">
          <el-link type="primary" :disabled="note.forkFrom ===''" @click="viewOriginal">
            查看原版
            <i class="el-icon-magic-stick"></i>
          </el-link>
        </el-col>
        <el-col :span="6">
          <el-link type="primary" @click="viewTree">
            查看笔记结构
            <i class="el-icon-s-order"></i>
          </el-link>
        </el-col>
      </el-row>
      <el-divider>
        <i class="el-icon-notebook-1"></i>
      </el-divider>
      <el-row>
        <mavon-editor
          style="height: 100%;width: 100%;"
          v-model="note.content"
          :ishljs="true"
          :subfield="false"
          :toolbarsFlag="false"
          defaultOpen="preview"
          :editable="false"
        />
      </el-row>
      <el-divider>
        <i class="el-icon-notebook-1"></i>
      </el-divider>
      <el-row :gutter="18" class="button-group">
        <el-col :span="4">
          <el-row>
            <el-col>
              <el-button icon="el-icon-view" circle type="text" disabled>浏览</el-button>
            </el-col>
            <el-col>
              <i>{{note.view}}</i>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row>
            <el-col>
              <el-button icon="el-icon-thumb" circle type="text" @click="star">点赞</el-button>
            </el-col>
            <el-col>
              <i>{{note.star}}</i>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="4">
          <el-row>
            <el-col>
              <el-button icon="el-icon-delete" circle type="text" @click="hate">踩</el-button>
            </el-col>
            <el-col>
              <i>{{note.hate}}</i>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row>
            <el-col>
              <el-button
                icon="el-icon-fork-spoon"
                circle
                type="text"
                @click="fork"
                :disabled="!note.authority"
              >分支</el-button>
            </el-col>
            <el-col>
              <i>{{note.fork}}</i>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row>
            <el-col>
              <el-button icon="el-icon-folder-add" circle type="text" @click="collect">收藏</el-button>
            </el-col>
            <el-col>
              <i>{{note.collect}}</i>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-col>
            <el-button icon="el-icon-goods" circle type="text" @click="mindMap">装入</el-button>
          </el-col>
          <el-col>
            <i>{{note.collect}}</i>
          </el-col>
        </el-col>
      </el-row>
      <el-dialog title="选择将笔记加入思维导图索引中" :visible.sync="dialogVisible" width="80%">
        <el-cascader-panel
          :options="options"
          :props="{ checkStrictly: true}"
          clearable
          @change="handleChoose"
          ref="opt"
          v-model="path"
        ></el-cascader-panel>
        <el-row type="flex" justify="end">
          <el-button type="primary" style="margin-top:0.5rem" @click="handleMindMap">确认</el-button>
        </el-row>
      </el-dialog>
      <el-drawer title="笔记结构导图" :visible.sync="drawer" direction="rtl" size="80%">
        <vue2-org-tree
          name="test"
          :data="titleTree"
          :horizontal="true"
          :collapsable="true"
          label-class-name="bg-white"
          :render-content="renderContent"
          @on-expand="onExpand"
        />
      </el-drawer>
    </el-main>
  </el-container>
</template>

<script>
import { getRequest, postParamRequest, postJsonRequest } from "@/utils/request";
// import "@/utils/mock";

export default {
  name: "note",
  data() {
    return {
      note: {},
      author: {
        username: "",
        profileUrl: ""
      },
      drawer: false,
      titleTree: {},
      dialogVisible: false,
      path: "",
      nodeNumber: 0,
      currentNode: {},
      options: []
    };
  },
  mounted() {
    let noteId = this.$route.params.noteId;
    console.log(noteId);
    console.log(Object.prototype.toString.call(noteId));
    this.refreshNote(noteId);
  },

  methods: {
    //todo:记录第一层index
    handleMindMap() {
      //dfs根据父节点id添加子节点
      console.log(this.options);
      console.log(this.currentNode);

      const addNode = function(child, parentId, arr) {
        const helper = (child, parentId, arr, flag) => {
          if (typeof arr !== "object" || !arr) return;
          if (arr instanceof Array) {
            for (let key in arr) {
              if (flag && arr[key].id !== parentId)
                helper(child, parentId, arr[key].children, flag);
              else {
                arr[key].children.push(child);
                flag = false; //标记减枝
                return;
              }
            }
          }
        };
        helper(child, parentId, arr, true);
      };
      addNode(
        {
          id: this.nodeNumber++,
          label: this.note.description,
          value: this.note.noteId,
          children: [],
          disabled: true
        },
        this.currentNode.data.id,
        this.options
      );
      console.log(this.options);
      //深拷贝还原options
      const keyMap = ["label", "value", "children"];
      const deepCopy = function(obj) {
        if (typeof obj !== "object" || !obj) return obj;
        var newObj;
        if (obj instanceof Array) {
          newObj = [];
          for (let key in obj) {
            newObj[key] = deepCopy(obj[key]);
          }
        } else {
          newObj = {};
          for (let key in obj) {
            if (obj.hasOwnProperty(key) && keyMap.includes(key)) {
              newObj[key] =
                typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
            }
          }
        }
        return newObj;
      };

      const getIndex = () => {
        let node = this.currentNode;
        while (node.parent) {
          node = node.parent;
        }
        for (let key in this.options) {
          if (this.options[key].id === node.data.id) {
            return key;
          }
        }
        return -1;
      };
      const mindMapId = getIndex();
      const data = deepCopy(this.options);
      console.log(Object.prototype.toString.call(mindMapId));

      console.log(mindMapId);
      postJsonRequest(
        `/user/updateMindMap?index=${mindMapId}`,
        data[mindMapId]
      ).then(response => {
        if (response.data.code === 200)
          this.$notify.success({
            title: "装入成功",
            position: "bottom-right"
          });
      });
      this.dialogVisible = false;
    },
    handleChoose() {
      this.currentNode = this.$refs.opt.getCheckedNodes()[0];
      console.log(this.currentNode);
    },
    follow() {
      postParamRequest("/graphApi/user/follow", {
        followedEmail: this.note.authorEmail
      }).then(response => {
        if (response.data.code === 200) {
          alert("关注成功");
        }
      });
    },
    refreshNote(noteId) {
      getRequest("/note/findOne", { noteId: noteId }).then(response => {
        this.note.noteId = noteId;
        let data = response.data.data;
        this.note.description = data.description;
        this.note.content = data.content;
        this.note.tag = data.tag.replace(",", "/");
        this.note.authority = data.authority;
        this.note.authorEmail = data.authorEmail;
        this.note.forkFrom = data.forkFrom;
        this.titleTree = data.titleTree;
        getRequest("/user/findUser", {
          email: this.note.authorEmail
        }).then(response => {
          let data = response.data.data;
          this.author.username = data.username;
          this.author.profileUrl = data.profileUrl;
        });
      });
      getRequest("/note/counter", { noteId: noteId }).then(response => {
        let data = response.data.data;
        this.note.star = data.star;
        this.note.hate = data.hate;
        this.note.collect = data.collect;
        this.note.view = data.view;
        this.note.fork = data.fork;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    chatWithAuthor() {
      this.$router.push("/chat");
    },
    fork() {
      this.$router.push({
        path: "/edit",
        query: { content: this.note.content, forkFrom: this.note.noteId }
      });
    },
    star() {
      if (localStorage.getItem(this.note.noteId + "star") !== null) {
        this.$notify.warning({
          title: "警告",
          position: "bottom-right",
          message: "你已点赞过"
        });
        return false;
      }
      postParamRequest("/note/starOrHate", {
        type: "star",
        description: this.note.description,
        noteId: this.note.noteId
      }).then(response => {
        if (response.data.code === 200) {
          this.note = Object.assign({}, this.note, {
            star: parseInt(this.note.star) + 1
          });
          localStorage.setItem(this.note.noteId + "star", "star");
        }
      });
    },
    hate() {
      if (localStorage.getItem(this.note.noteId + "hate") !== null) {
        this.$notify.warning({
          title: "警告",
          position: "bottom-right",
          message: "你已经踩过"
        });
        return false;
      }
      postParamRequest("/note/starOrHate", {
        type: "hate",
        noteId: this.note.noteId,
        description: this.note.description
      }).then(response => {
        if (response.data.code === 200) {
          this.note = Object.assign({}, this.note, {
            hate: parseInt(this.note.hate) + 1
          });
          localStorage.setItem(this.note.noteId + "hate", "hate");
        }
      });
    },
    //收藏
    collect() {
      postJsonRequest("/user/collectNote", {
        noteId: this.note.noteId,
        description: this.note.description,
        tag: this.note.tag.split("/")
      }).then(response => {
        if (response.data.code === 200)
          this.note = Object.assign({}, this.note, {
            collect: parseInt(this.note.collect) + 1
          });
        this.$notify.success({
          title: "成功",
          dangerouslyUseHTMLString: true,
          position: "bottom-right",
          message: `<div>已添加<span style="color:#409EFF">${this.note.description}</span>至默认收藏夹</div>`
        });
      });
    },
    //装入
    mindMap() {
      this.dialogVisible = true;
      //深拷贝标识节点id,将笔记节点disabled
      const deepCopy = obj => {
        if (typeof obj !== "object" || !obj) return obj;
        var newObj;
        if (obj instanceof Array) {
          newObj = [];
          for (let key in obj) {
            newObj[key] = deepCopy(obj[key]);
          }
        } else {
          newObj = { id: this.nodeNumber++ };
          if (obj.label !== obj.value) {
            newObj["disabled"] = true;
          }
          for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
              newObj[key] =
                typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
            }
          }
        }
        return newObj;
      };
      getRequest("/user/getMindMap").then(response => {
        this.options = deepCopy(response.data.data);
      });
    },
    viewOriginal() {
      this.refreshNote(this.note.forkFrom);
    },
    viewTree() {
      this.drawer = true;
    },
    renderContent(h, data) {
      data.value = data.value || "层级结构";
      return data.value;
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
    collapse(list) {
      var _this = this;
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    }
  }
};
</script>

<style scoped>
.note-description {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.button-group {
  color: #aaa;
  font-size: 0.8rem;
  text-align: center;
}
</style>