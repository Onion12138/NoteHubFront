<template>
  <div id="landing-layout">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "landing-layout",
  mounted() {
    this.$electron.ipcRenderer.send("logout");
  }
};
</script>
  