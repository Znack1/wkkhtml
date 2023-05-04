<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2021-03-23 15:57:10
 * @LastEditors: zkc
 * @LastEditTime: 2022-11-18 15:44:51
 * @input: no param
 * @out: no param
-->
<!--  -->
<template>
  <div id="divMapOverlay">
    <UCAttriInfos ref="ucAttriInfos"></UCAttriInfos>
  </div>
</template>

<script>
import { MapOverlayType, OverlayLayoutInfo } from './UCMapOverlayJs';
import UCAttriInfos from './UCOverlayTemplate/UCAttriInfos.vue'
export default {
  name: "UCMapOverlay",
  data () {
    return {
      curMap: null,
      overlayInfo: null
    };
  },

  components: {
    UCAttriInfos
  },

  computed: {},

  mounted () {
    this.$refs.ucAttriInfos.on_canelPanel(()=>{
      this.clearOverlays();
    })
   },

  methods: {
    init () { },

    showOverlay (overlayInfo) {
      let self = this;
      if (!overlayInfo) return;
      self.overlayInfo = overlayInfo;
      if (overlayInfo.type == MapOverlayType.featureAttriInfo) {
        let resultItem = overlayInfo.feature.get("bindingObject");
        var info = {
          id: resultItem.id,
          attributes: []
        };

        _.each(resultItem, (o, k) => {
          let tempFieldItem = overlayInfo.showFields.findByName(k);
          if (tempFieldItem) {
            let attriItem = {};
            //别名
            attriItem.key = tempFieldItem.aliasName;
            attriItem.value = o;
            info.attributes.push(attriItem);
          }
        });
        self._initucAttributesCallbackHandler(overlayInfo.position, info);
      }
    },

    showOverlayEx (overlayInfo) {
      let self = this;
      if (!overlayInfo) return;
      self.overlayInfo = overlayInfo;
      if (overlayInfo.type == MapOverlayType.featureAttriInfo) {
        self._initucAttributesCallbackHandler(overlayInfo.position);
      }
    },


    // 详情点击
    _initucAttributesCallbackHandler (position, objectInfo) {
      let divMapOverlayElement = document.getElementById("divMapOverlay");

      if (!this.$refs.ucAttriInfos) {
        this.clearOverlays();
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
        positioning: "center-right"
      });

      let self = this;

      this.$refs.ucAttriInfos.init(objectInfo, function () {
        overlayLayout.contentElement.appendChild(
          self.$refs.ucAttriInfos.$el
        ); // = innerHtml;

        //设置overlay的显示位置
        overlayLayout.ucOverlay.setPosition(position);
        self.curMap.addOverlay(overlayLayout.ucOverlay, true);
      });
    },

    /**
     * 清除地图所有overlays
     */
    clearOverlays () {
      
      let overlayCollections = this.curMap.getOverlays();
      let overlays = new Array();
      if (overlayCollections) {
        overlays = overlayCollections.getArray();
      }

      let tempOverlay = null;
      for (let tempIndex = 0; tempIndex < overlays.length; tempIndex++) {
        tempOverlay = overlays[tempIndex];
        this.curMap.removeOverlay(tempOverlay);
        tempIndex = tempIndex - 1;
      }
    },

    /**
     * 创建overlay
     */
    _createOverlayLayout () {
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
  }
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
  border-radius: 10px;
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
  color: #323232;
  top: 5px;
  position: absolute;
  right: 2px;
  font-size: 18px;
}
</style>