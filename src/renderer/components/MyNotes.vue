
<template>
  <div class="myNotesContainer">
    <el-card style="width:33%" class="box-card" v-for="(note,index) in notes" :key="note.id">
      <div slot="header" class="clearfix">
        <el-row type="flex" justify="space-between">
          <el-col style="margin: auto 0">
            <el-link type="primary" @click.stop.prevent="linkToEdit(note)">{{note.description}}</el-link>
          </el-col>
          <el-col style="textAlign: right">
            <el-tag :type="tagType[index%5]">{{note.tag}}</el-tag>
          </el-col>
        </el-row>
      </div>
      <el-container style="width:100%;height:215px">
        <el-main>
          <div>{{note.summary | summaryFilter}}</div>
        </el-main>
        <el-footer>
          <el-divider>
            <i class="el-icon-notebook-1"></i>
          </el-divider>
          <el-row class="bottom-time" type="flex" justify="space-between">
            <el-col>
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px;textAlign:left">发布于 {{ note.createTime|timeFilter }}</span>
            </el-col>
            <el-col>
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px;textAlign:right">更新于 {{ note.updateTime|timeFilter }}</span>
            </el-col>
          </el-row>
        </el-footer>
      </el-container>
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
      tagType: ["success", "info", "danger", "warning", "primary"]
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
.el-card__body {
  padding: 0px;
}

.el-footer {
  padding: 0px;
}

.bottom-time {
  text-align: center;
  color: rgb(165, 165, 165);
  font-size: 0.8rem;
}

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
  height: 325px;
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