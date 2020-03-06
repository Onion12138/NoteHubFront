<template>
  <el-container>
    <el-header>
     <el-button type="text" icon="el-icon-back" @click="goBack" style="padding-bottom: 0px;">返回</el-button>
    </el-header>
    <el-main>
      <div style="text-align:center">{{note.description}}</div>
        <!-- <div> -->
           <el-row>
             <el-col :span="6">
          <el-avatar :src="note.profileUrl"></el-avatar>
          <span>{{note.authorName}}</span>
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
          <el-tag v-else type="danger">不允许再创作</el-tag>
            </el-col>
          </el-row>
        <!-- </div> -->
      <!-- <el-divider><i class="el-icon-s-opportunity"></i></el-divider> -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-link type="primary">关注作者<i class="el-icon-star-on"></i></el-link>
        </el-col>
        <el-col :span="6">
          <el-link type="primary" @click="chatWithAuthor()">联系作者<i class="el-icon-chat-line-square"></i></el-link>
        </el-col>
        <el-col :span="6">
            <el-link type="primary" :disabled="!note.authority" @click="fork">分支创作<i class="el-icon-edit"></i></el-link>
        </el-col>
        <el-col :span="6">
          <el-link type="primary">查看笔记结构<i class="el-icon-s-order"></i></el-link>
        </el-col>
      </el-row>
      <el-divider><i class="el-icon-notebook-1"></i></el-divider>
      <el-row>
      <mavon-editor 
      style="height: 100%;width: 100%;"
      v-model="note.content"
      :ishljs = "true"
      :subfield="false"
      :toolbarsFlag="false"
      defaultOpen="preview"
      :editable="false"
      />
      </el-row>
      <el-divider><i class="el-icon-notebook-1"></i></el-divider>
      <el-row :gutter="18">
        <el-col :span="5">
          <i class="el-icon-view">{{"浏览数:" + note.view}}</i>
        </el-col>
        <el-col :span="5">
          <i class="el-icon-thumb">{{"点赞数:" + note.star}}</i>
        </el-col>
        <el-col :span="5">
          <i class="el-icon-document-add">{{"收藏数:" + note.collect}}</i>
        </el-col>
        <el-col :span="5">
          <i class="el-icon-baseball">{{"踩数:" + note.hate}}</i>
        </el-col>
        <el-col :span="4">
          <i class="el-icon-fork-spoon">{{"fork数:" + note.fork}}</i>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
       <el-row>
        <el-col :span="8">
          <el-button icon="el-icon-thumb" circle type="success">点赞</el-button>
        </el-col>
         <el-col :span="8">
          <el-button icon="el-icon-baseball" circle type="warning">踩</el-button>
        </el-col>
         <el-col :span="8">
          <el-button icon="el-icon-document-add" circle type="primary">收藏</el-button>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
export default {
    name: 'note',
    data() {
        return {
          note: {
              noteId: 4,
              description: "SpringBoot教程",
              authorName: "Onion",
              authority: true,
              forkFrom: "75",
              star: 100,
              hate: 5,
              collect: 84,
              view: 1329,
              fork: 2,
              content: "### hello",
              profileUrl: "https://avatars2.githubusercontent.com/u/33611404?s=400&v=4",
              tag: "微服务"
          },
        }
    },
    mounted() {
    },
    methods: {
      goBack(){
          this.$router.push('/recommend')
      },
      chatWithAuthor() {
          this.$router.push('/chat')
      },
      fork() {
          this.$router.push({path:'/edit',query:{content: this.note.content, forkFrom: this.note.noteId}});
      }
    }
}
</script>

<style>

</style>