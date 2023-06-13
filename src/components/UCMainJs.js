/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2021-03-23 16:00:48
 * @LastEditors: zkc
 * @LastEditTime: 2023-06-13 22:13:49
 * @input: no param
 * @out: no param
 */
import { MapTools } from '../common/maptoolJs.js'
import { FieldItems } from "../model/FieldItemJs";
import { BaseLayerConfig } from '../config/BaseLayerConfig.js';
import { DrawGeometryPartType } from '../utility/ol/DrawGeometryUtilityJs.js';
import { GeometryExtentUtility } from '../utility/ol/GeometryExtentUtility.js';
import { MapBaseLayerType } from './mainMap/layer/MapBaseLayer';
import { MapOverlayInfo, MapOverlayType } from "./mainMap/UCMapOverlayJs"
import AxiosConfig from "@/config/AxiosConfigJs";
import draw_marker from "../assets/images/draw_marker.png";
import _ from 'lodash'
import { LayerFeatureType } from './mainMap/layer/LayerFeatureType.js';
import { LayerCatalogItems } from '@/model/LayerCatalogItem.js';
import { ServiceUrlConfig } from '@/config/ServiceUrlConfigJs.js';
export class UCMainEventManager {
  constructor() {
    this.ucMain = null;
    this.ucMap = null;
    this.ucMapTool = null;
    this.ucBaseLayerSwitch = null;
    this.ucCustomMapScale = null;
    this.ucRightPanel = null;
    this.ucLeftMenu = null;
    this.printBtn = null; // 打印按钮
    this.editPoint = false; // 是否是编辑
    this.checkedNodes = [];
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

    // 左侧监听
    this._addUCLeftMenuListener();

    this._addZoomControlListener();

  }

  /**
     * 点击右侧图标按钮地图缩放监听
     */
  _addZoomControlListener() {
    let self = this;
    // 放大
    this.ucZoomControl.on_zoomInClick(function() {
        self.ucMap.plusZoomLevel();
    });
    // 缩放
    this.ucZoomControl.on_zoomOutClick(function() {
        self.ucMap.subtractionZoomLevel();
    });

    // 图例
    this.ucZoomControl.on_showLegend(()=>{
      self.ucMain.showLegend = !self.ucMain.showLegend;
    })
}

  _addUCLeftMenuListener() {
    let self = this;
    this.ucLeftMenu.on_checkLayer((nodes) => {
      this.checkedNodes = nodes;

      this.getPageData();

    })

    // 图层目录树
    this.ucLeftMenu.on_nodeCheckChangeHandler((node) => {
      debugger
      let self = this;
      if (!node) return;
      let layerItem = node;
      if (!layerItem) return;

      //清除弹窗
      self.ucMap.clearOverlays();
      self._changeLayerItemVisible(
        layerItem,
        layerItem.defaultVisible
      );
    })
  }

  // 获取页面数据更新
  getPageData() {
    let self = this;
    if(this.checkedNodes.length == 0){
      self.ucMap.layerMgr.poiLayer.clear();
      self.ucRightPanel.updatePanel(null, this.ucMain.curStat)
    }else{
      let rootParent =self.ucLeftMenu.$refs.ucLeftPanel.getParentNode(this.checkedNodes[0].parentId)
      // 获取分类key
      let typekey = null;
      if(rootParent){
        typekey = window.BASE_CONFIG.useFieldConfig[rootParent.name];
        this.ucRightPanel.firstName = rootParent.name
      }
    
      let params = {
        type: this.checkedNodes[0].parentId,
        twoType: _.map(this.checkedNodes, "name"),
        qvbie: this.ucMain.curStat.value || ''
      }
      self.ucMain.loading = true;
      AxiosConfig.spatialdecision
        .post(ServiceUrlConfig.point_allPoint, params)
        .then((res) => {
          self.ucMain.loading = false;
  
          let datas = res.data.data.pointEntities;
          self.ucMap.layerMgr.poiLayer.clear();
          // 通过key分类
          let groupByKey = _.groupBy(datas,typekey)
          let initDatas = [];
          debugger
          _.each(groupByKey,(group,key)=>{
            initDatas.push({
              features:group,
              img:_.find(this.checkedNodes,{"name":key})?_.find(this.checkedNodes,{"name":key}).img:null,
              selectImg:_.find(this.checkedNodes,{"name":key})?_.find(this.checkedNodes,{"name":key}).icon:null
            })
          })

          self.ucMap.layerMgr.poiLayer.addMarkersEx(initDatas);
  
          // 更新右侧面板
          self.ucRightPanel.updatePanel(res.data.data, this.ucMain.curStat)
        }).catch((error) => {
          self.ucMain.loading = false;
  
        })
    }
   

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
      debugger
      let level = self.ucMap.getZoomLevel();
      if (level >= window.BASE_CONFIG.canClickMapMinLevel) {
        self.twinklePoint(features[0])
      }
      self._on_showOverlay(features, e.coordinate);

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

  // 地图要素闪烁
  twinklePoint(feature, count) {
    count = count || 0;
    let selectImg = feature.get("bindingObject").selectImg;
    let defaultStyle = feature.getStyle();
    let iconStyle = new ol.style.Style({
      image: new ol.style.Icon(({
        anchor: [0.5, 8],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: selectImg
      }))
    });

    feature.setStyle(iconStyle)

    setTimeout(() => {
      count++;
      feature.setStyle(defaultStyle)
      if (count < 2) {
        this.twinklePoint(feature, count)
      }
    }, 500);

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
          self.isOpenTool = true;
          self.ucMap.drawRange(toolItem.eventCode);
          break;
        case MapTools.mapEventCode.ResetMap:
          //初始化地图中心点
          self.ucMap.curMap.getView().setZoom(BaseLayerConfig.map_view_init_initLevel);
          self.ucMap.curMap.getView().setCenter(BaseLayerConfig.map_view_init_centerPoint);
          break;
        case MapTools.mapEventCode.ZoomIn:
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
              self.isOpenTool = false;
            }
          );
          break;
        case MapTools.mapEventCode.ClearMap:
          self.ucMap.layerMgr.drawGeometryLayer.clear();
          self.ucMap.clearOverlays();
          self.ucMap.layerMgr.clear();
          // 清除目录树选中数据
          self.ucLeftMenu.$refs.ucLeftPanel.setAllUnChecked();
          self.checkedNodes  = [];
          self.getPageData();
          break;

