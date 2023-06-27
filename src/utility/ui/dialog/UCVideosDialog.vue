<template>
  <el-dialog title="" :visible.sync="setting.dialogVisible" width="50%"  :before-close="handleClose">
    <el-carousel ref="carousel" trigger="click" height="500px" :autoplay="false">
      <el-carousel-item v-for="(list,index) in srcLists" :key="index" style="height:500px;text-align: center;">
        <img :src="list.url" :width="list.width" :height="list.height"  style="display: inline-block;"/>
      </el-carousel-item>
    </el-carousel>
  </el-dialog>
</template>
<script>
  import _ from 'lodash'
  export default {
    name: "UCPhotoDialog",
    data() {
      return {
        srcLists: [],
        setting: {
          curIndex: 0,
          dialogVisible: false,
          carouselHeight: 0
        }
      };
    },
    methods: {
      init(imgInfo) {

        this.setting.dialogVisible = true;
        // this.setting.curIndex = imgInfo.imgIndex;
        this.srcLists = this._getImgList(imgInfo.imgList);
        this.$refs.carousel.setActiveItem(imgInfo.imgIndex);
        this.setting.carouselHeight = document.body.clientHeight * 0.8 + 'px';
      },

      // imgSize
      _getImgList(srcLists) {
        let photos = [];
        if (!srcLists || srcLists.objects.length == 0) return photos
        let boxMaxW = document.body.clientWidth * 0.8;
        let boxMaxH = 500;
        _.each(srcLists.objects, (src) => {
          let img = new Image();
          // 改变图片的src
          img.src = src.previewUrl;

          let imgW = img.width;
          let imgH = img.height;

          var ratioW = imgW / boxMaxW; 1.3
          var ratioH = imgH / boxMaxH; 1.5
          let max = Math.max(ratioW, ratioH);
          if (max > 1) {
            photos.push({
              url: src.previewUrl,
              width: imgW / max,
              height: imgH / max
            })
          } else {
            photos.push({
              url: src.previewUrl,
              width: imgW,
              height: imgH
            })
          }
        //   if (ratioW > ratioH) {
        //     imgW = boxMaxW;
        //     imgH = boxMaxW * (imgH / imgW);
        //   }
        //   else {
        //     imgH = boxMaxH;
        //     imgW = boxMaxH * (imgW / imgH);
        //   }

        //   photos.push({
        //     url: src.previewUrl,
        //     width: imgW,
        //     height: imgH
        //   })
        })

        return photos;

      },

      handleClose(done) {
        done();
      },
    },
    computed: {

    }
  };
</script>
<style lang="scss" scoped>
  
</style>