/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-17 14:44:23
 * @LastEditTime: 2023-08-20 21:44:00
 * @LastEditors: zkc
 */

import { MapBaseLayer, MapBaseLayerType } from './MapBaseLayer.js';
import { OLLayerUtility } from '../../../utility/ol/OLLayerUtility.js';
import { BaseLayerConfig } from '../../../config/BaseLayerConfig.js';
import { DrawGeometryLayer } from './DrawGeometryLayer'
import { LayerCatalogItemLayer } from './LayerCatalogItemLayer.js';
import { POISearchLayer } from './POISearchLayer'
import { SelectLayer } from './SelectLayer'
import { DataCountLayer } from './DataCountLayer'
import { DetailLayer } from './DetailLayer.js'
/**
 * 图层管理
 */
export class LayerManager {


    constructor() {
        this.currentMap = null;
        this.markerLayer = null;

        //底图
        this.baseLayer = new MapBaseLayer();

        // 绘制图层
        this.drawGeometryLayer = new DrawGeometryLayer();
        this.layerItemLayer = new LayerCatalogItemLayer();
        this.poiLayer = new POISearchLayer();
        this.datacountLayer = new DataCountLayer();
        this.selectLayer = new SelectLayer();
        this.detailLayer = new DetailLayer()
    }


    /**
     * 初始化
     */
    init() {

        //获取map默认的marker图层
        debugger
        let layers = this.currentMap.getMarkerLayers().getLayers().getArray();
        this.markerLayer = OLLayerUtility.findByLayerAttribute(layers, 'name', 'marker_default');
        // this.markerLayer.set('sort',90);
        this.baseLayer.curMap = this.currentMap; 
        this.drawGeometryLayer.curMap = this.currentMap;
        this.layerItemLayer.curMap = this.currentMap;
        this.poiLayer.curMap = this.currentMap;
        this.selectLayer.curMap = this.currentMap;
        this.datacountLayer.curMap = this.currentMap
        this.detailLayer.curMap = this.currentMap;
        // this.baseLayer.showVisibleLayer(MapBaseLayerType.Vector);
        this.baseLayer.showVisibleLayer(window.BASE_CONFIG.DefaultMapBaseLayerType);
        
    }



    /**
     * 初始化底图配置
     */
    initBaseLayerConfig() {

        let mapSrcURLs = new Array();
        ezMap.MapSrcURL = mapSrcURLs;
        ezMap.CenterPoint = window.BASE_CONFIG.map_view_init_centerPoint;
        ezMap.MapInitLevel = parseFloat(window.BASE_CONFIG.map_view_init_initLevel);
        ezMap.MapMaxLevel = parseFloat(window.BASE_CONFIG.map_view_maxLevel);
        ezMap.MapMinLevel = parseFloat(window.BASE_CONFIG.map_view_minLevel);      
    }


    /**
     * 添加图层
     */
    addLayers() {

    }

    /**
     * 清除所有标记元素
     */
    clearMarkers() {
        if (this.markerLayer) {
            this.markerLayer.getSource().clear();
        }

        this.currentMap.clearDragMode();
        if (this.markerLayer) {
            this.markerLayer.getSource().clear();
        }

    }


    /**
     * 清除所有图层
    */
   clear(){
     
       if(this.markerLayer){
           this.markerLayer.getSource().clear();
       }
   }

    /**
     * 创建标记点图层
     */
    _createMarkerLayer(onAddCallback) {

        let vectorSource = new ol.source.Vector({
            features: []
        });

        let vectorLayer = new ol.layer.Vector({
            name: 'markerlayer',
            source: vectorSource,
            visible: true,
            zIndex: 100
        });

        vectorLayer.onAdd = function(curentMap) {
            if (onAddCallback) {
                onAddCallback(curentMap);
            }
        }

        return vectorLayer;
    }

}
