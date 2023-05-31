<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2022-07-26 17:27:22
 * @LastEditors: zkc
 * @LastEditTime: 2023-05-04 16:21:27
 * @input: no param
 * @out: no param
-->
<template>
  <div class="div_homeview">
      <UCMain ref="ucMain"></UCMain>
  </div>
</template>

<script>
import UCMain from "../components/UCMain.vue";

export default {
  name: "UCHome",
  components: {
    UCMain ,
  },
  data(){
    return{
      checkList:[],
    }
  },
  methods: {
    init() {
    },
  },

  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
.div_homeview{
  width:100%;
  height:100%;

}
</style>