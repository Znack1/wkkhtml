/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2021-03-31 10:44:59
 * @LastEditors: zkc
 * @LastEditTime: 2023-07-20 17:29:58
 * @input: no param
 * @out: no param
 */
import { OLSourceUtility } from "../../../utility/ol/OLSourceUtility.js";

// import { AssetsConfig } from "../../../config/AssetsConfig.js";

import { SystemConfig } from "../../../config/SystemConfig.js";
import { OLLayerUtility } from "../../../utility/ol/OLLayerUtility.js";
import { LayerFeatureType } from "./LayerFeatureType.js";

/**
 * poi搜索图层
 */
export class SelectLayer {

    constructor() {
        this.curMap = null;
        this.featTypeName = "select";
        this.markerLayer = null;
       
    }

    /**
     * 添加图层
     * @param {*} feature 
     * @param {*} show
     */
    addFeature (feature,show = true) {
        let self = this;
        // let fillStyle = new ol.style.Style({
        //     fill: new ol.style.Fill({
        //         color: 'rgba(0, 255, 255,.1)'
        //     }),
        //     stroke: new ol.style.Stroke({
        //         color: 'rgba(0, 255, 255,1)',
        //         width: 4
        //     })
        // });
        // feature.setStyle(fillStyle);
        if(show){
            if (!this.markerLayer) {
                this.markerLayer = this._createMarkerLayer();
                self.curMap.addLayer(this.markerLayer, true);
                this.markerLayer.set(SystemConfig.sortFieldName, 10001);
                let allLayers = this.curMap.getLayers();
                OLLayerUtility.ascLayer(allLayers, SystemConfig.sortFieldName);
            }
            this.markerLayer.getSource().addFeature(feature);
        }else{
            if(this.markerLayer){
                let features = this.markerLayer.getSource().getFeatures();
                for (let idx = 0; idx < features.length; idx++) {
                    let tempFea = features[idx];
                    if (tempFea.getId() == feature.getId()) {
                        this.markerLayer.getSource().removeFeature(tempFea);
                    }
                }
            }
        }
        

    }

    /**
     * 清除
     */
    clear () {
        if (this.markerLayer) {
            let features = this.markerLayer.getSource().getFeatures();
            OLSourceUtility.removeFeatures(this.markerLayer.getSource(), features);
        }
    }

    /**
     * 创建标记点图层
     */
    _createMarkerLayer () {
        let markerSource = new ol.source.Vector({

        });

        //矢量标注图层
        let vectorLayer = new ol.layer.Vector({
            source: markerSource,
            name: 'selectLayer',
            visible: true,
        });

        return vectorLayer;
    }

}

SelectLayer.markerLayer = null;

SelectLayer.field_bindingObject = "bindingObject";