<template>
    <div style="display: flex;justify-content: space-around;flex-wrap: wrap">
          <el-card style="width:300px;margin-top: 10px;" v-for="o in 12" :key="o" class="box-card">
            hello world
          </el-card>
    </div>
</template>

<script>
export default {
    name: 'recommend'
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>