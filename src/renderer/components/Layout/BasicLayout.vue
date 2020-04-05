<template>
  <div id="basic-layout">
    <el-container style="min-height:660px">
      <el-aside style="min-height:660px">
        <el-menu :default-openeds="['1']" background-color="#fff">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location-outline"></i>起始页
            </template>
            <el-menu-item index="1-1">
              <router-link to="/home">欢迎页面</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-opportunity"></i>探索
            </template>
            <el-menu-item index="2-1">
              <router-link to="/search">搜索</router-link>
            </el-menu-item>

            <el-menu-item index="2-3">
              <router-link to="/edit">发布</router-link>
            </el-menu-item>
            <el-menu-item index="2-4">
              <router-link to="/tag">筛选</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>推荐
            </template>
            <el-menu-item index="3-1">
              <router-link to="/recommend">推荐</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-user"></i>我的
            </template>
            <el-menu-item index="4-2">
              <router-link to="/mine">资料</router-link>
            </el-menu-item>
            <el-menu-item index="4-4">
              <router-link to="/message">消息</router-link>
            </el-menu-item>
            <el-menu-item index="4-5">
              <router-link to="/collect">收藏</router-link>
            </el-menu-item>
            <el-menu-item index="4-6">
              <router-link to="/folder">导图</router-link>
            </el-menu-item>
            <el-menu-item index="4-7">
              <router-link to="/message">浏览记录</router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container class="main" style="min-height:660px">
        <el-header>
          <el-row type="flex" justify="space-between" class="row-header">
            <el-col :span="20">
              <a href="#" @click.prevent="openFileChooser">
                <el-avatar class="user-profile" :src="profileUrl"></el-avatar>
              </a>
              <input id="file" type="file" accept="image/*" ref="fileInput" @change="uploadProfile" />
            </el-col>
            <el-col :span="4" class="el-col-setting">
              <el-dropdown @command="handleCommand" trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-s-tools el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    未读消息
                    <el-badge class="mark" :value="5" />
                  </el-dropdown-item>
                  <el-dropdown-item>
                    系统消息
                    <el-badge class="mark" :value="12" />
                  </el-dropdown-item>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { uploadFileRequest } from "@/utils/request";
import { createObjectURL, revokeObjectURL } from "@/utils/fileURL";
import "@/utils/mock";

export default {
  name: "basic-layout",

  data() {
    return {
      winHeight: document.documentElement.clientHeight,
      profileUrl:
        localStorage.getItem("profileUrl") ||
        "https://avatars2.githubusercontent.com/u/33611404?s=400&v=4"
    };
  },
  mounted() {
    // if (localStorage.getItem("token"))
    this.autoLogin();
  },
  methods: {
    openFileChooser() {
      this.$refs.fileInput.click();
    },
    autoLogin() {
      this.$electron.ipcRenderer.send("login");
    },
    uploadProfile: async function(event) {
      const file = event.target.files[0];
      if (file === void 0) return;
      let form = new FormData();
      form.append("file", file);
      const url = createObjectURL(file);
      localStorage.setItem("profileUrl", url);
      this.profileUrl = url;
      revokeObjectURL(file);
      //模拟异步请求
      const sleep = function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      };
      await sleep(2000);
      uploadFileRequest("/noteApi/user/uploadProfile", form).then(response => {
        let data = response.data.data;
        if (response.data.code === 200) {
          localStorage.setItem("profileUrl", data.url);
          this.profileUrl = data.url;
        }
      });
    },
    handleCommand(command) {
      switch (command) {
        case "logout":
          alert("logout");
          (async () => {
            await localStorage.clear();
            this.$router.push("/auth/login");
          })();
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
}
#file {
  visibility: hidden;
}

.el-aside {
  width: 200px !important;
  background: #fff;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.5);

  a {
    color: #333;
    display: block;
    text-decoration: none;
  }
  .el-menu {
    background: #eee;
  }
}

.main {
  overflow-y: auto; /*溢出  出现滚动条*/

  // overflow-x: hidden;

  width: 100%;
}

.content {
  width: 100%;
}

//全局表格

.electron-table {
  border-collapse: collapse; //给表格设置合并边框模型

  width: 100%;
}
.electron-table tr td,
.electron-table tr th {
  height: 30px;
  line-height: 30px;

  border: 1px solid #eee;

  text-align: center;

  font-size: 14px;

  padding: 5px;
}
/*全局布局*/

.main_top {
  background: none repeat scroll 0 0 #fffced;
  border: 1px solid #fffced;
  line-height: 20px;
  padding: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}
.page {
  text-align: center;
  margin-top: 20px;
}

.v-modal {
  opacity: 0.8 !important;
}

.router-link-active {
  color: #409eff !important;
}

.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.el-col-setting {
  text-align: right;
}
.el-header {
  position: relative;
  width: 100%;
  z-index: 999;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.18);
}
.user-profile {
  margin-top: 0.5rem;
}
</style>
