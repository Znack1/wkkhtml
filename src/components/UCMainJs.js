/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2021-03-23 16:00:48
 * @LastEditors: zkc
 * @LastEditTime: 2023-05-04 16:02:42
 * @input: no param
 * @out: no param
 */
import {  MapTools } from '../common/maptoolJs.js'
import { FieldItems } from "../model/FieldItemJs";
import { BaseLayerConfig } from '../config/BaseLayerConfig.js';
import { DrawGeometryPartType } from '../utility/ol/DrawGeometryUtilityJs.js';
import { GeometryExtentUtility } from '../utility/ol/GeometryExtentUtility.js';
import { MapBaseLayerType } from './mainMap/layer/MapBaseLayer';
import { MapOverlayInfo, MapOverlayType } from "./mainMap/UCMapOverlayJs"
export class UCMainEventManager {
  constructor() {
    this.ucMain = null;
    this.ucMap = null;
    this.ucMapTool = null;
    this.ucBaseLayerSwitch = null;
    this.ucCustomMapScale = null;
    this.printBtn = null; // 打印按钮
    this.editPoint = false; // 是否是编辑
  }

  /**
   * 添加监听
   */
  addListener() {
    this.curLayerGroup = this.ucMap.layerMgr.rawImageLayerGroup;
    this._addUCMapListener();

    this._addUCMapToolListener();

    // 切换底图
    this._addBaseLayerSwitchListener();

  }


  /**
    * 添加地图地图切换监听
    */
  _addBaseLayerSwitchListener() {
    let self = this;

    this.ucBaseLayerSwitch.on_switchVectorClick(function () {
      self.ucMap.layerMgr.baseLayer.showVisibleLayer(MapBaseLayerType.Vector);
    });
    this.ucBaseLayerSwitch.on_switchImageClick(function () {
      self.ucMap.layerMgr.baseLayer.showVisibleLayer(MapBaseLayerType.Image);
    });
    this.ucBaseLayerSwitch.on_switchTerClick(function () {
      self.ucMap.layerMgr.baseLayer.showVisibleLayer(MapBaseLayerType.Ter);
    });

  }

  /**
   * 添加地图监听
   */
  _addUCMapListener() {
    let self = this;
    // 点图点击 
    this.ucMap.on_mapClick(function (e) {
      if (self.isOpenTool) {
        return;
      }
      let pixel = self.ucMap.curMap.getEventPixel(e.originalEvent);
      let features = self.ucMap.curMap.getFeaturesAtPixel(pixel);
      if (!features || features.length == 0) return;

      // self._on_showOverlay(features, e.coordinate);

    });

    //级别缩放时，
    this.ucMap.on_zoomLevelChange(function (e) {
      // 刷新地图右下角的比例尺
      let resolution = self.ucMap.getResolution();
      self.ucCustomMapScale.refreshScale(resolution);

    });


    // 监听地图画点线面或者测量结束
    this.ucMap.on_drawRange(function (drawItem) {
      self._drawEnd(drawItem);
      self.ucMapTool.unSelectAll();
    })


    // 鼠标在地图上移动时
    this.ucMap.on_mapPointerMove(function (e) {
      //清除地图上的overlay

      // self.ucMap.layerMgr.selectLayer.clear();
      let pixel = self.ucMap.curMap.getEventPixel(e.originalEvent);
      let features = self.ucMap.curMap.getFeaturesAtPixel(pixel);
      if (!features || features.length == 0) {
        // 修改鼠标形状
        self.ucMap.curMap.getTargetElement().style.cursor = 'default';

      } else {
        self.ucMap.curMap.getTargetElement().style.cursor = 'pointer';
      }
      // 刷新右下角坐标
      self.ucCustomMapScale.refreshCoordinate(e.coordinate);


    });
  }


  /**
   *添加工具栏监听
   **/

