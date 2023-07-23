/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2021-03-23 16:00:48
 * @LastEditors: zkc
 * @LastEditTime: 2023-07-23 21:10:57
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
import { LayerCatalogItem, LayerCatalogItems } from '@/model/LayerCatalogItem.js';
import { ServiceUrlConfig } from '@/config/ServiceUrlConfigJs.js';
import echarts from "echarts";
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
    this.curStatData = []; // 当前右侧统计数据
    this.datas = []; // 当前统计数据
    this.pointDatas = null; // 当前点位数据
    this.showType = 'count'; // count 数量统计   point 点位显示
    // 获取分类key
    this.typekey = null;
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
    this.ucZoomControl.on_zoomInClick(function () {
      self.ucMap.plusZoomLevel();
    });
    // 缩放
    this.ucZoomControl.on_zoomOutClick(function () {
      self.ucMap.subtractionZoomLevel();
    });

    // 图例
    this.ucZoomControl.on_showLegend(() => {
      self.ucMain.showLegend = !self.ucMain.showLegend;
    })
  }

  _addUCLeftMenuListener() {
    let self = this;
    this.ucLeftMenu.on_checkLayer((nodes) => {

      this.checkedNodes = nodes;
      // _.each(nodes, (node) => {
      //   if (node.layerItem) {
      //     this._changeLayerItemVisible(node.layerItem, true)
      //   }

      // })

      this.getPageData();

    })

    // 图层目录树
    this.ucLeftMenu.on_nodeCheckChangeHandler((node) => {

      let self = this;
      if (!node) return;
      let layerItem = node;
      if (!layerItem) return;

      //清除弹窗
      self.ucMap.clearOverlays('countOverlay', false);
      self._changeLayerItemVisible(
        layerItem,
        layerItem.defaultVisible
      );
    })
  }

  // 获取页面数据更新
  getPageData() {
    let self = this;
    this.ucMain.checkedNodes = _.sortBy(this.checkedNodes, (node) => {
      return parseFloat(node.sort);
    });
    if (this.checkedNodes.length == 0) {
      self.ucMap.layerMgr.poiLayer.clear();
      self.ucRightPanel.updatePanel(null, this.ucMain.curStat)
    } else {
      let rootParent = self.ucLeftMenu.$refs.ucLeftPanel.getParentNode(this.checkedNodes[0].parentId)
      // 获取分类key
      self.typekey = null;
      if (rootParent) {
        self.typekey = window.BASE_CONFIG.useFieldConfig[rootParent.name];
        this.ucRightPanel.firstName = rootParent.name
      }

      // 获取右侧数据
      this.getRightPanel()

      // 获取地图交互
      let level = self.ucMap.getZoomLevel();
      // 获取全国点位
      let paramsEx = {
        type: this.checkedNodes[0].parentId,
        twoType: _.map(this.checkedNodes, "name")
      }
      self.ucMain.loading = true;
      AxiosConfig.spatialdecision
        .post(ServiceUrlConfig.point_point, paramsEx)
        .then((res) => {

          self.pointDatas = res.data.data.pointEntities;

          // 如果当前级别大于6
          if (level > 6) {
            self.ucMain.loading = false;
            this.ucMap.clearOverlays('countOverlay', true);
            this.showType = 'point';
            this._addPointDatas();
          }
        }).catch((error) => {
          self.ucMain.loading = false;

        })

      // 获取数量统计
      let params = {
        type: this.checkedNodes[0].parentId,
        twoType: _.map(this.checkedNodes, "name"),
        qvbie: this.ucMain.curStat.value == 'ssly' ? 'ssly' : 'xzq'
      }

      AxiosConfig.spatialdecision
        .post(ServiceUrlConfig.point_quantityStatistics, params)
        .then((res) => {

          self.datas = res.data.data;
          if (level <= 6) {
            self.ucMain.loading = false;
            self.ucMap.layerMgr.poiLayer.clear();
            this.showType = 'count';
            self.addColumnChart()
          }
          // self.ucMap.layerMgr.datacountLayer.clear();

          // self.ucMap.layerMgr.datacountLayer.addMarkers(datas);

          // 更新右侧面板
          // self.ucRightPanel.updatePanel(res.data.data, this.ucMain.curStat)
        }).catch((error) => {
          self.ucMain.loading = false;

        })
    }


  }

  // 获取右测数据
  getRightPanel() {

    // 更新echart数据
    let chartParams = {
      type: this.checkedNodes[0].parentId,
      twoType: _.map(this.checkedNodes, "name"),
      "rank": null,
      "shengName": null,

    }
    this.getRightEechart(chartParams)
    // 更新table数据
    let params = {
      type: this.checkedNodes[0].parentId,
      twoType: _.map(this.checkedNodes, "name"),
      qvbie: this.ucMain.curStat.value == 'ssly' ? 'ssly' : 'xzq',
      "rank": null,
      "shengName": null,
      "shiName": null,
    }
    this.getRightTableDatas(params)


  }

  // 获取右侧数据
  getRightEechart(chartParams) {
    let self = this;
    AxiosConfig.spatialdecision
      .post(ServiceUrlConfig.point_echars, chartParams)
      .then((res) => {
        if (res.data.data && res.data.data.map && res.data.code == 200) {
          self.ucRightPanel.updateChart(res.data.data.map, this.ucMain.curStat)
        } else {
          self.ucRightPanel.updateChart([], this.ucMain.curStat)
        }

      }).catch((error) => {
        self.ucRightPanel.updateChart([], this.ucMain.curStat)
      })

  }

  // 获取右测表格
  getRightTableDatas(tableParams) {
    let self = this;
    AxiosConfig.spatialdecision
      .post(ServiceUrlConfig.point_findForm, tableParams)
      .then((res) => {
        if (res.data.data && res.data.data.linkedHashMap && res.data.code == 200) {
          self.ucRightPanel.updateTable(res.data.data.linkedHashMap, this.ucMain.curStat)
        } else {
          self.ucRightPanel.updateTable([], this.ucMain.curStat)
        }

      }).catch((error) => {
        self.ucRightPanel.updateTable([], this.ucMain.curStat)
      })

  }


  // 绘制点位
  _addPointDatas() {
    let self = this;
    self.ucMap.layerMgr.poiLayer.clear();
    // 通过key分类
    let groupByKey = _.groupBy(self.pointDatas, self.typekey)
    let initDatas = [];

    _.each(groupByKey, (group, key) => {
      initDatas.push({
        features: group,
        img: _.find(this.checkedNodes, { "name": key }) ? _.find(this.checkedNodes, { "name": key }).img : null,
        selectImg: _.find(this.checkedNodes, { "name": key }) ? _.find(this.checkedNodes, { "name": key }).icon : null
      })
    })

    self.ucMap.layerMgr.poiLayer.addMarkersEx(initDatas);
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
    this.ucMap.on_mapClick((e) => {
      if (self.isOpenTool) {
        return;
      }


      let pixel = self.ucMap.curMap.getEventPixel(e.originalEvent);
      let features = self.ucMap.curMap.getFeaturesAtPixel(pixel);
      if (!features || features.length == 0) return;
      let properties = features[0].getProperties();
      let findItem = _.find(features, (fea) => {
        let properties = fea.getProperties();
        return properties.featureType == LayerFeatureType.treeLayerFeature
      })
      if (!findItem && (properties.layer == 'sheng' || properties.layer == 'shi' || properties.layer == 'xian')) {
        // let gj = new ol.format.GeoJSON().writeGeometry(features[0].getGeometry())

        this.ucMap.layerMgr.selectLayer.addFeature(features[0]);
      } else if (findItem) {
        let level = self.ucMap.getZoomLevel();
        if (level >= window.BASE_CONFIG.canClickMapMinLevel) {
          self.twinklePoint(findItem)
        }
        self._on_showOverlay(features, e.coordinate);
      }


    });

    //级别缩放时，
    this.ucMap.on_zoomLevelChange(function (e) {
      // 刷新地图右下角的比例尺
      let resolution = self.ucMap.getResolution();
      self.ucCustomMapScale.refreshScale(resolution);
      self._on_zoomLevelChange_districtLayerVisibleChange(e);
    });


    // 监听地图画点线面或者测量结束
    this.ucMap.on_drawRange(function (drawItem) {
      self._drawEnd(drawItem);
      self.ucMapTool.unSelectAll();
    })


    // 鼠标在地图上移动时
    this.ucMap.on_mapPointerMove(function (e) {
      //清除地图上的overlay
      return;
      // self.ucMap.layerMgr.selectLayer.clear();
      let pixel = self.ucMap.curMap.getEventPixel(e.originalEvent);
      let features = self.ucMap.curMap.getFeaturesAtPixel(pixel);
      if (!features || features.length == 0) return;
      let level = self.ucMap.getZoomLevel();
      if (level >= window.BASE_CONFIG.canClickMapMinLevel) {
        let findItem = _.find(features, (fea) => {
          let properties = fea.getProperties();
          return properties.featureType == LayerFeatureType.treeLayerFeature
        })
        if (findItem) {
          self.twinklePoint(findItem)
        }

      }
      // 刷新右下角坐标
      self.ucCustomMapScale.refreshCoordinate(e.coordinate);


    });
  }

  // 地图要素闪烁
  twinklePoint(feature, count) {
    count = count || 0;
    let selectImg = feature.get("bindingObject").selectImg;
    let normalImg = feature.get("bindingObject").img;

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
      // count++;
      let defaultStyle = new ol.style.Style({
        image: new ol.style.Icon(({
          anchor: [0.5, 8],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: normalImg
        }))
      });
      feature.setStyle(defaultStyle)
      // if (count < 2) {
      //   this.twinklePoint(feature, count)
      // }
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
          self.ucMap.clearOverlays('countOverlay', false);
          self.ucMap.layerMgr.clear();
          // 清除目录树选中数据
          self.ucLeftMenu.$refs.ucLeftPanel.setAllUnChecked();
          self.checkedNodes = [];
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
  _on_showOverlay(features, coordinate) {
    //清除地图上的overlay

    if (features.length == 0) {
      return;
    }
    let feature = features[0];
    let properties = feature.getProperties();
    if (properties.featureType == LayerFeatureType.treeLayerFeature && properties.bindingObject && properties.bindingObject.gid) {
      this.ucMap.clearOverlays('countOverlay', false);
      let overlay = new MapOverlayInfo();
      overlay.position = coordinate;
      overlay.type = MapOverlayType.featureAttriInfo;
      overlay.features = [feature];
      let showFields = _.sortBy(window.BASE_CONFIG.showFields, (field) => {
        return -field.index;
      })
      let params = {
        gid: properties.bindingObject.gid
      }
      this.ucMain.loading = true;
      AxiosConfig.spatialdecision
        .get(ServiceUrlConfig.detatil_findOne, { params: params })
        .then((res) => {
          this.ucMain.loading = false;
          overlay.properties = res.data.data || {};
          overlay.showFields = showFields;

          this.ucMap.showOverlay(overlay);
        }).catch((error) => {
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

  // 生成随机id
  guid() {  //为了生成不一样的id，实现每个装柱状图的盒子的唯一性
    var d = new Date().getTime();
    var guid = 'xxxx-xxxx-xxxx-xxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
      });
    return guid;
  }
  // 添加echart图表
  addColumnChart(datas) {   //向点位添加柱状图的方法
    let self = this;
    this.showType = 'count';
    var html = '';
    this.ucMap.clearOverlays('countOverlay', true);
    for (var i = 0; i < self.datas.length; i++) {
      //1、循环每一条数据，生成id不同的div，
      //2、获取到该div，将柱状图添加上去，
      //3、 new Overlay，将每个柱状图添加到对应的点位上去
      var d = self.datas[i];
      // var pt = new ol.proj.fromLonLat([d.x, d.y]);
      var domid = "chart" + self.guid();    //生成不同的id
      html += "<div id='" + domid + "' style='margin-left: -20px;margin-bottom: -30px;display: flex;flex-direction: column;align-items: center;'><div style='color:#323232;font-size:16px'>" + d.sheng + "</div><div style='padding: 8px;background: rgba(0,97 ,255 ,0.3);border-radius: 50%;'><div style='width: 40px;height: 40px;background:#0061ff;border-radius: 50%;color: white;line-height: 40px;font-size:12px;font-weight:600'>" + d.count + "</div></div></div>"
      self.ucMain.chart.innerHTML = html;    //self.chart为HTML里的柱状图容器，

      //将柱状图添加到指定点位上去
      var chart = new ol.Overlay({
        id: domid,
        positioning: "bottom-center",
        element: document.getElementById(domid),
        offset: [0, 5],
        stopEvent: false  //overlay也支持滚珠放大缩小
      });
      chart.set("overlyType", "countOverlay")
      this.ucMap.curMap.addOverlay(chart, true);
      //self.map是在mounted里new Map出来的，按openlayer官网操作即可，
      chart.setPosition([d.zxjd, d.zxwd]);
    }

  }

  /**
    *
    * 地图级别改变时，行政区划图层显隐改变
    */
  _on_zoomLevelChange_districtLayerVisibleChange(level) {
// 级别区间显示不同数据
if (level > 6 && this.showType == 'count') {
  this.ucMap.clearOverlays('countOverlay', true);
  this.showType = 'point'
  this._addPointDatas();
} else if (level <= 6 && this.showType == 'point') {
  this.ucMap.layerMgr.poiLayer.clear();
  this.showType = 'count';
  this.addColumnChart();
}
    if (this.ucMain.curStat.value !== window.BASE_CONFIG.statTypes[0].value) return;
    //0-7级显示市、8级显示市县、8级以上显示县
    if (level <= 5) {
      // //城市隐藏
      if (this.ucMain.showTempLayerItems[0]) {
        this.ucMain.showTempLayerItems[0].setLayersVisible(true);
      }
      if (this.ucMain.showTempLayerItems[1]) {
        this.ucMain.showTempLayerItems[1].setLayersVisible(false);
      }
      if (this.ucMain.showTempLayerItems[2]) {
        this.ucMain.showTempLayerItems[2].setLayersVisible(false);
      }
      // this.ucMain.showTempLayerItems[0]. = true;
      // this.ucMain.showTempLayerItems[1].defaultVisible = false;
      // this.ucMain.showTempLayerItems[2].defaultVisible = false;
      // this._changeLayerItemVisible( this.ucMain.showTempLayerItems[0], true);
      // this._changeLayerItemVisible( this.ucMain.showTempLayerItems[1], false);
      // this._changeLayerItemVisible( this.ucMain.showTempLayerItems[2], false);
      //县区显示

    } else if (level <= 7) {
      if (this.ucMain.showTempLayerItems[0]) {
        this.ucMain.showTempLayerItems[0].setLayersVisible(false);
      }
      if (this.ucMain.showTempLayerItems[1]) {
        this.ucMain.showTempLayerItems[1].setLayersVisible(true);
      }
      if (this.ucMain.showTempLayerItems[2]) {
        this.ucMain.showTempLayerItems[2].setLayersVisible(false);
      }
    } else if (level > 7) {
      if (this.ucMain.showTempLayerItems[0]) {
        this.ucMain.showTempLayerItems[0].setLayersVisible(false);
      }
      if (this.ucMain.showTempLayerItems[1]) {
        this.ucMain.showTempLayerItems[1].setLayersVisible(false);
      }
      if (this.ucMain.showTempLayerItems[2]) {
        this.ucMain.showTempLayerItems[2].setLayersVisible(false);
      }
    }

    
  }



}