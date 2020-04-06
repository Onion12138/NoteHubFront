
<template>
  <div class="myNotesContainer">
    <el-card style="width:33%" v-for="(note,index) in notes" class="box-card" :key="note.id">
      <div slot="header" class="clearfix">
        <el-row type="flex" justify="space-between">
          <el-col style="margin: auto 0">
            <el-link type="primary" @click.stop.prevent="linkToEdit(note)">{{note.description}}</el-link>
          </el-col>
          <el-col style="textAlign: right">
            <el-tag :type="tagType[index]">{{note.tag}}</el-tag>
          </el-col>
        </el-row>
      </div>
      <span>{{note.summary | summaryFilter}}</span>
      <el-divider>
        <i class="el-icon-notebook-1"></i>
      </el-divider>

      <el-row
        type="flex"
        justify="space-between"
        style="color:rgb(165,165,165);fontSize:0.8rem;height:40px;textAlign:center"
      >
        <el-col>
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">发布于 {{ note.createTime|timeFilter }}</span>
        </el-col>
        <el-col>
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px;textAlign:right">更新于 {{ note.updateTime|timeFilter }}</span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getRequest } from "@/utils/request";
import { timestampFormat } from "@/utils/timeUtils";

export default {
  data() {
    return {
      notes: {},
      tagType: ["success", "info", "danger", "warning"]
    };
  },
  mounted() {
    this.getMyNotes();
  },
  filters: {
    timeFilter(time) {
      return timestampFormat(time);
    },
    summaryFilter(summary) {
      return summary.slice(0, 100);
    }
  },
  methods: {
    linkToEdit(note) {
      this.$router.push({
        path: "/edit",
        query: {
          id: note.id,
          tag: note.tag,
          content: note.content,
          forkFrom: note.forkFrom,
          authority: note.authority,
          description: note.description
        }
      });
    },
    getMyNotes() {
      getRequest("/note/myPublish").then(response => {
        this.notes = response.data.data;
      });
    }
  }
};
</script>

<style scoped>
.myNotesContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}
.el-card {
  box-sizing: border-box;
  background-color: white;
  flex: 0 0 46%;
  height: 250px;
  margin: 0.5rem;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>