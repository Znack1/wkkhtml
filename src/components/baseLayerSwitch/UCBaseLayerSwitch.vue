<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-01 15:44:44
 * @LastEditTime: 2022-11-16 14:34:57
 * @LastEditors: zkc
 -->


<!--  -->
<template>
  <div>
      
      <div class="curLayerType">
        <a class="layer-item">
          <div :class="curLayerTypeClass" @click="_switchLayerClickHandler"></div>
          <span class="layer-tip">{{ curLayerTypeAlias }}</span>
        </a>
      </div>
      

      <div v-show="ucSetting.layerSwitchVisible" class="layer-pop">
        <div class="layer_container"></div>
        <div class="layer-items">
          <a class="layer-item">
            <div class="layer_img_bg" @click="_switchImageLayerClickHandler"></div>
            <span class="layer-tip">影像</span>
          </a>
          <a class="layer-item">
            <div class="layer_vector_bg" @click="_switchVectorLayerClickHandler"></div>
            <span class="layer-tip">地图</span>
          </a>
          <a class="layer-item">
            <div class="layer_ter_bg" @click="_switchTerLayerClickHandler"></div>
            <span class="layer-tip">地形</span>
          </a>
        </div>
      </div>
  </div>
</template>

<script>
import { MapBaseLayerType } from "../mainMap/layer/MapBaseLayer";
import { UCBaseLayerSwitchEvent } from "./UCBaseLayerSwitchJs.js";

export default {
  name: "UCBaseLayerSwitch",
  data() {
    return {
      curLayerTypeClass: '',
      curLayerTypeAlias: '',
      curLayerType: window.BASE_CONFIG.DefaultMapBaseLayerType,
      ucSetting: {
        layerSwitchVisible: false,

      }
    };
  },

  components: {
   
  },

  computed: {},

  mounted() {
    this._getInitSetting(this.curLayerType)
    this._initEvent();
  },

  methods: {

    // 获取初始化类型
    _getInitSetting(type){
      switch (type) {
        case MapBaseLayerType.Vector:
          this.curLayerTypeAlias = "矢量"
          this.curLayerTypeClass = 'layer_vector_bg'
          break;
        case MapBaseLayerType.Image:
          this.curLayerTypeAlias = "影像"
          this.curLayerTypeClass = 'layer_img_bg'
          break;
        case MapBaseLayerType.Ter:
          this.curLayerTypeAlias = "地形"
          this.curLayerTypeClass = 'layer_ter_bg'
          break;
      }
    },

    on_switchVectorClick(callback) {
      if (callback) { 
        
        this.$on(
          UCBaseLayerSwitchEvent.UCBaseLayerSwitch_vector_click,
          callback
        );
      }
    },

    on_switchImageClick(callback) {
      if (callback) {
        this.$on(
          UCBaseLayerSwitchEvent.UCBaseLayerSwitch_image_click,
          callback
        );
      }
    },

    on_switchTerClick(callback) {
      if (callback) {
        this.$on(UCBaseLayerSwitchEvent.UCBaseLayerSwitch_ter_click, callback);
      }
    },

    _switchVectorLayerClickHandler() {
      this.ucSetting.layerSwitchVisible = !this.ucSetting.layerSwitchVisible;
      this._getInitSetting(MapBaseLayerType.Vector);
      this.$emit(UCBaseLayerSwitchEvent.UCBaseLayerSwitch_vector_click);
    },

    _switchTerLayerClickHandler() {
      this.ucSetting.layerSwitchVisible = !this.ucSetting.layerSwitchVisible;
      this._getInitSetting(MapBaseLayerType.Ter);
      this.$emit(UCBaseLayerSwitchEvent.UCBaseLayerSwitch_ter_click);
    },

    _switchImageLayerClickHandler() {
      this.ucSetting.layerSwitchVisible = !this.ucSetting.layerSwitchVisible;
      this._getInitSetting(MapBaseLayerType.Image);
      this.$emit(UCBaseLayerSwitchEvent.UCBaseLayerSwitch_image_click);
    },

    _switchLayerClickHandler() {
      this.ucSetting.layerSwitchVisible = !this.ucSetting.layerSwitchVisible;
      this.ucSetting.legendVisible = false;
      this.ucSetting.listVisiable = false;
    },

    _resetLayerClickHandler() {
      this.$emit(UCBaseLayerSwitchEvent.UCBaseLayerSwitch_reset_click);
    },

    _initEvent(){
      let self = this;
    },

  }
};
</script>
<style lang="less" scoped>
.curLayerType{
    font-size: 13px;
}
.layer-pop {
  position: absolute;
  z-index: 9;
  right: 80px;
  bottom: 0px;
  background: rgba(255, 255, 255, 1);
  border-radius: 3px;
  font-size: 13px;
  border: 10px solid rgba(240, 240, 240, 0.6);
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.15);

  .layer_container {
    position: relative;
  }
  .layer-items {
    white-space: nowrap;
    position: relative;
  }

  
}
.layer-item {
  width: 68px;
  height: 63px;
  display: inline-block;
  text-align: center;
  line-height: 20px;
  color: #333;
  position: relative;
  cursor: pointer;
}
.layer-tip {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  //   margin-left: 10px;
}

.layer_vector_bg {
  background: url("../../assets/images/icon.png") rgba(0, 0, 0, 0.6);
  width: 68px;
  height: 63px;
  background-position: -240px -53px;
}

.layer_ter_bg {
  background: url("../../assets/images/icon.png") rgba(0, 0, 0, 0.6);
  width: 68px;
  height: 63px;
  background-position: -84px -53px;
}

.layer_img_bg {
  background: url("../../assets/images/icon.png") rgba(0, 0, 0, 0.6);
  width: 68px;
  height: 63px;
  background-position: -163px -53px;
}
.active{
  color:rgb(16, 117, 233)
}
</style>
