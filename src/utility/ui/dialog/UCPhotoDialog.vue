<template>
  <el-dialog title="" :append-to-body="true" :visible.sync="setting.dialogVisible" width="50%" :before-close="_handleClose">
    <el-carousel ref="carousel" trigger="click" height="65vh" :autoplay="false">
      <el-carousel-item v-for="(attachment,index) in attachments" :key="index"
        style="height:65vh;display: flex;
    align-items: center;
    justify-content: center;">
        <img :src="attachment.previewUrl" :width="attachment.width" :height="attachment.height"
          style="display: inline-block;" />
      </el-carousel-item>
    </el-carousel>
  </el-dialog>
</template>
<script>
  import _ from 'lodash';
  export default {
    name: "UCPhotoDialog",
    data() {
      return {
        attachments: [],
        setting: {
          curIndex: 0,
          dialogVisible: false
          // carouselHeight: 0
        }
      };
    },
    methods: {

      // 更新数据
      update(curIndex, ucPhotoAttachments) {

        this.attachments = this._getImgList(ucPhotoAttachments);
        this.show();
        this.setCarouselIndex(curIndex);


      },

      // 设置carouse的index
      setCarouselIndex(carouselIndex) {
        let self = this;
        setTimeout(function () {//等组件生成再调用setActiveItem(index);
          self.$refs.carousel.setActiveItem(carouselIndex);
        }, 500);
      },
 
      // 显示dialog
      show() {
        this.setting.dialogVisible = true;
      },

      // 隐藏
      hide() {
        this.setting.dialogVisible = false
      },

      // imgSize以及img数组
      _getImgList(attachments) {
        let photos = []
        if (!attachments || attachments.length == 0) return photos
        let boxMaxW = document.body.clientWidth * 0.8;
        let boxMaxH = 500;
        _.each(attachments, (attachment) => {
          let img = new Image();
          // 改变图片的src
          img.src = attachment;
          let temp = {
            previewUrl:attachment
          }
          let imgW = img.width;
          let imgH = img.height;

          var ratioW = imgW / boxMaxW; 1.3
          var ratioH = imgH / boxMaxH; 1.5
          let max = Math.max(ratioW, ratioH);
          if (max > 1) {

            temp.width = imgW / max;
            temp.height = imgH / max;

          } else {

            temp.width = imgW;
            temp.height = imgH;

          }
          photos.push(temp)
        })

        return photos;

      },


      // 点击按钮隐藏
      _handleClose(done) {
        done();
      },

    },
    computed: {

    }
  };
</script>
<style lang="scss" scoped>

</style>