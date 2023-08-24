<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2022-07-26 17:27:22
 * @LastEditors: zkc
 * @LastEditTime: 2023-08-24 14:04:01
 * @input: no param
 * @out: no param
-->
<template>
  <div class="divContainer" v-loading="loading">
    <div class="leftBox">
      <LeftMenu ref="ucLeftMenu" class="leftpanel"></LeftMenu>
    </div>
    <div class="rightBox">

      <UCMap ref="ucMap" :id="'map'"></UCMap>
      <!-- 右侧控制端 -->
      <UCBaseLayerSwitch class="baseLayerSwitch" ref="ucBaseLayerSwitch"
        :style="{ right: (ucSetting.rightPanelVisiable || ucSetting.rightPanelTableVisiable) ? '10px' : '10px' }">
      </UCBaseLayerSwitch>
      <UCZoomControl class="divZoomCon" ref="ucZoomControl"></UCZoomControl>
      <!-- 比例尺，经纬度 -->
      <!-- <UCCustomMapScale ref="ucCustomMapScale" class="divScale"></UCCustomMapScale> -->
      <!-- <div
        class="close_btn"
        @click="_togglePanel"
        :style="{ right: ucSetting.rightPanelVisiable ? '320px' : '0px' }"
      >
        {{ ucSetting.rightPanelVisiable ? "关闭列表" : "展开列表" }}
      </div> -->
      <div class="topContent echartbox" :style="{ right: ucSetting.rightPanelVisiable ? '10px' : '-310px' }">
        <UCPanel style="border-radius: 5px 5px 0 0;" :Title="firstName" iconClass="icon-weikuangkulogo1"></UCPanel>
        <div style="width: 100%; height: calc(100% - 50px);margin-top:5px">
          <UCBarYComponent v-if="!isX" ref="ucBarYComponent"></UCBarYComponent>
          <UCBarXComponent v-if="isX" ref="ucBarXComponent"></UCBarXComponent>
        </div>

      </div>
      <div class="bottomContent tableContent"
        :style="{ right: ucSetting.rightPanelTableVisiable ? '10px' : '-310px', top: ucSetting.rightPanelVisiable ? '360px' : '10px' }">
        <UCPanel :Title="secondName" iconClass="icon-weikuangkulogo1"></UCPanel>
        <!-- <vuescroll style="width: 100%; height: calc(100% - 50px);margin-top:5px"> -->
        <UCDistributionTable style="width: 100%; height: calc(100% - 50px); padding: 10px;" ref="ucDistributionTable"
          class="table">
        </UCDistributionTable>
        <!-- </vuescroll> -->

      </div>
      <!-- 工具条 -->
      <UCMapTool ref="ucMapTool" class="mapTool"></UCMapTool>

      <!-- 图例 -->
      <div v-show="showLegend" class="legendBox">
        <div class="legendTitle">图例
          <i class="el-icon-close" @click="_hideLegbox"></i>
        </div>
        <div class="itemContent">
          <div v-for="node in checkedNodes" :key="node.id" class="legendItem">
            <img style="margin-right: 5px" :src="node.img" width="16px" height="16px" />
            <span>{{ node.name }}</span>
          </div>
        </div>
      </div>

      <UCPhotoDialog ref="ucPhotoDialog"></UCPhotoDialog>

      <!-- echart -->
      <div style="display: none;" id="echart" ref="chart"></div>

      <!-- 返回全国 -->
      <div class="btnBox"
        :style="{ right: (ucSetting.rightPanelVisiable || ucSetting.rightPanelTableVisiable) ? '330px' : '10px' }">
        <i @click="_backCountry" class="allCity iconfont editMapBtn active icon-zuobiao" style="margin-right:10px">全国</i>
        <i @click="_togglePanel" :class="ucSetting.rightPanelVisiable ? 'active' : ''" class="allCity ">柱图统计</i>
        <i @click="_togglePanel1" v-if="staticsTable" :class="ucSetting.rightPanelTableVisiable ? 'active' : ''" class="allCity ">表格统计</i>
      </div>


      <el-dialog class="detailMore" v-if="detailInfo" :title="detailInfo.mc" fullscreen :visible.sync="dialogVisible"
        width="100%" :before-close="handleClose" :destroy-on-close="true">
        <div class="detail_content">
          <div class="content_box">
            <div class="box_title" style="text-align:left;padding:5px 0">基本信息</div>
            <el-row :gutter="10" style="display:flex;">
              <el-col :span="8">
                <div class="infoItem">
                  <div class="itemName">尾款库名称：</div>
                  <div class="itemValue">{{ detailInfo.mc }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">生产状态：</div>
                  <div class="itemValue">{{ detailInfo.sczt }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">入库形式：</div>
                  <div class="itemValue">{{ detailInfo.rkxs }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">尾矿库等别：</div>
                  <div class="itemValue">{{ detailInfo.wkkdb }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">位置：</div>
                  <div class="itemValue">{{ detailInfo.wz }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">生成状况：</div>
                  <div class="itemValue">{{ detailInfo.sczk }}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="infoItem">
                  <div class="itemName">启用时间：</div>
                  <div class="itemValue">{{ detailInfo.qysj }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">主要矿种：</div>
                  <div class="itemValue">{{ detailInfo.zykz }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">设计全库容(万M3)：</div>
                  <div class="itemValue">{{ detailInfo.sjqkr }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">现状总坝高：</div>
                  <div class="itemValue">{{ detailInfo.xzzbg }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">监管等级：</div>
                  <div class="itemValue">{{ detailInfo.jgdj }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">环境敏感度：</div>
                  <div class="itemValue">{{ detailInfo.hjmgcd }}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <!-- <div style="width:80%;height:100%;background:blue">地图定位</div> -->
                <UCMap style="border:1px solid #bebeff;height:200px" :id="'mapEx'" ref="ucMapEx"></UCMap>
              </el-col>
            </el-row>
            <div class="box_title" style="text-align:left;padding:5px 0">其他信息</div>
            <el-row :gutter="10" style="display:flex;">
              <el-col :span="8">
                <div class="infoItem">
                  <div class="itemName">省：</div>
                  <div class="itemValue">{{ detailInfo.sheng }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">乡镇：</div>
                  <div class="itemValue">{{ detailInfo.xz }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">生产许可：</div>
                  <div class="itemValue">{{ detailInfo.aqscxk }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">环境管理人：</div>
                  <div class="itemValue">{{ detailInfo.hjglr }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">尾矿库回水：</div>
                  <div class="itemValue">{{ detailInfo.wkkhs }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">是否安装污：</div>
                  <div class="itemValue">{{ detailInfo.sfazw }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">所处区域及：</div>
                  <div class="itemValue">{{ detailInfo.scqyj }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">所属流域：</div>
                  <div class="itemValue">{{ detailInfo.ssly }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">排查情况：</div>
                  <div class="itemValue">{{ detailInfo.pcqk }}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="infoItem">
                  <div class="itemName">市：</div>
                  <div class="itemValue">{{ detailInfo.shi }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">中心经度：</div>
                  <div class="itemValue">{{ detailInfo.zxjd }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">运营管理单位：</div>
                  <div class="itemValue">{{ detailInfo.yygldw }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">联系电话：</div>
                  <div class="itemValue">{{ detailInfo.lxdh }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">尾矿水回水：</div>
                  <div class="itemValue">{{ detailInfo.wkshs }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">临近水源地：</div>
                  <div class="itemValue">{{ detailInfo.ljsyd }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">环境风险控：</div>
                  <div class="itemValue">{{ detailInfo.hjfxk }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">岩质及地质：</div>
                  <div class="itemValue">{{ detailInfo.yzjdz }}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="infoItem">
                  <div class="itemName">县：</div>
                  <div class="itemValue">{{ detailInfo.xian }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">中心维度：</div>
                  <div class="itemValue">{{ detailInfo.zxwd }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">社会信用代码：</div>
                  <div class="itemValue">{{ detailInfo.shxydm }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">现状全库容量：</div>
                  <div class="itemValue">{{ detailInfo.xzqkrl }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">是否为无主：</div>
                  <div class="itemValue">{{ detailInfo.sfwwz }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">距水源地最：</div>
                  <div class="itemValue">{{ detailInfo.jlsydz }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">环境监管等级：</div>
                  <div class="itemValue">{{ detailInfo.hjjgdj }}</div>
                </div>
                <div class="infoItem">
                  <div class="itemName">地下水状况：</div>
                  <div class="itemValue">{{ detailInfo.dxszk }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-dialog>


      <div class="legenBtn" @click="_showLegend" :class="showLegend ? 'active' : ''">
        <i class="iconfont icon-tuceng"></i>
      </div>

      <!-- 详情弹框 -->
      <DetailDialogVue ref="detailDialog"></DetailDialogVue>
    </div>
  </div>
</template>

<script>
import UCMap from "../components/mainMap/UCMap.vue";
import { UCMainEventManager } from "./UCMainJs.js";
import UCMapTool from "../common/mapTool.vue";
import { MapTools } from "../common/maptoolJs.js";
import LeftMenu from "../components/mainMenu/leftMenu.vue";
import UCBaseLayerSwitch from "./baseLayerSwitch/UCBaseLayerSwitch.vue";
import UCCustomMapScale from "./customMapControls/UCCustomMapScale.vue";
import UCZoomControl from "./customMapControls/UCZoomControl.vue";
import UCRightFloatComponent from "./rightPanel/UCRightFloatComponent.vue";
import { DialogSystemJs } from "../common/dialogSystemJs";
import UCPhotoDialog from "../utility/ui/dialog/UCPhotoDialog.vue"
import DetailDialogVue from "./mainMap/DetailDialog.vue"
import UCBarYComponent from "../utility/ui/echarts/UCBarYComponent.vue";
import UCBarXComponent from "../utility/ui/echarts/UCBarXComponent.vue";
import UCDistributionTable from "./rightPanel/UCDistributionTable.vue";
import UCPanel from '../utility/ui/UCPanel.vue'
import vuescroll from "vuescroll";
import _ from "lodash";
import draw_marker from "../assets/images/draw_marker.png";
import {
  LayerCatalogItem,
  LayerCatalogItemType,
  VectorTileLayerItem,
  WmsLayerItem,
  WmtsLayerItem,
} from "@/model/LayerCatalogItem";
import { GeometryUtility } from '@/utility/ol/GeometryUtility';
import { LayerFeatureType } from "./mainMap/layer/LayerFeatureType";
export default {
  name: "ucMain",
  components: {
    UCMap,
    UCMapTool,
    UCBaseLayerSwitch,
    UCCustomMapScale,
    UCRightFloatComponent,
    LeftMenu,
    UCZoomControl,
    UCPhotoDialog,
    DetailDialogVue,
    UCBarYComponent, UCDistributionTable, vuescroll, UCPanel, UCBarXComponent
  },
  props: {},
  data() {
    return {
      isX: true,
      firstName: "监管等级",
      secondName: '数据统计',
      staticsTable: true, // 是否可以展开表格统计
      detailInfo: null,
      dialogVisible: false,// 更多详情弹框
      chart: null, // echart容器
      showLegend: false, // 是否显示图例
      loading: false,
      checkedNodes: [], // 当前图例数据
      curStat: {
        name: "行政区划",
        value: "district",
        defalutHeader: [
          { name: "排名", props: "", width: 80 },
          { name: "区域", props: "area", width: 122 },
        ],
      }, // 当前统计类型
      statTypes: window.BASE_CONFIG.statTypes, // 统计类型
      ucSetting: {
        rightPanelVisiable: false,
        rightPanelTableVisiable: false,
      },
      showTempLayerItems: new Array(),
    };
  },
  methods: {

    initTitle(curCityInfo) {

      let keys = ["sheng", "shi", "xian", 'liuyu']
      this.firstName = "监管等级(" + (curCityInfo.cityLevel == 1 ? '全国' : curCityInfo[keys[curCityInfo.cityLevel - 2]]) + ")";
      if (curCityInfo.cityLevel >= 4) {
        this.staticsTable = false;
        this.ucSetting.rightPanelTableVisiable = false;
      } else {
        this.staticsTable = true;
        this.secondName = "数据统计(" + (curCityInfo.cityLevel == 1 ? '全国' : curCityInfo[keys[curCityInfo.cityLevel - 2]]) + ")";
      }
    },

    // 更新数据
    updateChart(datas, curStat, isX) {
      this.isX = isX;
      this.$nextTick(() => {
        if (!datas) {
          let barObj = {
            data: [],
          };
          if (isX) {
            this.$refs.ucBarXComponent.initChart(barObj);
          } else {
            this.$refs.ucBarYComponent.initChart(barObj);
          }

          return;
        }
        let barObj = {
          data: [],
          color: ['#3d81ef', '#9fc3ff']
        };
        datas = _.sortBy(datas, (o) => {
          return parseFloat(o.sort);
        });
        _.each(datas, (n, key) => {
          barObj.data.push({
            value: n.value,
            name: n.name,
            type: "统计",
          });
        });
        if (isX) {
          this.$refs.ucBarXComponent.initChart(barObj);
        } else {
          this.$refs.ucBarYComponent.initChart(barObj);
        }
      })


    },

    // 更新table
    updateTable(datas, curStat) {
      if (!datas) {
        this.$refs.ucDistributionTable.update([], []);
        return;
      }
      if (datas) {
        let idx = 0;
        let tableDatas = new Array();
        datas = _.sortBy(datas, (o) => {
          return -parseFloat(o.sort)
        });
        let headers = window.BASE_CONFIG.statTypes[0].defalutHeader || [];
        if (curStat) {
          headers = _.cloneDeep(curStat.defalutHeader);
        }

        // 解析数据
        _.each(datas, (map) => {
          let temp = {
            name: map.name,
          };

          map.list = _.sortBy(map.list, (o) => {
            return parseFloat(o.id)
          });
          // {name:'区域',props:'area',width:120}
          _.each(map.list, (l, index) => {
            if (idx == 0) {
              headers.push({
                name: l.dengji,
                props: "prop" + index,
                width: l.dengji.length * 30
              });
            }

            temp["prop" + index] = l.number;
          });
          idx++;

          tableDatas.push(temp);
        });

        _.each(tableDatas, (d, index) => {
          d.idx = (index + 1)
        })
        this.$refs.ucDistributionTable.update(tableDatas, headers);
      }

    },

    /**
     * 初始化
     */
    updatePanel(data, curStat) {

      if (!data) {
        let barObj = {
          data: [],
        };
        this.$refs.ucBarXComponent.initChart(barObj);
        this.$refs.ucDistributionTable.update([], []);
        return;
      }
      // echart
      if (data.map) {
        let barObj = {
          data: [],
          color: ['#158DFD', '#9BC5F1']
        };
        datas = _.sortBy(data.map, (o) => {
          return parseFloat(o.sort);
        });
        _.each(data.map, (n, key) => {
          barObj.data.push({
            value: n.value,
            name: n.name,
            type: "统计",
          });
        });
        this.$refs.ucBarXComponent.initChart(barObj);
      }
      // table
      if (data.linkedHashMap) {
        let idx = 0;
        let tableDatas = new Array();
        data.linkedHashMap = _.sortBy(data.linkedHashMap, (o) => {
          return -parseFloat(o.sort)
        });
        let headers = window.BASE_CONFIG.statTypes[0].defalutHeader || [];
        if (curStat) {
          headers = _.cloneDeep(curStat.defalutHeader);
        }

        // 解析数据
        _.each(data.linkedHashMap, (map) => {
          let temp = {
            name: map.name,
          };

          map.list = _.sortBy(map.list, (o) => {
            return parseFloat(o.id)
          });
          // {name:'区域',props:'area',width:120}
          _.each(map.list, (l, index) => {
            if (idx == 0) {
              headers.push({
                name: l.dengji,
                props: "prop" + index,
              });
            }

            temp["prop" + index] = l.number;
          });
          idx++;

          tableDatas.push(temp);
        });
        // tableDatas = _.sortBy(tableDatas, (o) => {
        //   return o.prop0;
        // });

        _.each(tableDatas, (d, index) => {
          d.idx = (index + 1)
        })
        this.$refs.ucDistributionTable.update(tableDatas, headers);
      }


    },

    handleChange(val) {
      console.log(val);
    },


    // 关闭图例
    _hideLegbox() {
      this.showLegend = false;
    },
    // 关闭更多详情弹框
    handleClose() {
      this.dialogVisible = false;
    },

    // 关闭更多详情弹框
    show() {
      this.dialogVisible = true;
      this.detailInfo = this.eventManager.curFeaInfo;
      this.$nextTick(() => {
        if (this.$refs.ucMapEx) {
          let mapOptions = {
            indoor: false,
            projection: "EPSG:3857",

          };
          this.$refs.ucMapEx.init(mapOptions, false);
          let polygonFeature = new ol.format.GeoJSON().readFeature(JSON.parse(this.eventManager.curFeaInfo.mianGeom))
          let fillStyle = new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(255,255,255,1)',
            }),
            stroke: new ol.style.Stroke({
              color: '#ff0000',
              width: 2,
            })
          })
          polygonFeature.setStyle(fillStyle);
          GeometryUtility.transformFeatureGeometry([polygonFeature], 'EPSG:4326', "EPSG:3857")
          let properties = this.eventManager.curFeatrue.getProperties()
          let cloneFeature = this._createFeature(properties)


          this.$refs.ucMapEx.layerMgr.detailLayer.clear();
          if (cloneFeature) {
            this.$refs.ucMapEx.layerMgr.detailLayer.addFeatures([polygonFeature, cloneFeature])
          } else {
            this.$refs.ucMapEx.layerMgr.detailLayer.addFeatures([cloneFeature])
          }

          this.$refs.ucMapEx.curMap.getView().setZoom(11);
          this.$refs.ucMapEx.curMap.getView().setCenter(cloneFeature.getGeometry().getCoordinates());
          // this.$refs.ucMapEx.layerMgr.drawGeometryLayer.addDrawPoint(JSON.parse(this.eventManager.curFeaInfo.geom))
        }
      })
    },



    // 创建要素
    _createFeature(tempPoiItem) {
      let tempFeature = null;
      let newPoints = GeometryUtility.transformPoints([[tempPoiItem.zxjd, tempPoiItem.zxwd]], "EPSG:4326", "EPSG:3857")
      let tempCoordinate = newPoints[0];
      let iconStyle = new ol.style.Style({
        image: new ol.style.Icon(({
          anchor: [0.5, 8],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: draw_marker
        }))
      });
      tempFeature = new ol.Feature({
        geometry: new ol.geom.Point(tempCoordinate),
        featureType: LayerFeatureType.treeLayerFeature,
        featureTypeIsOverlay: true,
        bindingObject: tempPoiItem
      });

      tempFeature.setId(tempPoiItem.gid);
      tempFeature.setStyle(iconStyle);
      return tempFeature
    },

    // _backCountry
    _backCountry() {
      this.eventManager.backCountryReset();

    },

    // 显示图例
    _showLegend() {
      this.showLegend = !this.showLegend
    },

    init() {

      if (this.$refs.ucMap) {
        let mapOptions = {
          indoor: false,
          projection: "EPSG:3857",
          // rotation: 0.13
        };
        this.$refs.ucMap.init(mapOptions, false);
      }

      // 初始化dialog
      DialogSystemJs.ucOpenDialog = this.$refs.ucPhotoDialog;
      //  echart容器
      this.chart = this.$refs.chart

      this._initEvents();
      let toolFlag = [
        MapTools.mapEventCode.District,
        MapTools.mapEventCode.River,
      ];
      this.$refs.ucMapTool.init(toolFlag, MapTools.mapEventCode.District);
      if (this.statTypes.length > 0) {
        this.curStat = this.statTypes[0];
        this.addLayerByUrl(this.curStat);
      }

      // 添加尾矿库面图层
      this.addLayerByPolygon(window.BASE_CONFIG.polygonLayer)
      // 添加尾矿库图层
      // this.addLayerByPolygon(window.BASE_CONFIG.polygonLayer1)
      this.pointsLayerItem = null;
      let layerItemObj = window.BASE_CONFIG.polygonLayer1;
      if (layerItemObj.type === LayerCatalogItemType.vectorTile) {
        this.pointsLayerItem = VectorTileLayerItem.fronJson(layerItemObj);
      } else if (layerItemObj.type === LayerCatalogItemType.wfs) {
      } else if (layerItemObj.type === LayerCatalogItemType.wmts) {
        this.pointsLayerItem = WmtsLayerItem.fromJson(layerItemObj);
      } else if (layerItemObj.type === LayerCatalogItemType.wms) {
        this.pointsLayerItem = WmsLayerItem.fromJson(layerItemObj);
      }
    },

    // 切换面板显隐
    _togglePanel() {
      this.ucSetting.rightPanelVisiable = !this.ucSetting.rightPanelVisiable;
    },

    _togglePanel1() {
      if (this.staticsTable) {
        this.ucSetting.rightPanelTableVisiable = !this.ucSetting.rightPanelTableVisiable;
      } else {
        this.$message.warning("当前选中级别下无统计！")
      }

    },

    // 下拉菜单事件
    handleCommand(command) {
      this.curStat = _.find(this.statTypes, { value: command });
      this.addLayerByUrl(this.curStat);
      this.eventManager.getPageData();
    },

    // 添加流域或者行政区划服务
    addLayerByUrl(curStat) {

      if (this.showTempLayerItems) {
        _.each(this.showTempLayerItems, (showTempLayerItem) => {
          showTempLayerItem.defaultVisible = false;
          this.eventManager._changeLayerItemVisible(showTempLayerItem, false)
        })

        this.showTempLayerItems = [];

      }
      _.each(curStat.service, (service) => {
        let layerItemObj = service
        let showTempLayerItem = null;
        if (layerItemObj.type === LayerCatalogItemType.vectorTile) {
          showTempLayerItem = VectorTileLayerItem.fronJson(layerItemObj);
        } else if (layerItemObj.type === LayerCatalogItemType.wfs) {
        } else if (layerItemObj.type === LayerCatalogItemType.wmts) {
          showTempLayerItem = WmtsLayerItem.fromJson(layerItemObj);
        } else if (layerItemObj.type === LayerCatalogItemType.wms) {
          showTempLayerItem = WmsLayerItem.fromJson(layerItemObj);
        }
        // if(showTempLayerItem.olVtLayers.length > 0){
        //   _.each(showTempLayerItem.olVtLayers,(layer))
        // }
        showTempLayerItem.defaultVisible = true;
        this.showTempLayerItems.push(showTempLayerItem)
        this.eventManager._changeLayerItemVisible(showTempLayerItem, true)
        if (curStat.value == window.BASE_CONFIG.statTypes[0].value) {
          showTempLayerItem.setLayersVisible(false);
        }

      })
      //  let level = this.$refs.ucMap.getZoomLevel();
      //  this.eventManager._on_zoomLevelChange_districtLayerVisibleChange(level)

    },

    // 添加尾矿库面
    addLayerByPolygon(layerItemObj) {
      let showTempLayerItem = null;
      if (layerItemObj.type === LayerCatalogItemType.vectorTile) {
        showTempLayerItem = VectorTileLayerItem.fronJson(layerItemObj);
      } else if (layerItemObj.type === LayerCatalogItemType.wfs) {
      } else if (layerItemObj.type === LayerCatalogItemType.wmts) {
        showTempLayerItem = WmtsLayerItem.fromJson(layerItemObj);
      } else if (layerItemObj.type === LayerCatalogItemType.wms) {
        showTempLayerItem = WmsLayerItem.fromJson(layerItemObj);
      }
      if (!showTempLayerItem) return;
      showTempLayerItem.defaultVisible = true;
      this.eventManager._changeLayerItemVisible(showTempLayerItem, true)

    },

    removeLayers(curMap) {
      if (!curMap) return;

      if (!this.olLayers || this.olLayers.length == 0) return;

      let layerArray = curMap.getLayers();

      let olVtLayer = null;
      let findItem = null;
      for (let tempIndex = 0; tempIndex < this.olLayers.length; tempIndex++) {
        olVtLayer = this.olLayers[tempIndex];
        if (!olVtLayer) continue;
        findItem = OLLayerUtility.findByUID(
          layerArray.getArray(),
          olVtLayer.ol_uid
        );
        if (findItem) {
        }
      }
    },
    /**
     * 初始化事件
     */
    _initEvents() {
      // 详情
      this.$refs.detailDialog.on_showDetail((info) => {
        this.show();
      })

      this.eventManager = new UCMainEventManager();
      this.eventManager.ucMain = this;
      this.eventManager.ucMap = this.$refs.ucMap;
      this.eventManager.ucMapTool = this.$refs.ucMapTool;
      this.eventManager.ucBaseLayerSwitch = this.$refs.ucBaseLayerSwitch;
      // this.eventManager.ucCustomMapScale = this.$refs.ucCustomMapScale;
      this.eventManager.ucLeftMenu = this.$refs.ucLeftMenu;
      this.eventManager.ucZoomControl = this.$refs.ucZoomControl;
      this.eventManager.ucRightPanel = this.$refs.ucRightFloatComponent;
      this.eventManager.detailDialog = this.$refs.detailDialog; // 详情弹框
      this.eventManager.addListener();
    },
  },

  mounted() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
.divContainer {
  width: 100%;
  height: 100%;
  position: relative;


  .leftBox {
    width: 280px;
    height: 100%;
    background: #f5f7ff;
    border-radius: 6px;
    padding: 10px;
    float: left;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 0px 15px rgb(162 206 252 / 75%);
    z-index: 100;

    .leftpanel {
      // position: absolute;
      // top: 10px;
      // left: 10px;
      width: 100%;
      height: 100%;
      z-index: 2;
      border-radius: 5px;
    }
  }

  .rightBox {
    width: calc(100% - 280px);
    float: right;
    position: relative;

    height: 100%;

    .mapTool {
      position: absolute;
      left: 10px;
      top: 10px;

    }

    .baseLayerSwitch {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }

    .divScale {
      position: absolute;
      left: 10px;
      bottom: 10px;
      background: rgba(255, 255, 255, 1);
      padding: 10px;
    }

    .divRightLeftFloat {
      // border-radius: 5px;
      // width: calc(100% - 350px);
      // position: absolute;
      // left: 340px;
      // bottom: 10px;
      // height: 30vh;
      // transition: all 0.5s;
      // padding: 0 10px;
      border-radius: 5px;
      width: 310px;
      position: absolute;
      right: 10px;
      top: 10px;
      transition: all 0.5s;
      box-shadow: 0 0 10px #000;
    }

    .close_btn {
      position: absolute;
      right: 420px;
      top: 50%;
      height: 90px;
      margin-top: -45px;
      width: 16px;
      background: #3072f6;
      padding: 10px;
      box-sizing: content-box;
      color: white;
      transition: all 0.5s;
      cursor: pointer;
    }

    .divZoomCon {
      position: absolute;
      right: 10px;
      bottom: 80px;
      display: none;
    }

    .legendBox {
      position: absolute;
      bottom: 10px;
      left: 60px;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      background: #fff;
      flex-direction: column;
      width: 300px;
      border-radius: 10px;

      .legendTitle {
        width: 100%;
        text-align: left;
        height: 36px;
        line-height: 36px;
        background: #3d81ef;
        color: white;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 10px 10px 0 0;
      }

      .itemContent {
        padding: 10px;
        width: 100%;

        .legendItem {
          // margin-bottom: 5px;
          width: 25%;
          float: left;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 10px;

          img {
            display: block;
            margin-bottom: 5px;
          }

          span {
            display: block;
            font-size: 14px
          }
        }
      }

    }

    .btnBox {
      position: absolute;
      top: 10px;
      right: 10px;

      .allCity {
        display: block;
        font-size: 16px;
        cursor: pointer;
        // display: inline-block;
        background: rgba(0, 0, 0, 1);
        line-height: 32px;
        color: white;
        margin: 0 3px;
        text-align: center;
        padding: 5px 10px;
        width: 100px;
        border-radius: 5px;
        box-shadow: 0px 3px 10px rgb(71, 71, 71);
        margin-bottom: 10px;

        &::before {
          margin-right: 5px;
        }
      }

      .allCity:hover,
      .allCity.active {
        background: #3D81EF;
        color: white;

        i {
          color: white;
        }
      }
    }


    .detailMore {
      /deep/ .el-dialog__header {
        padding: 20px 20px 10px;
        text-align: left;
        padding-left: 10%;
        padding-bottom: 0;
      }

      /deep/ .el-dialog__headerbtn {
        right: 10%
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

      .detail_content {
        width: 80%;
        margin: 0 auto;

        .content_box {
          padding: 10px;
          background: #ffffff;
          border-radius: 4px;
          box-shadow: 0 0 10px 0 rgba(8, 20, 30, 0.50);

          .box_title {
            padding-left: 16px;
            text-align: left;
            border-bottom: 2px solid #8397d4;
            ;
            margin-bottom: 5px;

            &::before {
              content: "";
              height: 20px;
              width: 5px;
              display: inline-block;
              background: blue;
              margin-right: 5px;
              margin-left: 5px;
              vertical-align: bottom;
            }
          }

          .infoItem {
            line-height: 20px;
            color: #323232;
            display: flex;
            justify-content: flex-start;
            padding: 5px;

            .itemName {
              width: 140px;
              text-align: right;
              flex-shrink: 0;
            }

            .itemContent {
              width: 100%;
              padding: 10px;

              .itemValue {
                text-align: left;

              }
            }

          }
        }
      }
    }


    .legenBtn {
      position: absolute;
      left: 10px;
      bottom: 10px;
      cursor: pointer;
      background: #ffffff;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      line-height: 40px;
      text-align: center;

      i {
        font-size: 24px;
        color: #323232
      }

      &.active,
      &:hover {
        background: #3d81ef;

        i {
          color: white;
        }
      }

    }
  }

  .echartbox {
    height: 340px;
    border-radius: 5px;
    width: 310px;
    position: absolute;
    right: 10px;
    top: 10px;
    transition: all 0.5s;
    box-shadow: 0 0 10px #000;
    background: white
  }



  .tableContent {
    height: calc(100vh - 510px);
    border-radius: 5px;
    width: 310px;
    position: absolute;
    right: 10px;
    top: 360px;
    transition: all 0.5s;
    box-shadow: 0 0 10px #000;
    background: white;

    .el-collapse-item__content {
      height: 100%;
    }
  }
}</style>