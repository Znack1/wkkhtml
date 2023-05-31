<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2021-01-06 11:15:31
 * @LastEditors: zkc
 * @LastEditTime: 2023-05-29 21:06:23
 * @input: no param
 * @out: no param
-->
<template>
  <div id="app">
    <UCHeader ref="ucHeader" class="divHeaderBox" ></UCHeader>
    <div class="divRouter">
      <router-view />
    </div>
  </div>
</template>

<script>
import UCHeader from "./views/UCHeader.vue";
import { SystemConfig } from "./config/SystemConfig";
export default {
  name: "App",
  data() {
    return {
      activeIndex: "",
    };
  },
  components: {
    UCHeader,
  },

  methods: {
    init() {
      window.onresize = function () {};
      this._initEvents();
    },

    /**
     * 初始化事件
     */
    _initEvents() {},
  },

  mounted() {},
  beforeDestroy() {},
  beforeCreate() {
    //
    //初始化系统配置
    SystemConfig.getInstance().init();
  },
};
</script>


<style lang="less" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .divRouter {
    width: 100%;
    height: calc(100% - 60px);
  }
}
</style>