  _addUCMapToolListener() {

    let self = this;
    let ifLgend = false
    this.ucMapTool.off_toolClicked(function (toolItem) {

    })
    // 工具条监听
    this.ucMapTool.on_toolClicked(function (toolItem) {
      self.mapToolOpen = true;
      self.toolEventCode = toolItem.eventCode;
      //清除弹窗
      // self.ucMap.clearOverlays();
      // 判断不同的工具 
      self.editPoint = false;
      switch (toolItem.eventCode) {
        case MapTools.mapEventCode.DrawRect:
        case MapTools.mapEventCode.DrawPolygon:
        case MapTools.mapEventCode.DrawPoint:
        case MapTools.mapEventCode.DrawPolyline:
          self.ucMap.drawRange(toolItem.eventCode);
          break;
        case MapTools.mapEventCode.ResetMap:
          //初始化地图中心点
          self.ucMap.curMap.getView().setZoom(BaseLayerConfig.map_view_init_initLevel);
          self.ucMap.curMap.getView().setCenter(BaseLayerConfig.map_view_init_centerPoint);
          break;
        case MapTools.ZoomIn:
          self.ucMap.plusZoomLevel();
          break;
        case MapTools.mapEventCode.ZoomOut:
          self.ucMap.subtractionZoomLevel();
          break;
        case MapTools.mapEventCode.MeasureArea:
        case MapTools.mapEventCode.MeasureLine:
          self.isOpenTool = true;
          self.ucMap.curMap.changeDragMode(
            toolItem.eventCode,
            (callbackData) => {
              // eslint-disable-next-line no-console
              console.log(callbackData);
              self.isOpenTool = false;
            }
          );
          break;
        case MapTools.mapEventCode.ClearMap:
          self.ucMap.layerMgr.drawGeometryLayer.clear();
          break;

        case MapTools.mapEventCode.legend:
          ifLgend = !ifLgend
          self.ucMain.setLgend(ifLgend);

        case MapTools.mapEventCode.editPoint:
          self.editPoint = true;
          self.ucMap.drawRange(MapTools.mapEventCode.DrawPoint);
          break;

      }
    })
  }



  /**
    * @name: zkc
    * @msg:图形绘制结束
    * @param {*} drawItem
    * @return {*}
    */
  _drawEnd(drawItem) {
    let self = this;
    if (drawItem.type == DrawGeometryPartType.point) {
      // self.ucMap.layerMgr.drawGeometryLayer.clear();
      self.ucMap.layerMgr.drawGeometryLayer.addDrawPoint(drawItem);
      if(self.editPoint){
        
        self._on_showOverlay(drawItem.coordinates);
      }
    } else if (drawItem.type == DrawGeometryPartType.polyline) {
      // self.ucMap.layerMgr.drawGeometryLayer.clear();
      self.ucMap.layerMgr.drawGeometryLayer.addDrawPolyline(drawItem);
    } else if (drawItem.type == DrawGeometryPartType.polygon || drawItem.type == DrawGeometryPartType.rectangle) {
      // self.ucMap.layerMgr.drawGeometryLayer.clear();
      self.ucMap.layerMgr.drawGeometryLayer.addDrawPolygon(drawItem);
      let extent = GeometryExtentUtility.GetExtent(drawItem.coordinates);
      let curExtent = GeometryExtentUtility.expandExtent(extent, 2);
      self.ucMap.setMapExtent(curExtent);
    }
  }



  // 显示showOverLay
  _on_showOverlay (coordinate) {
    //清除地图上的overlay
    this.ucMap.clearOverlays();



    // 取第一个
  
    let overlay = new MapOverlayInfo();
      overlay.position = coordinate;
      overlay.type = MapOverlayType.featureAttriInfo;
      overlay.features = null;

    let showFields = [
      { 'name': 'filename', 'aliasName': '名称', 'index': 1, 'type': 'string' }
    ]
      overlay.showFields = FieldItems.fromJsons(showFields);
      overlay.layerItemName = "结合表";

      overlay.layerItemSourceName = '结合表';
      this.ucMap.showOverlayEx(overlay);
  

  }

}