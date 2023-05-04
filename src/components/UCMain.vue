<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2022-07-26 17:27:22
 * @LastEditors: zkc
 * @LastEditTime: 2022-11-18 14:04:14
 * @input: no param
 * @out: no param
-->
<template>
  <div class="divContainer" v-loading="loading">
    <div style="width: 100%; height: 100%;position:relative">
      <UCMap ref="ucMap"></UCMap>
      <!-- 右侧控制端 -->
      <UCBaseLayerSwitch
        class="baseLayerSwitch"
        ref="ucBaseLayerSwitch"
      ></UCBaseLayerSwitch>

      <!-- 比例尺，经纬度 -->
      <UCCustomMapScale
        ref="ucCustomMapScale"
        class="divScale"
      ></UCCustomMapScale>
    </div>

    <!-- 工具条 -->
    <UCMapTool
      ref="ucMapTool"
      class="mapTool"
    ></UCMapTool>
  </div>
</template>

<script>
import UCMap from "../components/mainMap/UCMap.vue";
import { UCMainEventManager } from "./UCMainJs.js";
import UCMapTool from "../common/mapTool.vue";
import { MapTools } from "../common/maptoolJs.js";

import UCBaseLayerSwitch from "./baseLayerSwitch/UCBaseLayerSwitch.vue";
import UCCustomMapScale from "./customMapControls/UCCustomMapScale.vue";

export default {
  name: "ucMain",
  components: {
    UCMap,
    UCMapTool,
    UCBaseLayerSwitch,
    UCCustomMapScale,
  },
  props: {},
  data() {
    return {
      loading: false,
      checkTheme: "1",
      iflegend: false,
    };
  },
  methods: {

    init() {
      if (this.$refs.ucMap) {
        let mapOptions = {
          indoor: false,
          projection: "EPSG:4326",
        };
        this.$refs.ucMap.init(mapOptions, false);
      }
      let toolFlag = [];
      this.$refs.ucMapTool.init(toolFlag);
      this._initEvents();
    },

    /**
     * 初始化事件
     */
    _initEvents() {
      this.eventManager = new UCMainEventManager();
      this.eventManager.ucMain = this;
      this.eventManager.ucMap = this.$refs.ucMap;
      this.eventManager.ucMapTool = this.$refs.ucMapTool;
      this.eventManager.ucBaseLayerSwitch = this.$refs.ucBaseLayerSwitch;
      this.eventManager.ucCustomMapScale = this.$refs.ucCustomMapScale;
      this.eventManager.addListener();
    },
  },

  mounted() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
.imgBox {
  width: 280px;
  position: absolute;
  left: 10px;
  bottom:60px;
}
.divContainer {
  width: 100%;
  height: 100%;
  position: relative;

  .divLeftFloat {
    width: 460px;
    position: absolute;
    left: 20px;
    top: 20px;
    height: calc(100% - 60px);
  }

  .mapTool {
    position: absolute;
    left: 10px;
    top: 20px;
  }
  .baseLayerSwitch {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .divScale {
    position: absolute;
    left: 10px;
    bottom: 10px;
    background: rgba(255, 255, 255, 1);
    padding: 10px;
  }
}
</style>