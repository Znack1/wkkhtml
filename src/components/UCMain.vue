<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2022-07-26 17:27:22
 * @LastEditors: zkc
 * @LastEditTime: 2023-06-06 10:01:10
 * @input: no param
 * @out: no param
-->
<template>
  <div class="divContainer" v-loading="loading">
      <LeftMenu ref="ucLeftMenu" class="leftpanel"></LeftMenu>

      <UCMap ref="ucMap"></UCMap>
      <!-- 右侧控制端 -->
      <UCBaseLayerSwitch
        class="baseLayerSwitch"
        ref="ucBaseLayerSwitch"
        :style="{ right: ucSetting.rightPanelVisiable ? '410px' : '10px' }"
      ></UCBaseLayerSwitch>

      <!-- 比例尺，经纬度 -->
      <UCCustomMapScale
        ref="ucCustomMapScale"
        class="divScale"
      ></UCCustomMapScale>
      <div
        class="close_btn"
        @click="_togglePanel"
        :style="{ right: ucSetting.rightPanelVisiable ? '400px' : '0px' }"
      >
        {{ ucSetting.rightPanelVisiable ? "关闭列表" : "展开列表" }}
      </div>
      <UCRightFloatComponent
        :style="{ right: ucSetting.rightPanelVisiable ? '0px' : '-400px' }"
        class="divRightLeftFloat"
        ref="ucRightFloatComponent"
      >
      </UCRightFloatComponent>

      <!-- 工具条 -->
      <UCMapTool ref="ucMapTool" class="mapTool"></UCMapTool>
      <div class="div_exportBtn">
        <el-dropdown @command="handleCommand">
          <el-button type="primary" size="small">
            {{ curStat.name }}  
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in statTypes" :key="item.value" :command="item.value">{{ item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
  </div>
</template>

<script>
import UCMap from "../components/mainMap/UCMap.vue";
import { UCMainEventManager } from "./UCMainJs.js";
import UCMapTool from "../common/mapTool.vue";
import { MapTools } from "../common/maptoolJs.js";
import LeftMenu from "../components/mainMenu/leftMenu.vue";
import UCBaseLayerSwitch from "./baseLayerSwitch/UCBaseLayerSwitch.vue";
import UCCustomMapScale from "./customMapControls/UCCustomMapScale.vue";
import UCRightFloatComponent from "./rightPanel/UCRightFloatComponent.vue";
export default {
  name: "ucMain",
  components: {
    UCMap,
    UCMapTool,
    UCBaseLayerSwitch,
    UCCustomMapScale,
    UCRightFloatComponent,
    LeftMenu,
  },
  props: {},
  data() {
    return {
      loading: false,
      curStat:{
        name:"行政区划",
        value:'district',
        defalutHeader:[
			{name:'排名',props:'',width:80},
			{name:'区域',props:'area',width:120}
		]
      }, // 当前统计类型
      statTypes:window.BASE_CONFIG.statTypes, // 统计类型
      ucSetting: {
        rightPanelVisiable: true,
      },
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
      let toolFlag = [
        MapTools.mapEventCode.District,
        MapTools.mapEventCode.River,
        MapTools.mapEventCode.DrawPolygon,
        MapTools.mapEventCode.Location,
        MapTools.mapEventCode.MeasureLine,
        MapTools.mapEventCode.MeasureArea,
        MapTools.mapEventCode.ClearMap
      ];
      this.$refs.ucMapTool.init(toolFlag);
      this._initEvents();
    },

    // 切换面板显隐
    _togglePanel() {
      this.ucSetting.rightPanelVisiable = !this.ucSetting.rightPanelVisiable;
    },

    // 下拉菜单事件
    handleCommand(command) {
     this.curStat = _.find(this.statTypes,{"value":command})
     this.eventManager.getPageData();
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
      this.eventManager.ucLeftMenu = this.$refs.ucLeftMenu;
      this.eventManager.ucRightPanel = this.$refs.ucRightFloatComponent;
      this.eventManager.addListener();
    },
  },

  mounted() {
    if(this.statTypes.length > 0){
      this.curStat = this.statTypes[0]
    }
    this.init();
  },
};
</script>

<style lang="less" scoped>
.imgBox {
  width: 280px;
  position: absolute;
  left: 10px;
  bottom: 60px;
}

.divContainer {
  width: 100%;
  height: 100%;
  position: relative;
    .mapTool {
      position: absolute;
      left: 340px;
      top: 10px;
    }

    .leftpanel {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 320px;
      bottom: 10px;
      height: calc(100% - 20px);
    background: white;
    z-index:2
    }

    .baseLayerSwitch {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }

    .divScale {
      position: absolute;
      left: 330px;
      bottom: 10px;
      background: rgba(255, 255, 255, 1);
      padding: 10px;
    }

    .divRightLeftFloat {
      width: 400px;
      position: absolute;
      right: 10px;
      top: 10px;
      height: calc(100% - 20px);
      transition: all 0.5s;
    }

    .close_btn {
      position: absolute;
      right: 420px;
      top: 50%;
      height: 90px;
      margin-top: -45px;
      width: 16px;
      background: #3072f6;
      padding: 10px;
      box-sizing: content-box;
      color: white;
      transition: all 0.5s;
      cursor: pointer;
    }
    .div_exportBtn {
      position: absolute;
      left: 10px;
      top: 10px;
    }
}
</style>