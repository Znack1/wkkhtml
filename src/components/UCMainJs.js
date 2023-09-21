/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2021-03-23 16:00:48
 * @LastEditors: zkc
 * @LastEditTime: 2023-09-21 10:07:47
 * @input: no param
 * @out: no param
 */
import { MapTools } from '../common/maptoolJs.js'
import { DrawGeometryPartType } from '../utility/ol/DrawGeometryUtilityJs.js';
import { GeometryExtentUtility } from '../utility/ol/GeometryExtentUtility.js';
import { MapBaseLayerType } from './mainMap/layer/MapBaseLayer';
import { MapOverlayInfo, MapOverlayType } from "./mainMap/UCMapOverlayJs"
import AxiosConfig from "@/config/AxiosConfigJs";
import draw_marker from "../assets/images/draw_marker.png";
import _ from 'lodash'
import { LayerFeatureType } from './mainMap/layer/LayerFeatureType.js';
import { LayerCatalogItem, LayerCatalogItems, VectorTileLayerItem } from '@/model/LayerCatalogItem.js';
import { ServiceUrlConfig } from '@/config/ServiceUrlConfigJs.js';
import echarts from "echarts";
import { SystemConfig } from '@/config/SystemConfig.js';
import { GeometryUtility } from '@/utility/ol/GeometryUtility.js';
import { MapboxStyleJsonRenderer } from '@/utility/ol/MapboxStyleJsonRenderer.js';
export class UCMainEventManager {
  constructor() {
    this.ucMain = null;
    this.ucMap = null;
    this.ucMapTool = null;
    this.ucBaseLayerSwitch = null;
    this.ucCustomMapScale = null;
    this.ucRightPanel = null;
    this.detailDialog = null;
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
    this.curCityInfo = {
      cityLevel: 1,
      sheng: null,
      shi: null,
      xian: null,
      liuyu: null
    };
    // 当前要素信息
    this.curFeaInfo = null;
    this.curFeatrue = null;
    this.chartParams = null; // echart参数
    this.tableParams = null; // 表格数据
    this.curFilter = {
      district: null,
      valueName: null
    }; // 当前过滤条件
    this.curBaseLayerItems=[];// 打开的基础图层
    this.curWkkdianIdx = 1;
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
      if(nodes[0] && nodes[0].parentId && this.curWkkdianIdx != nodes[0].parentId){
        this.curWkkdianIdx = nodes[0].parentId;
      }
     
      this.checkedNodes = nodes;
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
      if(layerItem.defaultVisible){
        this.curBaseLayerItems.push(layerItem)
      }else{
        _.remove(this.curBaseLayerItems,(layer)=>{
          return layer.id == layerItem.id;
        })
      }
      this.ucMain.refrshLeg(this.curBaseLayerItems)
      

    })
  }

  // 获取页面数据更新
  getPageData() {
    let self = this;
    self.showLegend = false;
    this.ucMain.checkedNodes = _.sortBy(this.checkedNodes, (node) => {
      return parseFloat(node.sort);
    });
    this.ucMain.showLegend = false;// 关闭图例
    let level = self.ucMap.getZoomLevel();
    if (this.checkedNodes.length == 0) {
      // self.ucMap.layerMgr.poiLayer.clear();
      if (level > 6) {
        self.ucMain.loading = false;
        this.ucMap.clearOverlays('countOverlay', true);
        this.showType = 'point';
        this._addPointDatas();
      }
      self.ucMain.updatePanel(null, this.ucMain.curStat)
    } else {
      let rootParent = self.ucLeftMenu.$refs.ucLeftPanel.getParentNode(this.checkedNodes[0].parentId)
      // 获取分类key
      self.typekey = null;
      if (rootParent) {
        self.typekey = window.BASE_CONFIG.useFieldConfig[rootParent.name];
        this.ucMain.firstName = rootParent.name
      }

      // 获取右侧数据

      this.getRightPanel()



      //     // 如果当前级别大于6
      if (level > 6) {
        self.ucMain.loading = false;
        this.ucMap.clearOverlays('countOverlay', true);
        this.showType = 'point';
        this._addPointDatas();
      }

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
            // self.ucMap.layerMgr.poiLayer.clear();
            this.showType = 'count';
            self.addColumnChart()
          }

          // 更新右侧面板
          // self.ucMain.updatePanel(res.data.data, this.ucMain.curStat)
        }).catch((error) => {
          self.ucMain.loading = false;

        })
    }


  }

  // 获取右测数据
  getRightPanel() {
    this.ucMain.initTitle(this.curCityInfo)
    // 更新echart数据
    if (this.chartParams) {
      this.chartParams.type = this.checkedNodes[0].parentId;
      this.chartParams.twoType = _.map(this.checkedNodes, "name");
    } else {
      this.chartParams = {
        type: this.checkedNodes[0].parentId,
        twoType: _.map(this.checkedNodes, "name"),
        "shiName": null,
        "shengName": null,

      }
    }
    this.getRightEechart(this.chartParams)
    // 更新table数据
    if (this.curCityInfo.cityLevel >= 4) {
      this.ucMain.staticsTable = false;
      this.ucMain.ucSetting.rightPanelTableVisiable = false;
      return;
    }
    if (this.tableParams) {
      this.tableParams.type = this.checkedNodes[0].parentId;
      this.tableParams.twoType = _.map(this.checkedNodes, "name");
      this.tableParams.qvbie = this.ucMain.curStat.value == 'ssly' ? 'ssly' : 'sheng';
    } else {
      this.tableParams = {
        type: this.checkedNodes[0].parentId,
        twoType: _.map(this.checkedNodes, "name"),
        qvbie: this.ucMain.curStat.value == 'ssly' ? 'ssly' : 'sheng',
        "shengName": null,
        "shiName": null,
      }
      if (this.ucMain.curStat.value == 'ssly') {
        this.tableParams.qvbie = 'ssly'
      } else {
        switch (this.curCityInfo.cityLevel) {
          case 1:
            this.tableParams.qvbie = 'sheng'
            break;
          case 2:
            this.tableParams.qvbie = 'shi'
            break;
          case 3:
            this.tableParams.qvbie = 'xian'
            break;
        }
        this.tableParams.shengName = this.curCityInfo.sheng;
        this.tableParams.shiName = this.curCityInfo.shi
      }
    }


    this.getRightTableDatas(this.tableParams)


  }

  // 获取右侧数据
  getRightEechart(chartParams) {
    let self = this;
    AxiosConfig.spatialdecision
      .post(ServiceUrlConfig.point_echars, chartParams)
      .then((res) => {
        if (res.data.data && res.data.data.map && res.data.code == 200) {
          self.ucMain.updateChart(res.data.data.map, this.ucMain.curStat, chartParams.type != '4')
        } else {
          self.ucMain.updateChart([], this.ucMain.curStat, chartParams.type != '4')
        }

      }).catch((error) => {
        self.ucMain.updateChart([], this.ucMain.curStat, chartParams.type != '4')
      })

  }

  // 获取右测表格
  getRightTableDatas(tableParams) {
    let self = this;
    AxiosConfig.spatialdecision
      .post(ServiceUrlConfig.point_findForm, tableParams)
      .then((res) => {
        if (res.data.data && res.data.data.linkedHashMap && res.data.code == 200) {
          self.ucMain.updateTable(res.data.data.linkedHashMap, this.ucMain.curStat)
        } else {
          self.ucMain.updateTable([], this.ucMain.curStat)
        }

      }).catch((error) => {
        self.ucMain.updateTable([], this.ucMain.curStat)
      })

  }


  // 绘制点位
  _addPointDatas() {
    let self = this;
    // self.ucMap.layerMgr.poiLayer.clear();
    let tempLayer = this.ucMain.pointsLayerItems[parseFloat(this.curWkkdianIdx) - 1];
    if (!tempLayer) return;
    tempLayer.defaultVisible = true;
    // 过滤数据
    // this.ucMain.pointsLayerItem.filterOLLayerByAttributesEx([this.curFilter.district,this.typekey],[ this.curFilter.valueName,_.map(this.checkedNodes, "name")])
   
    _.each(this.ucMain.pointsLayerItems,(pointsLayerItem,idx)=>{
      if (this.curCityInfo.cityLevel > 1) {
        // this.ucMain.pointsLayerItem.filterOLLayerByAttributesEx([this.curFilter.district],[ this.curFilter.valueName])
        pointsLayerItem.filterOLLayerByAttributesEx([this.curFilter.district, this.typekey], [this.curFilter.valueName, _.map(this.checkedNodes, "name")])
      } else {
        pointsLayerItem.filterOLLayerByAttributesEx([this.typekey], [_.map(this.checkedNodes, "name")])
        // this.ucMain.pointsLayerItem.filterOLLayerByAttributesEx([],[])
      }
      if(idx == (parseFloat(this.curWkkdianIdx) - 1)){
        pointsLayerItem.defaultVisible = true;
        this._changeLayerItemVisible(pointsLayerItem, true)
      }else{
        pointsLayerItem.defaultVisible = false;
        this._changeLayerItemVisible(pointsLayerItem, false)
      }
    })
   
    // 通过key分类
    return;

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

    // // 详情
    // this.ucMap.on_showDetail((info)=>{
    //   this.ucMain.show();
    // })

    // 点图点击 
    this.ucMap.on_mapClick((e) => {
      if (self.isOpenTool) {
        return;
      }

      let pixel = self.ucMap.curMap.getEventPixel(e.originalEvent);
      let features = self.ucMap.curMap.getFeaturesAtPixel(pixel);
      if (!features || features.length == 0) return;
      let findItem = _.find(features, (fea) => {
        let tempProperties = fea.getProperties();
        return tempProperties.layer == window.BASE_CONFIG.pointLayerName
      })



      if (!findItem) {
        let districtFea = this.findDistrictFeature(features, this.getTypes(), 0)
        // && (properties.layer == 'sheng' || properties.layer == 'shi' || properties.layer == 'xian')
        if (!districtFea) return;
        let properties = districtFea.getProperties();
        // 更新echart数据

        this.curCityInfo = {
          cityLevel: properties.layer == 'sheng_3857' ? 2 : (properties.layer == 'shi_3857' ? 3 : (properties.layer == 'xian_3857' ? 4 : 5)),
          sheng: properties['sheng'],
          shi: properties['shi'],
          xian: properties['xian'],
          liuyu: properties['liuyu']
        }





        this.ucMain.initTitle(this.curCityInfo)
        this.chartParams = {
          type: this.checkedNodes[0].parentId,
          twoType: _.map(this.checkedNodes, "name"),
          "shengName": this.ucMain.curStat.value == 'ssly' ? null : properties['sheng'],
          "shiName": this.ucMain.curStat.value == 'ssly' ? null : properties['shi'],
          "xianName": this.ucMain.curStat.value == 'ssly' ? null : properties['xian']
        }
        this.getRightEechart(this.chartParams)
        if (this.curCityInfo.cityLevel >= 4) {
          this.ucMain.staticsTable = false;
          this.ucMain.ucSetting.rightPanelTableVisiable = false;

        } else {
          // 更新table数据
          this.tableParams = {
            type: this.checkedNodes[0].parentId,
            twoType: _.map(this.checkedNodes, "name"),
            qvbie: this.ucMain.curStat.value == 'ssly' ? 'ssly' : 'xzq',
            "shengName": null,
            "shiName": null
          }
          if (this.ucMain.curStat.value == 'ssly') {
            this.tableParams.qvbie = 'ssly';
          } else {
            switch (this.curCityInfo.cityLevel) {
              case 1:
                this.tableParams.qvbie = 'sheng'
                break;
              case 2:
                this.tableParams.qvbie = 'shi'
                break;
              case 3:
                this.tableParams.qvbie = 'xian'
                break;
            }
            this.tableParams.shengName = this.curCityInfo.sheng;
            this.tableParams.shiName = this.curCityInfo.shi
          }
          this.getRightTableDatas(this.tableParams)
        }

        // 定位放大地图
        let extent = districtFea.getExtent();
        // let perPixeY =   ((SystemConfig.bodyHeight * 0.3) / SystemConfig.bodyHeight * (extent[3] - extent[1]));
        // let perPixeX =   (340 / SystemConfig.bodyHeight * (extent[2] - extent[0]));
        // let newExtent= [extent[0]-perPixeX,extent[1] - perPixeY,extent[2],extent[3]]
        let curExtent = GeometryExtentUtility.expandExtent(extent, 3);
        self.ucMap.setMapExtent(curExtent);

        //选中要素高亮显示
        self._selectedFeatureHighlight(districtFea);
      } else if (findItem) {
        let level = self.ucMap.getZoomLevel();
        if (level >= window.BASE_CONFIG.canClickMapMinLevel) {
          // self.twinklePoint(findItem) // shansh
        }
        self._on_showOverlay([findItem], e.coordinate);
      }


    });

    //级别缩放时，
    this.ucMap.on_zoomLevelChange(function (e) {
      // 刷新地图右下角的比例尺
      let resolution = self.ucMap.getResolution();
      // self.ucCustomMapScale.refreshScale(resolution);
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
      // self.ucCustomMapScale.refreshCoordinate(e.coordinate);


    });
  }

  // 获取图层名称数组
  getTypes() {
    if (this.ucMain.curStat.value == 'ssly') {
      return ['shidaliuyu_3857']
    } else {
      let layerNames = ["xian_3857", "shi_3857", "sheng_3857"];
      let level = this.ucMap.getZoomLevel();
      if (level > window.BASE_CONFIG.showDistrictLevel[2]) {
        return layerNames
      } else if (level <= window.BASE_CONFIG.showDistrictLevel[0]) {
        return layerNames.slice(2)
      } else {
        return layerNames.slice(1)
      }
    }

  }

  // 查找省市县按顺序
  findDistrictFeature(features, types, idx) {
    if (types.length < idx) {
      return null
    }
    let findItem = _.find(features, (fea) => {
      let tempProperties = fea.getProperties();
      return tempProperties.layer == types[idx]
    })
    if (findItem) {
      return findItem
    } else {
      findItem = this.findDistrictFeature(features, types, idx + 1);
      if (findItem) {
        return findItem;
      }
    }
    return findItem;
  }

  /**
       * 选中要素高亮
       * @param {*} feature 
       */
  _selectedFeatureHighlight(feature) {

    //清除选中图层
    LayerCatalogItems.visibleItems.clearSelectedFeatures();

    if (!feature) return;

    let featureId = feature.getId();

    if (!featureId) return;

    let layerCatalogItem = null; // 当前所属图层
    let childLayerCatalogItem = null; // 子集图层

    let properties = feature.getProperties();
    if (properties && properties["layer"]) {
      let layerName = properties["layer"];
      let childLyaerName = null;
      let parentName = null;
      // 获取自己图层
      switch (layerName) {
        case "sheng_3857":
          childLyaerName = "shi_3857";
          break;
        case "shi_3857":
          childLyaerName = "xian_3857"
          break;
      }
      let tempItem = null;
      for (let tempIndex = 0; tempIndex < this.ucMain.showTempLayerItems.length; tempIndex++) {
        tempItem = this.ucMain.showTempLayerItems[tempIndex];
        if (!tempItem || !tempItem.serviceName) continue;

        if (layerName && tempItem.serviceName.toLowerCase() === layerName.toLowerCase()) {
          layerCatalogItem = tempItem;

        } else if (childLyaerName && tempItem.serviceName.toLowerCase() === childLyaerName.toLowerCase()) {
          childLayerCatalogItem = tempItem;
        }
        if (layerCatalogItem && childLayerCatalogItem) {
          break;
        }
      }
    }

    if (!layerCatalogItem || !layerCatalogItem.olLayers || !layerCatalogItem.defaultVisible) return;

    //如果是矢量切片图层，选中要素
    if (layerCatalogItem instanceof VectorTileLayerItem) {
      layerCatalogItem.clearSelectedFeatures();
      let selectedIds = new Array();
      selectedIds.push(featureId);
      layerCatalogItem.updateSelectedFeatures(selectedIds);

      // 过滤字段名称
      switch (this.curCityInfo.cityLevel) {
        case 2:
          this.curFilter.district = "sheng"
          this.curFilter.valueName = properties['sheng']
          break;
        case 3:
          this.curFilter.district = "shi"
          this.curFilter.valueName = properties['shi']
          break;
        case 4:
          this.curFilter.district = "xian"
          this.curFilter.valueName = properties['xian']
          break;
        case 5:
          this.curFilter.district = "ssly"
          this.curFilter.valueName = properties['ssly']
          break;
      }
      // 过滤数据
      _.each(this.ucMain.pointsLayerItems,(pointsLayerItem,idx)=>{
        pointsLayerItem.filterOLLayerByAttributesEx([this.curFilter.district, this.typekey], [this.curFilter.valueName, _.map(this.checkedNodes, "name")])
      })
    
    }


    if (!childLayerCatalogItem || !childLayerCatalogItem.olLayers || !childLayerCatalogItem.defaultVisible) return;

    //如果是矢量切片图层，选中要素  --子集
    if (childLayerCatalogItem instanceof VectorTileLayerItem) {
      childLayerCatalogItem.clearSelectedFeaturesByParent();

      childLayerCatalogItem.updateSelectedFeaturesEX(this.curFilter.district,this.curFilter.valueName );

    }
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
          self.ucMap.curMap.getView().setZoom(window.BASE_CONFIG.map_view_init_initLevel);
          self.ucMap.curMap.getView().setCenter(window.BASE_CONFIG.map_view_init_centerPoint);
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

          self.curCityInfo = {
            cityLevel: 1,
            sheng: null,
            shi: null,
            xian: null,
            liuyu: null
          };
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
    if (properties.layer == window.BASE_CONFIG.pointLayerName && properties.__gid) {
      this.ucMap.clearOverlays('countOverlay', false);
      let overlay = new MapOverlayInfo();
      overlay.position = coordinate;
      overlay.type = MapOverlayType.featureAttriInfo;
      overlay.features = [feature];
      let showFields = _.sortBy(window.BASE_CONFIG.showFields, (field) => {
        return -field.index;
      })
      let params = {
        gid: properties.__gid
      }
      this.ucMain.loading = true;
      this.curFeatrue = feature;
      AxiosConfig.spatialdecision
        .get(ServiceUrlConfig.detatil_findOne, { params: params })
        .then((res) => {
          this.ucMain.loading = false;
          this.curFeaInfo = res.data.data;
          overlay.properties = res.data.data || {};
          overlay.showFields = showFields;

          // this.ucMap.showOverlay(overlay);
          this.detailDialog.showOverlay(overlay)
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
      console.log(LayerCatalogItems.visibleItems);
      LayerCatalogItems.visibleItems.push(layerItem);
      console.log(LayerCatalogItems.visibleItems);

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
  addColumnChart(datas) {   //向点位添加柱状图的方法4
    let self = this;
    if (this.ucMain.pointsLayerItems[parseFloat(this.curWkkdianIdx) - 1]) {
     this.ucMain.pointsLayerItems[parseFloat(this.curWkkdianIdx) - 1].defaultVisible = false;
      this._changeLayerItemVisible(this.ucMain.pointsLayerItems[parseFloat(this.curWkkdianIdx) - 1], false)
    }

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
      html += "<div id='" + domid + "' style='margin-left: -20px;margin-bottom: -30px;display: flex;flex-direction: column;align-items: center;'><div style='color:#323232;font-size:16px'>" + d.name + "</div><div style='padding: 8px;background: rgba(0,97 ,255 ,0.3);border-radius: 50%;'><div style='width: 30px;height: 30px;background:#0061ff;border-radius: 50%;color: white;line-height: 30px;font-size:12px;font-weight:600'>" + d.count + "</div></div></div>"
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
      let newPoints = GeometryUtility.transformPoints([[d.zxjd, d.zxwd]], "EPSG:4326", "EPSG:3857")
      chart.setPosition(newPoints[0]);
      // chart.setPosition([d.zxjd, d.zxwd]);
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
      // this.ucMap.layerMgr.poiLayer.clear();
      this.showType = 'count';
      this.addColumnChart();
      this.backCountryReset(true)
    }
    if (this.ucMain.curStat.value !== window.BASE_CONFIG.statTypes[0].value) return;
    //0-7级显示市、8级显示市县、8级以上显示县
    if (level <= window.BASE_CONFIG.showDistrictLevel[0]) {
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

    } else if (level <= window.BASE_CONFIG.showDistrictLevel[1]) {
      if (this.ucMain.showTempLayerItems[0]) {
        this.ucMain.showTempLayerItems[0].setLayersVisible(false);
      }
      if (this.ucMain.showTempLayerItems[1]) {
        this.ucMain.showTempLayerItems[1].setLayersVisible(true);
      }
      if (this.ucMain.showTempLayerItems[2]) {
        this.ucMain.showTempLayerItems[2].setLayersVisible(false);
      }
    } else if (level > window.BASE_CONFIG.showDistrictLevel[2]) {
      if (this.ucMain.showTempLayerItems[0]) {
        this.ucMain.showTempLayerItems[0].setLayersVisible(false);
      }
      if (this.ucMain.showTempLayerItems[1]) {
        this.ucMain.showTempLayerItems[1].setLayersVisible(false);
      }
      if (this.ucMain.showTempLayerItems[2]) {
        this.ucMain.showTempLayerItems[2].setLayersVisible(true);
      }
    }


  }


  // 返回全国数据
  backCountryReset(isZoomChange) {
    this.curCityInfo = {
      cityLevel: 1,
      sheng: null,
      shi: null,
      xian: null
    };

    // 重置过滤
    this.curFilter = {
      district: null,
      valueName: null
    }
    _.each(this.ucMain.pointsLayerItems,(pointsLayerItem,idx)=>{
      pointsLayerItem.filterOLLayerByAttributesEx([this.typekey], [_.map(this.checkedNodes, "name")])
    })
    // 清空选中
    LayerCatalogItems.visibleItems.clearSelectedFeatures();
    if(isZoomChange){

    }else{
      this.ucMap.curMap.getView().setZoom(window.BASE_CONFIG.map_view_init_initLevel);
      this.ucMap.curMap.getView().setCenter(window.BASE_CONFIG.map_view_init_centerPoint);
    }
    this.chartParams.shengName = null; 
    this.chartParams.shiName = null;
    this.chartParams.xianName = null;
    this.getRightPanel();

  }
}