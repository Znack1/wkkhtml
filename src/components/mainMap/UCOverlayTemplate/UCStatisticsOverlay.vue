<!--
 * @Author: your name
 * @Date: 2020-03-15 10:18:06
 * @LastEditTime: 2023-06-25 14:54:04
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: \html\src\components\mainMap\UCOverlayTemplate\UCOverlay.vue
 -->
<!--  -->
<template>
  <div class="overLayerContent">
    <div class="divTitle">{{info.title}}</div>
    <vuescroll   style="width:100%;height:60vh;padding:0 10px;" class="content_block">
      <div style="text-align:left;padding:5px 0">基本信息</div>
      <UCAttriInfos v-show="info.attributes.length>0" ref="ucAttriInfos"></UCAttriInfos>
      <div v-show="info.photos.length>0" style="text-align:left;padding:5px 0">照片</div>
      <UCPhotos v-show="info.photos.length>0" ref="ucPhotos"></UCPhotos>
      <div v-show="info.videos.length>0" style="text-align:left;padding:5px 0">视频</div>
      <UCVideos v-show="info.videos.length>0" ref="ucVideos"></UCVideos>
    </vuescroll>
  </div>
</template>

<script>
import { StatisticsOverlayInfo } from '../UCMapOverlayJs';
import UCAttriInfos from "./UCAttriInfos.vue";
import UCPhotos from "./UCPhotos.vue";
import UCVideos from "./UCVideos.vue";
import vuescroll from 'vuescroll'

export default {
  name: "UCStatisticsOverlay",
  data() {
    return {
      info: new StatisticsOverlayInfo(),
      ucSetting: {
        scrollHide:true
      }
    };
  },

  components: { UCAttriInfos, UCPhotos, UCVideos,vuescroll },

  computed: {},

  mounted() {},

  methods: {
    init(statInfo, succeedCallback) {
      
      this.info = statInfo;
      if (statInfo) {
        this.$refs.ucAttriInfos.init(statInfo.attributes);

        if (statInfo.photos) {
          this.$refs.ucPhotos.init(statInfo.photos);
        } else {
          this.$refs.ucPhotos.init([]);
        }

        if (statInfo.videos) {
          this.$refs.ucVideos.init(statInfo.videos);
        } else {
          this.$refs.ucVideos.init([]);
        }
        if(statInfo.videos && statInfo.photos && (statInfo.videos > 0 || statInfo.photos.length > 0)){
           this.ucSetting.scrollHide = false;
        }else{
          this.ucSetting.scrollHide = true;
        }
      }

      this.$nextTick(succeedCallback);
      // this._initEvents();
    },
    // 弹框关闭
    handleClose(done) {
      let self = this;
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
<style lang="less" scoped>
.overLayerContent {
  padding-bottom: 24px;
  overflow: hidden;
  padding-bottom:10px;
}

.divCount {
  color: rgba(255, 255, 255, 0.7);
  overflow: hidden;
  font-size: 14px;
  padding: 0 20px;
}

.countBox {
  float: left;
  margin-right: 40px;
}

.pollution-value {
  color: #28d425;
  font-size: 26px;
  text-align: center;
}

.sewa-value {
  color: #2cdece;
  font-size: 26px;
  text-align: center;
}

.divTitle {
  height: 36px;
    width: 100%;
    line-height: 36px;
    color: #323232;
    font-size: 16px;
    padding: 0 24px;
    padding-left: 10px;
    border-bottom: 1px solid #86848c;
    box-sizing: border-box;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    background: #3d81ef;
    color: white
}
</style>