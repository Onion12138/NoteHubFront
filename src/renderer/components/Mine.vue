<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我的信息</span>
      </div>
      <div class="text item">{{ "昵称 " + username }}</div>
      <div class="text item">{{ "邮箱 " + email }}</div>
    </el-card>
    <div id="myData"></div>
  </div>
</template>

<script>
import { getRequest } from "@/utils/request";
import DataSet from "@antv/data-set";
import { Chart } from "@antv/g2";

export default {
  name: "mine",
  data() {
    return {
      username: localStorage.getItem("username") || "用户",
      email: localStorage.getItem("email") || "xxx@xxx.xx",
    };
  },
  mounted() {
    this.initG2();
  },
  methods: {
    initG2() {
      getRequest("/user/myData").then((response) => {
        console.log(response.data.data);
        const res = response.data.data;
        const data = [];
        let maxScore = -Number.MAX_VALUE;
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            data.push({ item: key, 篇数: res[key] });
            maxScore = Math.max(maxScore, res[key]);
          }
        }

        const { DataView } = DataSet;
        const dv = new DataView().source(data);
        dv.transform({
          type: "fold",
          fields: ["篇数"], // 展开字段集
          key: "user", // key字段
          value: "score", // value字段
        });

        const chart = new Chart({
          container: "myData",
          autoFit: true,
          height: 350,
        });
        chart.data(dv.rows);
        chart.scale("score", {
          min: 0,
          max: maxScore,
        });
        chart.coordinate("polar", {
          radius: 0.8,
        });
        chart.tooltip({
          shared: true,
          showCrosshairs: true,
          crosshairs: {
            line: {
              style: {
                lineDash: [4, 4],
                stroke: "#333",
              },
            },
          },
        });
        chart.axis("item", {
          line: null,
          tickLine: null,
          grid: {
            line: {
              style: {
                lineDash: null,
              },
            },
          },
        });
        chart.axis("score", {
          line: null,
          tickLine: null,
          grid: {
            line: {
              type: "line",
              style: {
                lineDash: null,
              },
            },
          },
        });

        chart
          .line()
          .position("item*score")
          .color("user")
          .size(2);
        chart
          .point()
          .position("item*score")
          .color("user")
          .shape("circle")
          .size(4)
          .style({
            stroke: "#fff",
            lineWidth: 1,
            fillOpacity: 1,
          });
        chart
          .area()
          .position("item*score")
          .color("user");
        chart.render();
      });
    },
  },
};
</script>

<style scoped>
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
  width: 100%;
}
</style>
