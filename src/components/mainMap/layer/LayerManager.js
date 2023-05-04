/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-17 14:44:23
 * @LastEditTime: 2022-11-17 14:24:25
 * @LastEditors: zkc
 */

import { MapBaseLayer, MapBaseLayerType } from './MapBaseLayer.js';
import { OLLayerUtility } from '../../../utility/ol/OLLayerUtility.js';
import { BaseLayerConfig } from '../../../config/BaseLayerConfig.js';
import { DrawGeometryLayer } from './DrawGeometryLayer'

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
    
    }


    /**
     * 初始化
     */
    init() {

        //获取map默认的marker图层
        let layers = this.currentMap.getMarkerLayers().getLayers().getArray();
        this.markerLayer = OLLayerUtility.findByLayerAttribute(layers, 'name', 'marker_default');

        this.baseLayer.curMap = this.currentMap; 
        this.drawGeometryLayer.curMap = this.currentMap;


        this.baseLayer.showVisibleLayer(MapBaseLayerType.Vector);
    }



    /**
     * 初始化底图配置
     */
    initBaseLayerConfig() {

        let mapSrcURLs = new Array();
        ezMap.MapSrcURL = mapSrcURLs;
        ezMap.CenterPoint = BaseLayerConfig.map_view_init_centerPoint;
        ezMap.MapInitLevel = parseFloat(BaseLayerConfig.map_view_init_initLevel);
        ezMap.MapMaxLevel = parseFloat(BaseLayerConfig.map_view_maxLevel);
        ezMap.MapMinLevel = parseFloat(BaseLayerConfig.map_view_minLevel);      
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
     
       if (this.quickImgLayers) {
           this.quickImgLayers.clear();
       }
    //    if(this.selectLayer){
    //        this.selectLayer.clear();
    //    }
       if(this.moveSelectLayer){
           this.moveSelectLayer.clear();
       }
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
