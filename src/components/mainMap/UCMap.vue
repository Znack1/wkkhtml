<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-17 13:52:03
 * @LastEditTime: 2023-05-18 21:45:27
 * @LastEditors: zkc
 -->
<!--  -->
<template>
  <div class="div_map">
    <div
      id="map"
      class="div_map"
    ></div>

  <UCMapOverlay ref="ucOverlay" v-show="false"></UCMapOverlay>

  </div>

</template>


<script>
import { LayerManager } from "./layer/LayerManager.js";
import { OLMapUtility } from "../../utility/ol/OLMapUtility.js";
import {DrawGeometryUtility } from "../../utility/ol/DrawGeometryUtilityJs.js";
import { GeometryUtility } from '../../utility/ol/GeometryUtility.js'
import { UCMapEvent } from "./UCMapJs.js";
import UCMapOverlay from "./UCMapOverlay.vue";

export default {
  name: "UCMap",

  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100vh"
    }
  },

  data() {
    return {
      curMap: null,

      //图层管理
      layerMgr: null,

      currentMapLevel: -1
    };
  },

  components: { 
    UCMapOverlay
    
    // UCPhotoDialog 
  },

  computed: {},

  mounted() {},

  methods: {
    //初始化
    init(mapOptions, showMapControl) {
      // 
      this.layerMgr = new LayerManager();
      //初始化底图配置
      this.layerMgr.initBaseLayerConfig();

      let newMapControl = new EzMap("map", mapOptions);

      if (showMapControl) {
        newMapControl.showMapControl();
      }

      this.curMap = newMapControl;

      this.layerMgr.currentMap = this.curMap;
      // this.layerMgr.ucMapOverLay = this.$refs.ucOverlay;
      this.layerMgr.init();
      this.layerMgr.addLayers();
      debugger
      this.$refs.ucOverlay.curMap = this.curMap;
      this.$refs.ucOverlay.init();

      this._initEvents();
    },

    cl(){
       this.curMap.changeDragMode(
                'measureArea',
                function (callbackData) {
                    
                    self.isOpenTool = false;
                    // self.mapTool = false;
                    // self.mapToolOpen = false;
                }
            );
    },

    /**
     * 地图单击
     */
    on_mapClick(callback) {
      if (callback) {
        this.curMap.on("singleclick", callback);
      }
    },

    /**
     * 地图双击
     */
    on_mapDBClick(callback) {
      if (callback) {
        this.curMap.on("dblclick", callback);
      }
    },

    /**
     * 地图右键
     */
    on_rightClick(callback) {
      let viewPort = this.curMap.getViewport();
      viewPort.addEventListener("contextmenu", callback);
    },

    on_mapPointerMove(callback) {
      if (callback) {
        this.curMap.on("pointermove", callback);
      }
    },

    on_zoomLevelChange(callback) {
      if (callback) {
        this.$on(UCMapEvent.UCMap_event_zoomlevelChange, callback);
      }
    },

    on_moveend(callback) {
      if (callback) {
        this.curMap.on("moveend", callback);
      }
    },

    /**
     * 全屏
     */
    fullscreen() {
      let divElement = document.getElementById("map");

      if (divElement.requestFullscreen) {
        divElement.requestFullscreen();
      } else if (divElement.mozRequestFullScreen) {
        divElement.mozRequestFullScreen();
      } else if (divElement.webkitRequestFullscreen) {
        divElement.webkitRequestFullscreen();
      } else if (divElement.msRequestFullscreen) {
        divElement.msRequestFullscreen();
      }
    },

    /**
     * 退出全屏
     */
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },

    //获取地图
    getMap() {
      return this.curMap;
    },

    /**
     * 获取分辨率
     */
    getResolution() {
      return this.curMap.getView().getResolution();
    },

    setCenter(zoom, centerPnt) {
      this.curMap.getView().setZoom(zoom);
      this.curMap.getView().setCenter(centerPnt);
    },

    getCenter() {
      return this.curMap.getView().getCenter();
    },

    setMapExtent(mapExtent) {
      let mapView = this.curMap.getView();
      mapView.fit(mapExtent, {
        nearest: true,
        duration:1000
      });
    },

    setZoomLevel(level) {
      let mapView = this.curMap.getView();
      mapView.setZoom(level);
    },

    plusZoomLevel() {
      
      let zoomLevel = this.getZoomLevel();
      let plusLevel = zoomLevel + 1;
      this.setZoomLevel(plusLevel);
    },

    plusZoomLevelEx(plusNumber) {
      let zoomLevel = this.getZoomLevel();
      let plusLevel = zoomLevel + plusNumber;
      this.setZoomLevel(plusLevel);
    },

    subtractionZoomLevel() {
      let zoomLevel = this.getZoomLevel();
      let subtractionLevel = zoomLevel - 1;
      this.setZoomLevel(subtractionLevel);
    },

    //获取地图范围
    getMapExtent() {
      let mapView = this.curMap.getView();
      let curMapSize = this.curMap.getSize();
      let mapExtent = mapView.calculateExtent(curMapSize);
      return mapExtent;
    },

    getZoomLevel() {
      let mapView = this.curMap.getView();
      let zoomLevel = mapView.getZoom();
      return zoomLevel;
    },

    getProjectionCode() {
      let projectCode = OLMapUtility.getProjectionCode(this.curMap);
      return projectCode;
    },

    showOverlay(overlayInfo) {
      if (this.$refs.ucOverlay) {
        this.$refs.ucOverlay.showOverlay(overlayInfo);
      }
    },

     showOverlayEx(overlayInfo) {
      if (this.$refs.ucOverlay) {
        this.$refs.ucOverlay.showOverlayEx(overlayInfo);
      }
    },

    showOverlays(overlayInfos) {
      if (this.$refs.ucOverlay) {
        this.$refs.ucOverlay.showOverlays(overlayInfos);
      }
    },

    clearOverlays() {
      if (this.$refs.ucOverlay) {
        this.$refs.ucOverlay.clearOverlays();
      }
    },


    // 点击弹框的详情按钮
    on_ucOverlay_moreClickHandle(callback){
        if(callback){
          this.$refs.ucOverlay.on_ucAttribute_moreClickHandle(callback);
        }
    },

     /**
     *  画图形  isClear 是否清空地图 boolean
     */
    drawRange(type, isClearMap) {
      let self = this;
      let drawUtil = new DrawGeometryUtility();
      drawUtil.curMap = this.curMap;
      if (isClearMap) {
        self.layerMgr.clear();
      }

      /** 执行画结束回到*/
      drawUtil.draw(type, function (drawItem) {
        let mapCode = self.getProjectionCode();
        if (mapCode !== drawItem.crsCode) {
          drawItem.coordinates = GeometryUtility.transformPoints(
            drawItem.coordinates,
            drawItem.crsCode,
            mapCode
          );
        }
        self.$emit(UCMapEvent.UCMap_event_drawFinish,drawItem);
      });
    },

      /**
     * 画图结束去掉工具高亮
     */
    on_drawRange(callback) {
      if (callback) {
        this.$on(UCMapEvent.UCMap_event_drawFinish, callback);
      }
    },

    _initEvents() {
      let self = this;

      this.curMap.on("moveend", function() {
        let curZoomLevel = self.curMap.getView().getZoom();
        if (curZoomLevel != self.currentMapLevel) {
          self.$emit(UCMapEvent.UCMap_event_zoomlevelChange, curZoomLevel);
        }
        self.currentMapLevel = curZoomLevel;
      });

    }

  
  }
};
</script>

<style lang="less" scoped>
.div_map {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // background: #0f1467;
  background: #f6f6f4;
}
</style>
