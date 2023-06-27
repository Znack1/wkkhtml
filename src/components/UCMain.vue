<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2022-07-26 17:27:22
 * @LastEditors: zkc
 * @LastEditTime: 2023-06-27 15:12:37
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
      :style="{ right: ucSetting.rightPanelVisiable ? '10px' : '10px' }"
    ></UCBaseLayerSwitch>
    <UCZoomControl class="divZoomCon" ref="ucZoomControl"></UCZoomControl>
    <!-- 比例尺，经纬度 -->
    <UCCustomMapScale
      ref="ucCustomMapScale"
      class="divScale"
    ></UCCustomMapScale>
    <!-- <div
        class="close_btn"
        @click="_togglePanel"
        :style="{ right: ucSetting.rightPanelVisiable ? '320px' : '0px' }"
      >
        {{ ucSetting.rightPanelVisiable ? "关闭列表" : "展开列表" }}
      </div> -->
    <UCRightFloatComponent
      :style="{ right: ucSetting.rightPanelVisiable ? '0px' : '-320px' }"
      class="divRightLeftFloat"
      ref="ucRightFloatComponent"
    >
    </UCRightFloatComponent>

    <!-- 工具条 -->
    <UCMapTool ref="ucMapTool" class="mapTool"></UCMapTool>

    <!-- 图例 -->
    <div v-show="showLegend" class="legendBox">
      <div v-for="node in checkedNodes" :key="node.id" class="legendItem">
        <img
          style="margin-right: 5px"
          :src="node.img"
          width="18px"
          height="18px"
        />
        <span>{{ node.name }}</span>
      </div>
    </div>

    <UCPhotoDialog ref="ucPhotoDialog"></UCPhotoDialog>
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
import UCZoomControl from "./customMapControls/UCZoomControl.vue";
import UCRightFloatComponent from "./rightPanel/UCRightFloatComponent.vue";
import { DialogSystemJs } from "../common/dialogSystemJs";
import UCPhotoDialog from "../utility/ui/dialog/UCPhotoDialog.vue"
import {
  LayerCatalogItem,
  LayerCatalogItemType,
  VectorTileLayerItem,
  WmsLayerItem,
  WmtsLayerItem,
} from "@/model/LayerCatalogItem";
export default {
  name: "ucMain",
  components: {
    UCMap,
    UCMapTool,
    UCBaseLayerSwitch,
    UCCustomMapScale,
    UCRightFloatComponent,
    LeftMenu,
    UCZoomControl,
    UCPhotoDialog
  },
  props: {},
  data() {
    return {
      showLegend: false, // 是否显示图例
      loading: false,
      checkedNodes: [], // 当前图例数据
      curStat: {
        name: "行政区划",
        value: "district",
        defalutHeader: [
          { name: "排名", props: "", width: 80 },
          { name: "区域", props: "area", width: 120 },
        ],
      }, // 当前统计类型
      statTypes: window.BASE_CONFIG.statTypes, // 统计类型
      ucSetting: {
        rightPanelVisiable: true,
      },
      showTempLayerItem: new LayerCatalogItem(),
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

       // 初始化dialog
       DialogSystemJs.ucOpenDialog = this.$refs.ucPhotoDialog;
      this._initEvents();
      let toolFlag = [
        MapTools.mapEventCode.District,
        MapTools.mapEventCode.River,
        // MapTools.mapEventCode.DrawPolygon,
        // MapTools.mapEventCode.Location,
        MapTools.mapEventCode.MeasureLine,
        MapTools.mapEventCode.MeasureArea,
        MapTools.mapEventCode.ClearMap,
      ];
      this.$refs.ucMapTool.init(toolFlag, MapTools.mapEventCode.District);
      if (this.statTypes.length > 0) {
        this.curStat = this.statTypes[0];
        this.addLayerByUrl(this.curStat);
      }
    },

    // 切换面板显隐
    _togglePanel() {
      this.ucSetting.rightPanelVisiable = !this.ucSetting.rightPanelVisiable;
    },

    // 下拉菜单事件
    handleCommand(command) {
      this.curStat = _.find(this.statTypes, { value: command });
      this.addLayerByUrl(this.curStat);
      this.eventManager.getPageData();
    },

    // 添加流域或者行政区划服务
    addLayerByUrl(curStat) {
      if(this.showTempLayerItem){
        this.showTempLayerItem.defaultVisible = false;
        this.eventManager._changeLayerItemVisible(this.showTempLayerItem,false)
      }
      let layerItemObj = curStat.service;
      if (layerItemObj.type === LayerCatalogItemType.vectorTile) {
        this.showTempLayerItem = VectorTileLayerItem.fronJson(layerItemObj);
      } else if (layerItemObj.type === LayerCatalogItemType.wfs) {
      } else if (layerItemObj.type === LayerCatalogItemType.wmts) {
        this.showTempLayerItem = WmtsLayerItem.fromJson(layerItemObj);
      } else if (layerItemObj.type === LayerCatalogItemType.wms) {
        this.showTempLayerItem = WmsLayerItem.fromJson(layerItemObj);
      }
      this.showTempLayerItem.defaultVisible = true;
      this.eventManager._changeLayerItemVisible(this.showTempLayerItem,true)

    },

    removeLayers(curMap) {
      if (!curMap) return;

      if (!this.olLayers || this.olLayers.length == 0) return;

      let layerArray = curMap.getLayers();

      let olVtLayer = null;
      let findItem = null;
      for (let tempIndex = 0; tempIndex < this.olLayers.length; tempIndex++) {
        olVtLayer = this.olLayers[tempIndex];
        if (!olVtLayer) continue;
        findItem = OLLayerUtility.findByUID(
          layerArray.getArray(),
          olVtLayer.ol_uid
        );
        if (findItem) {
        }
      }
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
      this.eventManager.ucZoomControl = this.$refs.ucZoomControl;
      this.eventManager.ucRightPanel = this.$refs.ucRightFloatComponent;
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
    border-radius: 21px;
    padding: 5px 10px;
    background: rgba(0, 0, 0, 0.4);
  }

  .leftpanel {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 320px;
    bottom: 10px;
    height: calc(100% - 20px);
    background: white;
    z-index: 2;
  }

  .baseLayerSwitch {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .divScale {
    position: absolute;
    left: 340px;
    bottom: 10px;
    background: rgba(255, 255, 255, 1);
    padding: 10px;
  }

  .divRightLeftFloat {
    width: 320px;
    position: absolute;
    right: 10px;
    top: 10px;
    height: calc(100% - 100px);
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
  .divZoomCon {
    position: absolute;
    left: 340px;
    bottom: 60px;
  }

  .legendBox {
    position: absolute;
    bottom: 60px;
    left: 375px;
    padding: 15px;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    background: #fff;
    border-radius: 10px;
    flex-direction: column;
    .legendItem {
      margin-bottom: 5px;
    }
  }
}
</style>