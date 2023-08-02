<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2021-03-23 15:57:10
 * @LastEditors: zkc
 * @LastEditTime: 2023-08-02 09:17:48
 * @input: no param
 * @out: no param
-->
<!--  -->
<template>
  <div id="divMapOverlay">
    <UCStatisticsOverlay ref="ucStatOverlay"></UCStatisticsOverlay>
  </div>
</template>

<script>
import {
  MapOverlayType,
  OverlayLayoutInfo,
  StatisticsOverlayInfo,
} from "./UCMapOverlayJs";
import UCStatisticsOverlay from "./UCOverlayTemplate/UCStatisticsOverlay.vue";
import { SystemConfig } from '../../config/SystemConfig'
export default {
  name: "UCMapOverlay",
  data() {
    return {
      curMap: null,
      overlayInfo: null,
    };
  },

  components: {
    UCStatisticsOverlay,
  },

  computed: {},

  mounted() {
    // this.$refs.ucAttriInfos.on_canelPanel(()=>{
    //   this.clearOverlays();
    // })
  },

  methods: {
    init() {},

    on_showDetail(callback){
      if(this.$refs.ucStatOverlay){
        this.$refs.ucStatOverlay.on_more(callback)
      }
    
    },

    showOverlay(overlayInfo) {
      let self = this;
      if (!overlayInfo) return;
      self.overlayInfo = overlayInfo;
      if (overlayInfo.type == MapOverlayType.featureAttriInfo) {
        let info = new StatisticsOverlayInfo();
        info.id = overlayInfo.properties.gid;
        info.title = overlayInfo.properties.mc;
        info.getAttributesAndAttachments(
          overlayInfo.properties,
          overlayInfo.showFields
        );

        self._initAttriAndPhotosCallbackHandler(overlayInfo.position, info);
      }
    },

    // 点击详情
    _initAttriAndPhotosCallbackHandler(position, objectInfo) {
      let divMapOverlayElement = document.getElementById("divMapOverlay");

      if (!this.$refs.ucStatOverlay) {
        this.clearOverlays('countOverlay',false);
      }

      // 无属性则不显示
      if (
        objectInfo.attributes.length == 0 &&
        objectInfo.videos.length == 0 &&
        objectInfo.photos.length == 0
      ) {
        return;
      }

      let overlayLayout = this._createOverlayLayout();

      divMapOverlayElement.append(overlayLayout.divElement);

      //新建overlay
      overlayLayout.ucOverlay = new ol.Overlay({
        //设置弹出框的容器
        element: overlayLayout.divElement,
        //是否自动平移，即假如标记在屏幕边缘，弹出时自动平移地图使弹出框完全可见
        autoPan: true,
        autoPanMargin: 100,
        positioning: "center-right",
      });

      let self = this;

      this.$refs.ucStatOverlay.init(objectInfo, function () {
        overlayLayout.contentElement.appendChild(self.$refs.ucStatOverlay.$el); // = innerHtml;

        //设置overlay的显示位置
        overlayLayout.ucOverlay.setPosition(position);
        self.curMap.addOverlay(overlayLayout.ucOverlay, true);

        // 使弹框居中
        debugger
        let extent = self.curMap.getView().calculateExtent(self.curMap.getSize());
        let perPixe =   (200 / SystemConfig.bodyHeight * (extent[3] - extent[1]));
        let perPixeEx =   (150 / SystemConfig.bodyWidth * (extent[2] - extent[0]));
        self.curMap.getView().setCenter([position[0] + perPixeEx,position[1] + perPixe])
      });
    },

    /**
     * 清除地图所有overlays
     */
    clearOverlays(overType,boolean) {
      let overlayCollections = this.curMap.getOverlays();
      let overlays = new Array();
      if (overlayCollections) {
        overlays = overlayCollections.getArray();
      }
     
      let tempOverlay = null;
      for (let tempIndex = 0; tempIndex < overlays.length; tempIndex++) {
        tempOverlay = overlays[tempIndex];
        let properties = tempOverlay.get("overlyType")
        if(overType && boolean){
           if(properties == overType){
            this.curMap.removeOverlay(tempOverlay);
            tempIndex = tempIndex - 1;
           }
        }else if(overType && !boolean){
          if(properties != overType){
            this.curMap.removeOverlay(tempOverlay);
            tempIndex = tempIndex - 1;
           }
        }else{
          this.curMap.removeOverlay(tempOverlay);
          tempIndex = tempIndex - 1;
        }
       
      }
    },

    /**
     * 创建overlay
     */
    _createOverlayLayout() {
      let overlayInfo = new OverlayLayoutInfo();

      let closeElement = document.createElement("a");
      closeElement.id = overlayInfo.closeId;
      closeElement.classList.add("ol-overlay-popup-closer");

      closeElement.addEventListener("click", function () {
        if (overlayInfo.ucOverlay) {
          overlayInfo.ucOverlay.setPosition(undefined);
        }
      });

      let contentElement = document.createElement("div");
      contentElement.id = overlayInfo.contentId;

      let newDiv = document.createElement("div");
      newDiv.id = overlayInfo.popupId;
      newDiv.classList.add("ol-overlay-popup");
      newDiv.appendChild(closeElement);
      newDiv.appendChild(contentElement);

      overlayInfo.divElement = newDiv;
      overlayInfo.contentElement = contentElement;
      overlayInfo.closeAElement = closeElement;

      return overlayInfo;
    },
  },
};
</script>


<style lang="less">
.ol-overlay-popup {
  position: absolute;
  background-color: rgba(255, 255, 255, 1);
  -webkit-filter: drop-shadow(0 1px 4px rgba(255, 255, 255, 1));
  filter: drop-shadow(0 1px 4px rgba(255, 255, 255, 1));
  // border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 360px;
  max-width: 400px;
  z-index: 20;
  border-radius: 0;
  // padding-bottom: 24px;
}

.ol-overlay-popup:after,
.ol-overlay-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.ol-overlay-popup:after {
  border-top-color: rgba(255, 255, 255, 1);
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}

.ol-overlay-popup:before {
  border-top-color: rgba(255, 255, 255, 1);
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}

.ol-overlay-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 0px;
  right: 8px;
  // display: none;
}

.ol-overlay-popup-closer:after {
  content: "X";
  color: #fdfdfd;
  top: 10px;
  position: absolute;
  right: 2px;
  font-size: 14px;
}
</style>