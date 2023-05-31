<!--
 * @Author: your name
 * @Date: 2020-03-09 15:10:45
 * @LastEditTime: 2020-04-15 23:27:08
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: \html\src\components\mainMap\UCOverlayTemplate\UCPhotos.vue
 -->
<!--  -->
<template>
  <div style="padding:0 24px;margin-top:5px;">
    <el-carousel height="200px" v-if="rangeVideos.length > 0">
      <el-carousel-item  v-for="tempItem in rangeVideos" :key="tempItem.id">
        <video-player style="width:100%;height:200px"  class="video-player vjs-custom-skin perVideo"
        ref="videoPlayer" :playsinline="true"  @play="onPlayerPlaying($event)"
        :options="tempItem.playerOptions" >
      </video-player>
      </el-carousel-item>
    </el-carousel>
  
  </div>
</template>



<script>
  export default {
    name: "UCVideos",
    data() {
      return {
        ucsetting: {
          partVideoCount: 3
        },
       
        videos: new Array(),

        rangeVideos: new Array(),

      };
    },

    components: {},

    computed: {
      
    },
    mounted() { },

    methods: {
      init(videoAttachments) {
        let self = this;

        if (!videoAttachments || videoAttachments.length == 0) return;
        this.videos = videoAttachments;
        this.rangeVideos = this.videos.slice(
          0,
          this.ucsetting.partVideoCount - 1
        );

        this.rangeVideos.setPlayerOptions();
        
      },
      
      // 点击more按钮查看更多
      _moreClickHandle() {
        // let imgInfo = {
        //   imgIndex: 0,
        //   imgList: this.photos
        // }
        // this.$emit(
        //   UCMapEvent.UCPhoto_event_imgClick,
        //   imgInfo
        // );
      },

      // 播放事件监听
      onPlayerPlaying(player){
        player.requestFullscreen();
      },

      on_nextTick(callback) {
        this.$nextTick(callback);
      }
    }
  };
</script>
<style lang="less" scoped>
  .ul-photos {
    // margin-left: 100px;

    .imgTitle {
      background: rgba(0, 0, 0, 0.5);
      color: rgba(255, 255, 255, 0.7);
      position: absolute;
      bottom: 0px;
      left: 10%;
      width: 100%;
      line-height: 30px;
      font-size: 14px;
      height: 30px;
      padding: 0 5px;
    }

    /deep/ .el-carousel__indicators {
      display: none;
    }
  }
  .perVideo {
    width: calc(33.333% - 10px);
    height: 80px;
    margin: 5px;
    float: left
  }
</style>