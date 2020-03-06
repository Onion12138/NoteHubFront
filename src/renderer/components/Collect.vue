<template>
  <el-cascader-panel :options="options" ref="opt" @change="handleChange"></el-cascader-panel>
</template>
<script>
    import {getRequest} from '../../utils/request';
    export default {
    methods: {
        handleChange() {
            console.log(this.$refs.opt.getCheckedNodes()[0].data.id)
            this.$router.push("/note")
        }
    },
    data() {
      return {
        options: []
      };
    },
    mounted() {
        let _this = this
        getRequest("/noteApi/user/findOneIndex",{num:1}).then((response)=>{
            alert(response.data.data)
            _this.options.push(response.data.data)
            // alert(_this.options)
        })
    }
  };
</script>
<style>

</style>