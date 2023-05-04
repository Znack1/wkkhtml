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
    <div class="leftpanel">
      <LeftMenu ref="leftMenu"></LeftMenu>
    </div>
    <div class="contentbox">
      <UCMain ref="ucMain"></UCMain>
    </div>
  </div>
</template>

<script>
import UCMain from "../components/UCMain.vue";
import LeftMenu from "../components/mainMenu/leftMenu.vue"
export default {
  name: "UCHome",
  components: {
    UCMain ,
    LeftMenu,
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
  .leftpanel{
    width:320px;
    height: 100%;
    float: left;
  }
  .contentbox{
    width:calc(100% - 322px);
    float: right;
    height:100%;
  }
}
</style>