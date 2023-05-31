<!--
 * @Author: your name
 * @Date: 2020-03-09 15:10:45
 * @LastEditTime: 2023-05-31 22:06:04
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: \html\src\components\mainMap\UCOverlayTemplate\UCPhotos.vue
 -->
<!--  -->
<template>
  <div style="padding:0 24px;margin-top:5px;">
    <el-carousel height="200px" v-if="rangeVideos.length > 0">
      <el-carousel-item  v-for="(tempItem,idx) in rangeVideos" :key="idx">
        <video-player style="width:100%;height:200px"  class="video-player vjs-custom-skin perVideo"
        ref="videoPlayer" :playsinline="true"  @play="onPlayerPlaying($event)"
        :options="tempItem" >
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
        playerOption: {
            playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
            autoplay: false, //如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: false, // 导致视频一结束就重新开始。
            preload: true, // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: "zh-CN",
            aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [{
                src: "http://139.198.12.200:8081/yellowriver/62302503G52Q1586268475929/1e51de548d824ea69a1f067bf26f32e51586230214388.mp4",
                type: 'video/mp4'
            }],
            // poster: "../../static/images/test.jpg", //你的封面地址
            // width: document.documentElement.clientWidth,
            notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: false
        }
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
        this.videos = [];
        _.each(videoAttachments,(video)=>{
          let options = _.cloneDeep(this.playerOption);
          options.sources = [{
            src:window.BASE_CONFIG.flie_base_ip + video,
            type: 'video/mp4'
          }]
          this.videos.push(options)
        });
        this.rangeVideos = this.videos.slice(
          0,
          this.ucsetting.partVideoCount - 1
        );

        
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