<template>
  <div class="text-center">
    <el-dialog
    :visible.sync="dialogVisible"
    :before-close="handleCancel"
    title="输入根节点名称"
    >
    <el-input v-model="root"></el-input>
    <el-button type="primary" @click="handleConfirm">确认</el-button>
</el-dialog>
    <el-dialog
     :visible.sync="operate"
    >
       <el-input v-model="input" placeholder="输入子节点名称"></el-input>
       <el-button type="primary" @click="handleSubmmit">添加</el-button>
       <el-button type="warning" @click="handleDelete">删除子节点</el-button>
    </el-dialog>
    <vue2-org-tree
      name="test"
      :data="data"
      :horizontal="horizontal"
      :collapsable="collapsable"
      :label-class-name="labelClassName"
      :render-content="renderContent"
      @on-expand="onExpand"
      @on-node-click="onNodeClick"
    />
    <el-button type="warning" @click="handleCancel"> 取消</el-button>
    <el-button type="primary" @click="handlePublish"> 发布</el-button>
  </div>
</template>

<script>
import {postJsonRequest} from '../../utils/request'
export default {
  data() {
    return {
      root: "",
      input: "",
      dialogVisible: false,
      operate: false,
      data: {
        children: [],
        label: "",
        value: ""
      },
      currentNode: {},
      horizontal: true,
      collapsable: true,
      expandAll: true,
      labelClassName: "bg-white"
    };
  },
  mounted() {
    this.dialogVisible = true
  },
  methods: {
    handleCancel() {
      this.$router.replace('/home')
    },
    handleDelete() {
      this.currentNode.children = []
      this.operate = false
      this.input = ""
    },
    handleSubmmit() {
      this.currentNode.children.push({label:this.input,value:this.input,children:[]})
      this.operate = false
      this.input = ""
    },
    handlePublish(){
      postJsonRequest("/noteApi/user/addMindMap",this.data).then(response=>{
        console.log(response.data.data)
      })
    },
    handleConfirm(){
      this.data.label = this.root
      this.data.value = this.root
      this.dialogVisible = false
    },
    renderContent(h, data) {
      return data.label;
    },
    onExpand(e, data) {
      data.flag = true
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
    onNodeClick(e, data) {
      if(data.flag){
        data.flag = false
        return false
      }
      this.currentNode = data
      this.operate = true
    },
    collapse(list) {
      var _this = this;
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function(item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    }
  }
};
</script>
<style type="text/css">
.org-tree-node-label {
  white-space: nowrap;
}
.bg-white {
  background-color: white;
}
.bg-orange {
  background-color: orange;
}
.bg-gold {
  background-color: gold;
}
.bg-gray {
  background-color: gray;
}
.bg-lightpink {
  background-color: lightpink;
}
.bg-chocolate {
  background-color: chocolate;
}
.bg-tomato {
  background-color: tomato;
}
</style>
