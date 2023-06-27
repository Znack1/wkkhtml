<!--
 * @Author: your name
 * @Date: 2019-11-25 10:36:56
 * @LastEditTime: 2022-11-16 14:45:21
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: \source\src\components\onlineMap\customMapControls\CustomMapBottomLeft.vue
 -->
<!--  -->
<template>
  <div class="tdt-bottom tdt-left">

    <div
      v-if="curX&&curY"
      id="lnglatControl"
      style="white-space: nowrap;float:left;font-size: 11px;color:#323232;"
    >经度：{{curX}}&nbsp;&nbsp;纬度：{{curY}}</div>
    <div
      class="tdt-control-scale tdt-control"
      style="color: rgb(0, 0, 0);"
    >
      <div
        class="tdt-control-scale-line"
        :style="{width: scalePixelsDesc}"
      >
        <div class="tdt-control-scale-m">{{scaleDesc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UCCustomMapScale",
  data() {
    return {
      curX: 0,

      curY: 0,

      curDpi: 0,

      //一度代表多少米
      degreeToMeter: 111319.491,

      //比例尺描述
      scaleDesc: null,

      //比例尺像素数
      scalePixelsDesc: 0
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    /**
     * 刷新坐标
     */
    refreshCoordinate(coordinate) {
      if (!coordinate) return;
      this.curX = coordinate[0].toFixed(4);
      this.curY = coordinate[1].toFixed(4);
    },

    /**
     * 刷新比例尺
     */
    refreshScale(resolution) {
      if (!this.curDpi) {
        let dpiArray = this.getScreenDPI();
        if (dpiArray && dpiArray.length > 0) {
          this.curDpi = dpiArray[0];
        }
      }

      //为适应控件显示大小，扩张的比例
      let expandScale = 1;
      //图上一厘米有多少像素
      let pixelCounts = Math.round((0.01 / 0.0254) * this.curDpi);
      if (pixelCounts < 50) {
        expandScale = 2;
      } else if (pixelCounts > 100) {
        expandScale = 0.8;
      }

      //图上一厘米代表实际多少米
      let scale =
        (0.01 / 0.0254) *
        this.curDpi *
        resolution *
        this.degreeToMeter *
        expandScale;
      if (scale > 1000) {
        this.scaleDesc = (scale / 1000).toFixed(2) + "公里";
      } else {
        this.scaleDesc = Math.round(scale) + "米";
      }

      this.scalePixelsDesc = Math.round(pixelCounts * expandScale) + "px";
    },

    getScreenDPI() {
      let arrDPI = new Array();
      if (window.screen.deviceXDPI != undefined) {
        arrDPI[0] = window.screen.deviceXDPI;
        arrDPI[1] = window.screen.deviceYDPI;
      } else {
        let tmpNode = document.createElement("DIV");
        tmpNode.style.cssText =
          "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
        document.body.appendChild(tmpNode);
        arrDPI[0] = parseInt(tmpNode.offsetWidth);
        arrDPI[1] = parseInt(tmpNode.offsetHeight);
        tmpNode.parentNode.removeChild(tmpNode);
      }
      return arrDPI;
    }
  }
};
</script>

<style lang="less" scoped>
.tdt-left {
 
}

.tdt-bottom {
  position: absolute;
  z-index: 1500;
  pointer-events: none;
}

.tdt-bottom .tdt-control-scale {
  color: #323232;
    float: left;
    margin-left: 20px;
    margin-top: 10px;
}

.tdt-control-scale {
  font-size: 11px;
  margin-left: 5px;
  color:#323232
}

.tdt-control-scale-line {
  border: 2px solid #000;
  border-top: none;
  line-height: 1.1;
  padding: 2px 5px 1px;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.tdt-control-scale-m {
  position: absolute;
  top: 5px;
  color:#323232;
}

.tdt-control-scale-m {
  font-size: 11px;
  line-height: 1.2;
  white-space: nowrap;
}
</style>