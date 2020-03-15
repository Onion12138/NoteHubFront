<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "electronproject",

  data() {
    return {
      winHeight: document.documentElement.clientHeight
    };
  },
  mounted() {
    window.onresize = () => {
      this.winHeight = document.documentElement.clientHeight;
    };
  }
};
</script>