        // case MapTools.mapEventCode.legend:
        //   ifLgend = !ifLgend
        //   self.ucMain.setLgend(ifLgend);

        // case MapTools.mapEventCode.editPoint:
        //   self.editPoint = true;
        //   self.ucMap.drawRange(MapTools.mapEventCode.DrawPoint);
        //   break;
        case MapTools.mapEventCode.District:
        case MapTools.mapEventCode.River:
          self.ucMain.handleCommand(toolItem.eventCode)

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
    self.isOpenTool = false;
    if (drawItem.type == DrawGeometryPartType.point) {
      // self.ucMap.layerMgr.drawGeometryLayer.clear();
      self.ucMap.layerMgr.drawGeometryLayer.addDrawPoint(drawItem);
      if (self.editPoint) {

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
  _on_showOverlay(features,coordinate) {
    //清除地图上的overlay
   
    if(features.length == 0){
      return;
    }
    let feature = features[0];
    let properties = feature.getProperties();
    if(properties.featureType == LayerFeatureType.treeLayerFeature && properties.bindingObject && properties.bindingObject.gid){
      this.ucMap.clearOverlays();
      let overlay = new MapOverlayInfo();
      overlay.position = coordinate;
      overlay.type = MapOverlayType.featureAttriInfo;
      overlay.features = [feature];
      let showFields = _.sortBy(window.BASE_CONFIG.showFields,(field)=>{
        return -field.index;
      })
      let params = {
        gid:properties.bindingObject.gid
      }
      this.ucMain.loading = true;
      AxiosConfig.spatialdecision
      .get(ServiceUrlConfig.detatil_findOne,{params:params})
      .then((res)=>{
        this.ucMain.loading = false;
        overlay.properties = res.data.data || {};
        overlay.showFields = showFields;
    
        this.ucMap.showOverlay(overlay);
      }).catch((error)=>{
        this.ucMain.loading = false;
        console.log(error)
      })
     
    }

  }

  /**
   * 修改图层项可见状态
   * @param {*} layerItem
   * @param {*} visibleStatus
   */
  _changeLayerItemVisible(layerItem, visibleStatus) {

    let self = this;
    if (!layerItem) return;

    if (visibleStatus) {

      self.ucMap.layerMgr.layerItemLayer.addLayer(layerItem);
      let findIndex = LayerCatalogItems.visibleItems.findIndexById(layerItem.id);
      LayerCatalogItems.visibleItems.removeByIndex(findIndex);
      LayerCatalogItems.visibleItems.push(layerItem);

    } else {
      let findVisibleIndex = LayerCatalogItems.visibleItems.findIndexById(layerItem.id);
      if (findVisibleIndex != -1) {
        layerItem.defaultVisible = false;
        LayerCatalogItems.visibleItems.removeByIndex(findVisibleIndex);
        this.ucMap.layerMgr.layerItemLayer.addLayer(layerItem);
      }
    }
  }


}