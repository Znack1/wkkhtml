<!--
 * @Author: your name
 * @Date: 2020-03-15 10:18:06
 * @LastEditTime: 2023-05-31 11:30:05
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: \html\src\components\mainMap\UCOverlayTemplate\UCOverlay.vue
 -->
<!--  -->
<template>
  <div class="overLayerContent">
    <div class="divTitle">{{info.title}}</div>
    <UCAttriInfos v-show="info.attributes.length>0" ref="ucAttriInfos"></UCAttriInfos>
    <vuescroll v-show="!ucSetting.scrollHide"  style="width:100%;height:200px" class="content_block">
      <UCPhotos v-show="info.photos.length>0" ref="ucPhotos"></UCPhotos>
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
      debugger
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
  border-bottom: 1px solid #86848c;
  box-sizing: border-box;
  margin-bottom: 10px;
text-align: left;
}
</style>