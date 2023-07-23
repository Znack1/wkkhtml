<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2021-03-24 17:08:40
 * @LastEditors: zkc
 * @LastEditTime: 2023-07-22 11:13:20
 * @input: no param
 * @out: no param
-->

<template>
  <div class="mapTool">
    <i
      :title="toolItem.name"
      class="iconfont editMapBtn"
      :class="[toolItem.icon, toolItem.active ? 'active' : '']"
      @click="_toolClicked(toolItem)"
      v-show="toolItem.show"
      v-for="(toolItem, toolItemIndex) in mapTools"
      :key="toolItemIndex"
    >{{ toolItem.name }}</i>

  </div>
</template>

<script>
import { commonEvent } from "./commonEvent.js";
import { MapTools } from "./maptoolJs.js";
export default {
  name: "UCMapTool",
  data() {
    return {
      mapTools: MapTools.mapTools,
    };
  },
  props: {},
  components: {},

  computed: {},

  mounted() {},

  methods: {
    init(mapToolEventCodes,defaultSelectCode) {
      if (!mapToolEventCodes) return;
      for (let toolIndex = 0; toolIndex < this.mapTools.length; toolIndex++) {
        let tempTool = this.mapTools[toolIndex];
        if (mapToolEventCodes.indexOf(tempTool.eventCode) >= 0) {
          tempTool.show = true;
        } else {
          tempTool.show = false;
        }
      }
      this.unSelectAll();
      if(defaultSelectCode){
        let item = _.find(this.mapTools,{"eventCode":defaultSelectCode});
        if(item && item.show){
          this._toolClicked(item)
        }
      }
    },

    // 地图工具栏点击
    _toolClicked(tooItem) {
      _.each(this.mapTools, (tool, toolIndex) => {
        if (tooItem.eventCode == tool.eventCode) {
        } else {
          tool.active = false;
        }
      });
      if (
        tooItem.eventCode != MapTools.mapEventCode.ClearMap &&
        tooItem.eventCode != MapTools.mapEventCode.ResetMap
      ) {
        tooItem.active = true;
      }

      this.$emit(commonEvent.common_event_mapToolClick, tooItem);
    },

    // 工具 监听
    on_toolClicked(callback) {
      if (callback) {
        this.$on(commonEvent.common_event_mapToolClick, callback);
      }
    },
    off_toolClicked(callback) {
      if (callback) {
        this.$off(commonEvent.common_event_mapToolClick, callback);
      }
    },


    // 清空所有选中
    unSelectAll() {
      _.each(this.mapTools, (tool, toolIndex) => {
        tool.active = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.mapTool {
  i {
    font-size: 16px;
    border-bottom: 1px solid rgba(0,0,0,0.5);
    cursor: pointer;
    display: inline-block;
    background: rgba(0,0,0,0.5);
    line-height: 32px;
    color: white;
    margin: 0 3px;
    text-align: center;
    padding: 5px 10px;
    border-radius: 5px;
   &::before{
    margin-right:5px;
   }
  }
  .editMapBtn:hover,
  .editMapBtn.active {
    background: rgb(0, 183, 255);
    color: white;
    i {
      color: white;
    }
  }
}


</style>