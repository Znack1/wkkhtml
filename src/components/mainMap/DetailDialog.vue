<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2021-03-23 15:57:10
 * @LastEditors: zkc
 * @LastEditTime: 2023-08-10 14:59:52
 * @input: no param
 * @out: no param
-->
<!--  -->
<template>
    <el-dialog :title="dialogTitle"  :visible.sync="dialogVisible" width="60%" id="divMapOverlay">
      <UCStatisticsOverlay ref="ucStatOverlay" @showDetail="showDetail"></UCStatisticsOverlay>
    </el-dialog>
  </template>
  
  <script>
  import {
    MapOverlayType,
    OverlayLayoutInfo,
    StatisticsOverlayInfo,
  } from "./UCMapOverlayJs";
  import UCStatisticsOverlay from "./UCOverlayTemplate/UCStatisticsOverlay.vue";
  import { SystemConfig } from '../../config/SystemConfig'
  export default {
    name: "UCMapOverlay",
    data() {
      return {
        dialogVisible:false, // 是否显示弹框
        overlayInfo: null,
        dialogTitle:null,
      };
    },
  
    components: {
      UCStatisticsOverlay,
    },
  
    computed: {},
  
    mounted() {
      // this.$refs.ucAttriInfos.on_canelPanel(()=>{
      //   this.clearOverlays();
      // })
    },
  
    methods: {
      init() {},
      
     
      showDetail(){
        this.$emit("showDetail1",this.info)
      },
  
      showOverlay(overlayInfo) {
        debugger
        let self = this;
        if (!overlayInfo) return;
        this.dialogVisible = true;
        self.overlayInfo = overlayInfo;
        if (overlayInfo.type == MapOverlayType.featureAttriInfo) {
          let info = new StatisticsOverlayInfo();
          info.id = overlayInfo.properties.gid;
          info.title = overlayInfo.properties.mc;
          this.dialogTitle = overlayInfo.properties.mc;
          info.getAttributesAndAttachments(
            overlayInfo.properties,
            overlayInfo.showFields
          );
            this.$nextTick(()=>{
            
            
                self._initAttriAndPhotosCallbackHandler(overlayInfo.position, info);
            })
         
        }
      },
      on_showDetail(callback){
        this.$on("showDetail1",callback)
      },
      // 点击详情
      _initAttriAndPhotosCallbackHandler(position, objectInfo) {
        // let divMapOverlayElement = document.getElementById("divMapOverlay");
  
        // if (!this.$refs.ucStatOverlay) {
        //   this.clearOverlays('countOverlay',false);
        // }
  
        // // 无属性则不显示
        // if (
        //   objectInfo.attributes.length == 0 &&
        //   objectInfo.videos.length == 0 &&
        //   objectInfo.photos.length == 0
        // ) {
        //   return;
        // }
  
        // let overlayLayout = this._createOverlayLayout();
  
        // divMapOverlayElement.append(overlayLayout.divElement);
  
        // //新建overlay
        // overlayLayout.ucOverlay = new ol.Overlay({
        //   //设置弹出框的容器
        //   element: overlayLayout.divElement,
        //   //是否自动平移，即假如标记在屏幕边缘，弹出时自动平移地图使弹出框完全可见
        //   autoPan: true,
        //   autoPanMargin: 100,
        //   positioning: "center-right",
        // });
  
        let self = this;
  
        this.$refs.ucStatOverlay.init(objectInfo, function () {
            debugger
        //   overlayLayout.contentElement.appendChild(self.$refs.ucStatOverlay.$el); // = innerHtml;
  
        //   //设置overlay的显示位置
        //   overlayLayout.ucOverlay.setPosition(position);
        //   self.curMap.addOverlay(overlayLayout.ucOverlay, true);
  
          // 使弹框居中
        //   let extent = self.curMap.getView().calculateExtent(self.curMap.getSize());
        //   let perPixeY =   ((70) / SystemConfig.bodyHeight * (extent[3] - extent[1]));
        //   let perPixeX =   (260 / SystemConfig.bodyWidth * (extent[2] - extent[0]));
        //   self.curMap.getView().setCenter([position[0] + perPixeX,position[1] + perPixeY])
        });
      },
  
    },
  };
  </script>
  
  
  <style lang="less" scoped>
   /deep/ .el-dialog__header {
    padding:10px;
    text-align: left;
    padding-bottom: 0;
  }

  /deep/ .el-dialog__headerbtn {

  }

  /deep/ .el-dialog__body {
    padding: 10px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }

  /deep/ .el-dialog__title {
    width: 100%;
    height: 40px;
    font-weight: bold;
    text-align: left;
    color: #3d81ef;
    font-size: 18px;
  }
  </style>