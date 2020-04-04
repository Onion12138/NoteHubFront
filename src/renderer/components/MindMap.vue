<template>
  <div>
    <el-header>
      <el-button type="text" icon="el-icon-back" @click="goBack" style="padding-bottom: 0px;">返回</el-button>
    </el-header>
    <div id="mountNode"></div>
    <el-row type="flex" justify="end" v-if="!isDefault">
      <el-col :span="4">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </el-col>
    </el-row>
    <el-dialog title="新增节点" :visible.sync="addNodeVisible">
      <el-input v-model="nodeName" placeholder="输入子节点名称"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNodeVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddNode">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import G6 from "@antv/g6";
import insertCss from "insert-css";
import { getRequest, postJsonRequest } from "@/utils/request";
import "@/utils/mock";

insertCss(
  `
 #mountNode {
  position: relative;
  min-height: 500px;
}

#contextMenu {
  position: absolute;
  list-style-type: none;
  padding: 10px 8px;
  left: -150px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}
#contextMenu li {
  cursor: pointer;
  list-style-type: none;
  list-style: none;
  margin-left: 0px;
  margin-top: 2px;
}
#contextMenu li:hover {
  color: #409eff;
}
  `
);

export default {
  name: "minimap",
  mounted() {
    this.initG6();
    console.log(this.$route);
  },
  data() {
    return {
      addNodeVisible: false,
      nodeName: "",
      nodeNumber: 0,
      graph: {},
      currentNode: {},
      isDefault: this.$route.query.isDefault || false,
      mindMapId: this.$route.query.id || ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handleSubmit() {
      console.log(this.graph.save());
      //深拷贝获取精简树
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
      const data = deepCopy(this.graph.save());
      console.log(data);
      postJsonRequest("/noteApi/user/addMindMap", data).then(response =>
        console.log(response.data)
      );
    },
    handleAddNode() {
      if (this.nodeName) {
        this.graph.addChild(
          {
            id: String(this.nodeNumber++),
            label: this.nodeName,
            value: this.nodeName,
            children: [],
            type: "tree-node"
          },
          this.currentNode.defaultCfg.id
        );
        console.log(this.currentNode);
      }
      this.addNodeVisible = false;
    },
    handleDeleteNode() {
      this.graph.removeChild(this.currentNode.defaultCfg.id);
    },
    openAddNodeDialog() {
      this.addNodeVisible = true;
    },
    initG6() {
      const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
        return [
          ["M", x, y],
          ["a", r, r, 0, 1, 0, r * 2, 0],
          ["a", r, r, 0, 1, 0, -r * 2, 0],
          ["M", x + 2, y],
          ["L", x + 2 * r - 2, y]
        ];
      };
      const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
        return [
          ["M", x, y],
          ["a", r, r, 0, 1, 0, r * 2, 0],
          ["a", r, r, 0, 1, 0, -r * 2, 0],
          ["M", x + 2, y],
          ["L", x + 2 * r - 2, y],
          ["M", x + r, y - r + 2],
          ["L", x + r, y + r - 2]
        ];
      };
      G6.registerNode("tree-node", {
        drawShape: function drawShape(cfg, group) {
          const rect = group.addShape("rect", {
            attrs: {
              fill: "#fff",
              stroke: "#666"
            },
            name: "rect-shape"
          });
          const content = cfg.label.replace(/(.{19})/g, "$1\n");
          const text = group.addShape("text", {
            attrs: {
              text: content,
              x: 0,
              y: 0,
              textAlign: "left",
              textBaseline: "middle",
              fill: "#666"
            },
            name: "rect-shape"
          });
          const bbox = text.getBBox();
          const hasChildren = cfg.children && cfg.children.length > 0;
          if (hasChildren) {
            group.addShape("marker", {
              attrs: {
                x: bbox.maxX + 6,
                y: bbox.minX + bbox.height / 2 - 6,
                r: 6,
                symbol: COLLAPSE_ICON,
                stroke: "#666",
                lineWidth: 2
              },
              name: "collapse-icon"
            });
          }
          rect.attr({
            x: bbox.minX - 4,
            y: bbox.minY - 6,
            width: bbox.width + (hasChildren ? 26 : 8),
            height: bbox.height + 12
          });
          return rect;
        }
      });

      const conextMenuContainer = document.createElement("ul");
      conextMenuContainer.id = "contextMenu";

      // create li
      const firstLi = document.createElement("li");
      firstLi.innerText = "增加子节点";
      firstLi.onclick = this.openAddNodeDialog;
      conextMenuContainer.appendChild(firstLi);

      const lastLi = document.createElement("li");
      lastLi.innerText = "删除节点";
      lastLi.onclick = this.handleDeleteNode;
      conextMenuContainer.appendChild(lastLi);
      document.getElementById("mountNode").appendChild(conextMenuContainer);

      const width = document.getElementById("mountNode").scrollWidth;
      const height = document.getElementById("mountNode").scrollHeight || 500;

      // const minimap = new G6.Minimap({
      //   size: [100, 100],
      //   className: "minimap",
      //   type: "delegate"
      // });
      // const grid = new G6.Grid();

      const graph = new G6.TreeGraph({
        container: "mountNode",
        width,
        height,
        // plugins: [minimap, grid],
        modes: {
          default: [
            {
              type: "collapse-expand",
              onChange: function onChange(item, collapsed) {
                const data = item.getModel();
                const icon = item
                  .getContainer()
                  .find(element => element.get("name") === "collapse-icon");
                if (collapsed) {
                  icon.attr("symbol", EXPAND_ICON);
                } else {
                  icon.attr("symbol", COLLAPSE_ICON);
                }
                data.collapsed = collapsed;
                return true;
              }
            },
            "drag-canvas",
            "zoom-canvas"
          ]
        },
        defaultNode: {
          size: [125, 25],
          style: {
            stroke: "#adc6ff",
            lineWidth: 2,
            textOverflow: "ellipsis"
          },
          stateIcon: {
            show: false
          },
          labelCfg: {
            style: {
              fontSize: 12,
              textOverflow: "ellipsis"
            }
          },
          anchorPoints: [
            [0, 0.5],
            [1, 0.5]
          ]
        },
        defaultEdge: {
          type: "cubic-horizontal",
          style: {
            stroke: "#A3B1BF"
          }
        },
        layout: {
          type: "compactBox",
          direction: "LR",
          getId: function getId(d) {
            return d.id;
          },
          getHeight: function getHeight() {
            return 16;
          },
          getWidth: function getWidth() {
            return 16;
          },
          getVGap: function getVGap() {
            return 20;
          },
          getHGap: function getHGap() {
            return 80;
          }
        }
      });

      this.graph = graph;

      graph.on("node:contextmenu", evt => {
        evt.preventDefault();
        evt.stopPropagation();
        this.currentNode = evt.item;
        const model = evt.item.getModel();
        if (model.value === model.label) {
          conextMenuContainer.style.left = `${evt.canvasX + 20}px`;
          conextMenuContainer.style.top = `${evt.canvasY}px`;
        }
      });

      graph.on("node:click", evt => {
        this.currentNode = evt.item;
        const model = evt.item.getModel();
        const children = model.children;
        const noteId = model.value;
        if (model.value !== model.label) {
          this.$router.push({ path: `/note/${noteId}` });
        }
      });

      graph.on("node:mouseleave", () => {
        conextMenuContainer.style.left = "-150px";
      });
      const that = this;

      // fetch(
      //   "https://gw.alipayobjects.com/os/antvdemo/assets/data/modeling-methods.json"
      // )
      //   .then(res => res.json())
      //   .then(data => {
      //     G6.Util.traverseTree(data, function(item) {
      //       // item.id = item.name;
      //       item.id = String(that.nodeNumber++);
      //     });
      //     graph.data(data);
      //     graph.render();
      //     graph.fitView();
      //   });

      //前端重新维护id
      const url = this.isDefault
        ? "noteApi/user/getCollection"
        : "noteApi/user/getMindMap";
      const params = this.isDefault ? {} : { num: this.mindMapId };
      getRequest(url, params).then(response => {
        let data = response.data.data[0] || response.data.data;
        G6.Util.traverseTree(data, function(item) {
          // item.id = item.name;
          item.id = String(that.nodeNumber++);
          const isNote = item.label !== item.value;
          if (isNote) {
            item.type = "modelRect";
            if (item.label.length >= 8) item.label = item.label.slice(0, 8);
          } else {
            item.type = "tree-node";
          }
        });
        graph.data(data);
        graph.render();
        graph.fitView();
      });
    }
  }
};
</script>

