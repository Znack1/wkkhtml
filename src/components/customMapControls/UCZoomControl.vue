<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 20:22:22
 * @LastEditTime: 2023-06-08 22:16:50
 * @LastEditors: zkc
 -->
<!--  -->
<template>
  <div class="tdt-bottom tdt-right">
    <div
      class="tdt-control-zoom tdt-bar tdt-control"
    >
      <!-- <div class="zoom_number" @dblclick="_zoomLevelDblclickHandler">{{zoomLevel}}</div> -->
      <div class="zoom-btn1" @click="_showLegend">
        <i class="iconfont icon-tuceng"></i>
      </div>
      <div class="zoom-btn" @click="_zoomInClickHandler">
        <i class="add-map"></i>
      </div>
      <div class="zoom-btn" @click="_zoomOutClickHandler">
        <i class="lessen-map"></i>
      </div>
      <!-- <a @click="_zoomInClickHandler" title="放大" class="zoom-btn">+</a>
      <a @click="_zoomOutClickHandler" title="缩小" class="zoom-btn">-</a>-->
    </div>
  </div>
</template>

<script>
import { UCZoomControlEvent } from "./UCZoomControlJs.js";

export default {
  name: "UCZoomControl",
  data() {
    return {
      zoomLevel: 12
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    init() {},

  

    on_showLegend(callback) {
      if (callback) {
        this.$on(
          UCZoomControlEvent.UCZoomControl_event_showLegend,
          callback
        );
      }
    },

    on_zoomInClick(callback) {
      if (callback) {
        this.$on(UCZoomControlEvent.UCZoomControl_event_zoomInClick, callback);
      }
    },

    on_zoomOutClick(callback) {
      if (callback) {
        this.$on(UCZoomControlEvent.UCZoomControl_event_zoomOutClick, callback);
      }
    },

    _showLegend() {
      this.$emit(UCZoomControlEvent.UCZoomControl_event_showLegend);
    },

    _zoomInClickHandler() {
      this.$emit(UCZoomControlEvent.UCZoomControl_event_zoomInClick);
    },

    _zoomOutClickHandler() {
      this.$emit(UCZoomControlEvent.UCZoomControl_event_zoomOutClick);
    }
  }
};
</script>
<style lang="less" scoped>
.tdt-control-zoom .zoom_number {
  border: 1px solid #000;
  background: #000;
  color: #fff;
  opacity: 0.7;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
}

.tdt-bar {
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
}



.zoom-btn {
      position: relative;
    z-index: 8;
    cursor: pointer;
    background: rgba(255, 255, 255, 1);
    border-bottom: 1px solid rgb(0, 0, 0);
  i {
    background: url("../../assets/images/icon.png");
    background-position: -295px -212px;
    width: 20px;
    height: 20px;
    display: inline-block;
    margin: 4px;
  }
 
  .add-map {
    background-position: -0px -150px;
    width: 20px;
    height: 20px;
    display: inline-block;
    margin: 4px;
  }
  .lessen-map {
    background-position: -23px -150px;
    width: 20px;
    height: 20px;
    display: inline-block;
    margin: 4px;
  }
}
.zoom-btn1{
    cursor: pointer;
    background: rgba(255, 255, 255, 1);
    border-bottom: 1px solid rgb(0, 0, 0);
  i {
    width: 20px;
    height: 20px;
    display: inline-block;
    margin: 4px;
    font-size:18px;
    line-height: 20px;
  }
  }
</style>