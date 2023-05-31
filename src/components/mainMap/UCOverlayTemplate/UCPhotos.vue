<!--
 * @Author: your name
 * @Date: 2020-03-09 15:10:45
 * @LastEditTime: 2023-05-31 21:13:10
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: \html\src\components\mainMap\UCOverlayTemplate\UCPhotos.vue
 -->
<!--  -->
<template>
  <div style="padding:0 24px;margin-top:5px;">
    <el-carousel height="200px" v-show="photoRanges.length > 0">
      <el-carousel-item v-for="(tempRange,tempRangeIndex) in photoRanges" :key="tempRangeIndex" :interval="6000">
        <img class="perImg" :src="tempImg"
          :preview-src-list="photos" v-for="tempImg in tempRange" :key=tempImg.id />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import _ from 'lodash';
  export default {
    name: "UCPhotos",
    data() {
      return {
        ucsetting: {
          partImgCount: 6,
          moreBtnShow: false,
          pageCount: 1  // 轮播有几页
        },
        
        photoRanges:new Array(),

        photos: new Array(),
        
        rangePhotos: new Array()
      };
    },

    components: {},

    computed: {},

    mounted() { },

    methods: {
      init(photoAttachments) {
        
        if (!photoAttachments || photoAttachments.length == 0) return;

        this.photos = []
        _.each(photoAttachments,(photo)=>{
          this.photos.push(window.BASE_CONFIG.flie_base_ip + photo)
        });


        if (this.photos.length > this.ucsetting.partImgCount) {
          this.ucsetting.moreBtnShow = true;
        } else {
          this.ucsetting.moreBtnShow = false
        }
        
        this.photoRanges = this._getPartPhotos(this.photos);
      },

      // 获取carousel parts
      _getPartPhotos(photoAttachments){
        
        let ranges =new Array();
        this.ucsetting.pageCount = Math.ceil(photoAttachments.length / this.ucsetting.partImgCount);
        
        let startIndex = 0;
        let endIndex=0;
        let rangePhotos=null;
        for (let pageIndex = 0; pageIndex < this.ucsetting.pageCount; pageIndex++) {
          startIndex=pageIndex*this.ucsetting.partImgCount;
          endIndex=(pageIndex+1)*(this.ucsetting.partImgCount)-1;
          rangePhotos = photoAttachments.slice(startIndex,endIndex);
          ranges.push(rangePhotos);
        }

        return ranges;
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

      // 放大图片
      _imgClickHandle(imgIndex) {
        let attachments = this.photos;
        // YellowRiverSystemJs.ucOpenDialog.updata(imgIndex,attachments);
      },


      on_nextTick(callback) {
        this.$nextTick(function () {

        });
      }
    }
  };
</script>
<style lang="less" scoped>
  .ul-videos {
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

  .perImg {
    width: calc(33.333% - 10px);
    height: 80px;
    margin: 5px;
    float: left
  }
</style>